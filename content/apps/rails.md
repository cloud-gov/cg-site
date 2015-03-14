---
menu:
  main:
    parent: apps
title: Deploying Rails
weight: 10
---

See the official CF guide: [Getting Started Deploying Ruby on Rails Apps](http://docs.cloudfoundry.org/buildpacks/ruby/gsg-ror.html). Here are the minimal steps for a basic Rails app:

1. Follow the setup instructions in the [README](../README.md)
    * You can skip anything labeled "Management"
1. [Ignore files](http://docs.cloudfoundry.org/devguide/deploy-apps/prepare-to-deploy.html#exclude) ignored by Git

    ```bash
    cp .gitignore .cfignore
    ```

1. Create the application on Cloud Foundry

    ```bash
    cf push <APP_NAME>
    ```

1. [Set up the database](database.md)
1. Set additional [environment variables](http://docs.run.pivotal.io/devguide/deploy-apps/environment-variable.html)

    ```bash
    cf set-env <APP_NAME> SECRET_TOKEN `rake secret`
    # etc.
    ```

1. [Migrate the database](http://docs.cloudfoundry.org/devguide/services/migrate-db.html#occasional-migration)

    ```bash
    # note: this currently requires stopping the application
    cf push <APP_NAME> -c 'rake db:migrate' -i 1
    # re-start the server process
    cf push <APP_NAME> -c 'null' -i 1
    ```

Your app should now be live at http://APP_NAME.cf.18f.us/!
