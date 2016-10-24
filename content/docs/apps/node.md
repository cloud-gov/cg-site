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

- Optionally run `npm install` prior to `cf push` to preinstall dependencies rather than having them added during staging.

**Example:**

The [Beckley](https://github.com/18F/beckley) project is a node.js + Express app managed by forever with an Elasticsearch backend.

Converting Beckley to run in Cloud Foundry backed by a v1 managed service instance can be summed by the following diff:

[https://github.com/18F/beckley/compare/cf-example](https://github.com/18F/beckley/compare/cf-example)
