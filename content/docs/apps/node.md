---
menu:
  docs:
    parent: apps
title: Deploying node.js
---

Deploying a basic node.js application to Cloud Foundry is relatively uncomplicated. The [node.js tips document](http://docs.cloudfoundry.org/buildpacks/node/node-tips.html) on cloudfoundry.org covers the process in detail.

**Summary:**

- Include a package.json file to specify dependencies and a `start` command. The presence of this file is essential to have the application [detected as node.js](https://github.com/cloudfoundry/nodejs-buildpack/blob/master/bin/detect) and the start script specified within will be [used to launch your app](https://github.com/cloudfoundry/nodejs-buildpack/blob/94949f6d7c2ee6c84ee04edcc9c94a5454047b75/bin/compile#L134-147).

    ```javascript
    {
      // ...
      "scripts": {
        "start": "node app.js"
      }
    }
    ```

- Avoid using the `command:` manifest key to start your application, as this functionality [may be removed](https://github.com/cloudfoundry/nodejs-buildpack/pull/11#issuecomment-67666273). The aforementioned npm start script is preferred.

- Please vendor your dependencies.  Cloud Foundry [documentation](https://docs.cloudfoundry.org/buildpacks/node/index.html#vendoring) specifies that you should do a `npm install` to install vendored dependencies and pushing your entire application with `cf push`. See the Cloud Foundry documentation for more information on [Deploying a Large Application](https://docs.cloudfoundry.org/devguide/deploy-apps/large-app-deploy.html).

- Please do not put test harnesses or transpilers in your dependencies object. View the npm [documentation](https://docs.npmjs.com/files/package.json#dependencies) for more on this. All `devDependencies` should be installed and run on your CI and not during a deployment.

- To ensure you only download the necessary dependencies, you should ensure that `NODE_ENV` is set to
`production`, or pass the pass the `--production` flag on install. By setting this property, `npm install` will only install modules in your `dependencies`
section of the `package.json` while ignoring those in the `devDependencies` section.

- Use the [cfenv](https://www.npmjs.com/package/cfenv) module to assist with parsing the `VCAP_APPLICATION` and `VCAP_SERVICES` environment variables.

    ```javascript
    {
      // ...
      "dependencies": {
        "cfenv": "*",
        // ...
      }
    }
    ```

    ```javascript
    var cfenv = require("cfenv");
    var appEnv = cfenv.getAppEnv();
    uri = appEnv.getServiceURL("beckley-es");
    ```

- Ensure the app listens on the Cloud Foundry assigned port.

    ```javascript
    config.app.port = appEnv.port;
    ```

- Include dependencies for any service bindings.

    ```javascript
    {
      // ...
      "dependencies": {
        "es": "*",
        // ...
      }
    }
    ```

**Example:**

The [Beckley](https://github.com/18F/beckley) project is a node.js + Express app managed by forever with an Elasticsearch backend.

Converting Beckley to run in Cloud Foundry backed by a v1 managed service instance can be summed by the following diff:

[https://github.com/18F/beckley/compare/cf-example](https://github.com/18F/beckley/compare/cf-example)
