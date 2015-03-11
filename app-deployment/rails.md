# Deploying a Rails app

See the official CF guide: [Getting Started Deploying Ruby on Rails Apps](http://docs.cloudfoundry.org/buildpacks/ruby/gsg-ror.html). Here are the minimal steps for a basic Rails app:

```bash
brew install cloudfoundry-cli
cf login -a api.cf.18f.us
# note you may need to add `--skip-ssl-validation`

# TODO set up org+space

# ignore files ignored by git
# http://docs.cloudfoundry.org/devguide/deploy-apps/prepare-to-deploy.html#exclude
cp .gitignore .cfignore

# replace with whatever you want to call your application
APP_NAME=c2-dev

cf push $APP_NAME

# set the environment variables
cf set-env $APP_NAME SECRET_TOKEN `rake secret`
# etc.

# set up the database
cf create-service postgresql default "${APP_NAME}_db"
# this will overwrite your database.yml
# http://docs.cloudfoundry.org/buildpacks/ruby/ruby-service-bindings.html#rails-applications-have-autoconfigured-database-yml
cf bind-service $APP_NAME "${APP_NAME}_db"
cf restage $APP_NAME

# migrate the database
# note: this currently requires stopping the application
# http://docs.cloudfoundry.org/devguide/services/migrate-db.html#occasional-migration
cf push $APP_NAME -c 'rake db:migrate' -i 1
# re-start the server process
cf push $APP_NAME -c 'null' -i 1

open "http://${APP_NAME}.cf.18f.us/"
```
