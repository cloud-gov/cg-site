# Deploying a Django project into Cloud Foundry

Interacting with Cloud Foundry is easiest through the command line interface. You can install the CF CLI using:

```
brew tap pivotal/tap
brew install cloudfoundry-cli
```

You will need a cloud foundry account before continuing. Please create an issue in the [DevOps issue tracker](https://github.com/18F/DevOps/issues) and assign it to @dlapiduz or @ozzyjohnson.

To login, run 
```
cf login  -a api.labs.18f.us --skip-ssl-validation
```
This will change when the ssl cert is setup on api.labs.18f.us, but for now run with the flag --skip-ssl-validation

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
```cp .gitignore .cfignore```

Cloud Foundry uses a file format identical to .gitignore to decide which files to ignore when deploying. You'll definitely want to put `*.pyc` and `local_settings.py` in there.

### The Python runtime
Next, you want to tell Cloud Foundry which Python runtime to use. To do this, create a `runtime.txt` file, and put the full version of Python you want to deploy with in it. For instance, 
```
python-3.4.1
```

### The Procfile

### The `manifest.yml`

To create your app, run `cf push APPNAME`.

## Setting Up the Database
Working in Django and Cloud Foundry is easiest if you're using a hosted database like Amazon's RDS. If you aren't already using RDS, I recommend it because the default configuration is much more sane than the default Postgres/MySQL install on Ubuntu.

To create a postgresql service and bind it to your RDS instance, run 
```
cf create-service postgresql default DBNAME
cf bind-service APPNAME DBNAME
```

