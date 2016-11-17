---
menu:
  docs:
    parent: apps
title: Deploying Flask
---

***See also: the [official Python buildpack documentation](http://docs.cloudfoundry.org/buildpacks/python/).***

## Create the app

Before you create and deploy your Flask app, set up your app with the following steps.

### Ignore files

1. Add `*.pyc` and any other files you want Cloud Foundry to ignore to your `.gitignore`.
1. [Exclude your `.gitignore`d files from Cloud Foundry.]({{< relref "docs/apps/deployment.md#exclude-files" >}})

### WSGI Configuration

As described in the [Flask documentation](http://flask.pocoo.org/docs/0.10/deploying/), Flask's built-in server is only appropriate for development; you need to set up a WSGI server for production. We recommend installing and using `waitress` for a WSGI server. Install it with `pip install waitress`.

Here's how to switch your Flask app to serve with Waitress instead of the built-in server. First, set the app's port to the `PORT` environment variable (this is set by Cloud Foundry for you, but you need to let Flask know about it). And while you're developing locally you might want to set a local `PORT`. You can do that with this code:

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

If you still want to use the built-in server in development, you could add an environment variable and do something like this:

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

In that example, `APPNAME` is the name of your app, and `VALUE` is whatever you want it to be (as long as it's not `"0"`).

### The Procfile

The Procfile contains commands that Cloud Foundry will run to keep your site up. Create a file called `Procfile` and put this in it:

```
web: python index.py
```

Replace `index.py` with the name of your app's main Python file.

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

It specifies the number of instances, the memory allocated to the application, and the application itself.

### Create and deploy the app

To create and deploy your app:

```bash
cf push APPNAME
```

If you're going to set up a database, you probably need to run `cf push --no-start` until you get the database established.

## Set up the database

You don't need a database to work with Flask, but if you need to set one up, see [the database guide]({{< relref "docs/apps/databases.md" >}}).

### Run the app

Now try running the push command without the `--no-start` flag:

```bash
cf push APPNAME
```
