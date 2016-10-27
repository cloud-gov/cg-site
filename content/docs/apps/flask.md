---
menu:
  docs:
    parent: apps
title: Deploying Flask
---

***See also: the [official Python buildpack documentation](http://docs.cloudfoundry.org/buildpacks/python/).***

Deploying a Flask app is similar to deploying a Django app but is a bit simpler.

## Creating the App

There's no explicit command to create an app, but:

```bash
cf push APPNAME
```

will create or deploy the app APPNAME. But before you deploy, let's set up a few things.

### Ignoring files

1. Add `*.pyc` and any other files you want Cloud Foundry to ignore to your `.gitignore`.
1. [Exclude your `.gitignore`d files from Cloud Foundry.]({{< relref "docs/apps/deployment.md#exclude-files" >}})

### WSGI Configuration

You _could_ use the built-in Werkzeug server to send out your Flask app, [but it's not recommended](http://flask.pocoo.org/docs/0.10/deploying/). As with Django, we recommend installing and using `waitress` for a WSGI server. Install it with `pip install waitress`.

Switching your Flask app to serve with Waitress instead of the built-in server is fairly simple. The first thing you'll want to do is set the app's port to the `PORT` environment variable. This is set by Cloud Foundry for you so you don't have to worry about it, but you _do_ need to let Flask know about it. And while you're developing locally you might want to set a local `PORT`. You can do that with this code:

```python
port = int(os.getenv("PORT"))
```

Here's how a basic Flask app might look:

```python
from flask import Flask
# do stuff
if __name__ == "__main__":
  app.run(host='0.0.0.0', port=port)
```

We recommend modifying it like this:

```python
from flask import Flask
from waitress import serve
# do stuff
if __name__ == "__main__":
  serve(app, port=port)
```

If you still want to use the built-in server in development you could add an environment variable and do something like this:

```python
from flask import Flask
from waitress import serve
# do stuff
if __name__ == "__main__":
  if os.environ['PRODUCTION'] == "0":
    app.run(host='0.0.0.0', port=port)
  else:
    serve(app, port=port)
```

To add that environment variable, run:

```bash
cf set-env APPNAME PRODUCTION VALUE
```

In that example, `APPNAME` is the name your your app and `VALUE` is whatever you want it to be (as long as it's not `"0"`).

### The Procfile

The Procfile contains commands that Cloud Foundry will run to keep your site up. Create a file called `Procfile` and in it put

```
web: python index.py
```

`index.py` should be replaced with whatever your app's main python file is.

### The `manifest.yml`

The [manifest file](http://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html) tells `cf push` what to do with your app. Here's an example:

```yaml
---
# all applications use these settings and services
memory: 512M
instances: 1
applications:
- name: APPNAME
  path: .
  timeout: 180
  host: 18f.gov
```

As you can see, it specifies the number of instances, the memory allocated to the application, and the application itself.

### Create the App

To create and deploy your app:

```bash
cf push APPNAME
```

If you're going to set up a database you probably need to run `cf push --no-start` while you figure out how to get the database going.

## Setting Up the Database

You don't need a database to work with Flask but if you want to try, be sure to update this page with how you did it. **I'd start with reading [the database guide]({{< relref "docs/apps/databases.md" >}}).**

### Running the app

Now try running the push command without the `--no-start` flag:

```bash
cf push APPNAME
```

It should now be running at `APPNAME.18f.gov`!
