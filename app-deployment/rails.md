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

cf push c2

# set the environment variables
cf set-env c2 SECRET_TOKEN `rake secret`
...

# set up the database
cf create-service postgresql default c2_db
cf bind-service c2 c2_db
cf restage c2

# migrate the database
# http://docs.cloudfoundry.org/devguide/services/migrate-db.html#occasional-migration
cf push c2 -c 'rake db:migrate' -i 1
cf push c2 -c 'null' -i 4

open http://c2.cf.18f.us/
```
