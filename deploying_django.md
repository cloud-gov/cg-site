# Deploying a Django project into Cloud Foundry

Interacting with Cloud Foundry is easiest through the command line interface. You can install the CF CLI using:

```
brew tap pivotal/tap
brew install cloudfoundry-cli
```

You will need a cloud foundry account before continuing. Please create an issue in the [DevOps issue tracker](https://github.com/18F/DevOps/issues) and assign it to @dlapiduz or @ozzyjohnson.

To login, run 
```
cf login  -a api.labs.18f.us
```

Once you're in, you'll probably want to change your password with
```
cf passwd
```

##Orgs
Cloud Foundry groups its users by organizations, or orgs for short. When your account is created, it will be given permissions to an org.

You can run 
```
cf org ORGNAME
```
To see details about your org, including which spaces it includes.

##Spaces
Every application is scoped to a space. Applications in the same space share a location for app development, deployment, and maintenance. To create a space:
```
cf create-space SPACENAME
```

You will be deploying the app from a directory on your local machine. To target a space for deployment, run 
```
cf target -s SPACENAME
```

Now all of you `cf` commands will target that space by default.

## Creating the App
There's no explicit command to create an app, but a 
```
cf push APPNAME
```
will create or reploy the app APPNAME. But before you deploy, let's set up a few things.

### The `.cfignore`
First thing, you'll probably want to copy your .gitignore file:
```cp .gitignore .cfignore```

Cloud Foundry uses a file format identical to .gitignore to decide which files to ignore when deploying. You'll definitely want to put `*.pyc` and `local_settings.py` in there.

### The Python runtime
Next, you want to tell Cloud Foundry which Python runtime to use. To do this, create a `runtime.txt` file, and put the full version of Python you want to deploy with in it. For instance, 
```
python-3.4.1
```

### `requirements.txt`
There are a couple of packages used for the deploy that will be helpful. You'll want to add them to the `requirements.txt` for your project. Below are the lines I added to my `requirements.txt` file. Later versions will probably work but haven't been tested.

```
whitenoise==1.0.6  #manages static assets
dj-database-url==0.3.0 #grabs environment variables and dumps them into a Django settings file
waitress==0.8.9 #a pure python WSGI server that is a replacement for gunicorn
```

### The `wsgi.py` file
When you create a Django project, a default `wsgi.py` file should be created for you. It usually looks like this:
```
"""
WSGI config for PROJECTNAME project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.7/howto/deployment/wsgi/
"""

import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "PROJECTNAME.settings")

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```

You'll need to add a few lines to import the whitenoise package and wrap the middleware around the wsgi application. This file will be used to start the wsgi server in your app. Instead of the above example, your wsgi.py should look like this:
```
"""
WSGI config for PROJECTNAME project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.7/howto/deployment/wsgi/
"""

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "PROJECTNAME.settings")
#important that whitenoise import is after the line above
from whitenoise.django import DjangoWhiteNoise

application = get_wsgi_application()
application = DjangoWhiteNoise(application)
```

The order here is important. The `DJANGO_SETTINGS_MODULE` environment variable must be set before importing DjangoWhiteNoise. 

### The Procfile
The Procfile contains commands that Cloud Foundry will run to keep your site up. For just the Django site, create a file called `Procfile` and in it put
```
web: waitress-serve --port=$VCAP_APP_PORT APPNAME.wsgi:application
```
`APPNAME.wsgi` should be replaced with whatever the name of your project wsgi module is. 

### The `manifest.yml`
The [manifest file](http://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html) tells `cf push` what to do with your app. Here's an example:
```
---
# all applications use these settings and services
memory: 512M
instances: 1
applications:
- name: APPNAME
  path: .
  timeout: 180
```

As you can see, it specifies the number of instances, the memory allocated to the application, and the application itself. 

### Create the App
To create and deploy your app, run 
```
cf push APPNAME --no-start
```
Normally, you would be able to view the site at [APPNAME.labs.18f.us](APPNAME.labs.18f.us) but we gave the command the `--no-start` flag. Before we start the app we need to set up the database.

## Setting Up the Database
Working in Django and Cloud Foundry is easiest if you're using a hosted database like Amazon's RDS. If you aren't already using RDS, I recommend it because the default configuration is much more sane than the default Postgres/MySQL install on Ubuntu.

If you are using RDS, you'll need to change your `settings.py ` and set one environment variable to get the database up and connect. In your `settings.py` make sure you import the package we added to the `requirements.txt` file above:
```
import dj_database_url
```

Then, you'll need to add a `DATABASES` setting like normal. I recommend adding this to the `settings.py` file so that your `local_settings.py` file will override the settings when you're working locally.
```
DATABASES = {}
DATABASES['default'] =  dj_database_url.config()
```

Now, if you set the `DATABASE_URL` environment variable, it will populate the database settings for you. You can set environment variables like so:
```
cf set-env APPNAME DATABASE_URL postgresql://DBUSERNAME:DBPASSWORD@DBHOST:5432/DBNAME
```
You can read more about how to construct the database url for different backends in the [dj_database_url docs](https://github.com/kennethreitz/dj-database-url#url-schema).

If you're not using RDS, you can create a databae service and bind it to your app. For instance, to create a postgresql service and bind it to your app:
```
cf create-service postgresql default DBNAME
cf bind-service APPNAME DBNAME
```

### Running the app
Now try running the push command without the --no-start flag
```
cf push APPNAME
```

It should now be running at APPNAME.labs.18f.us!

### Loading default data
