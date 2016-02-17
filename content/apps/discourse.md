---
menu:
  main:
    parent: apps
title: Deploying Discourse
---

Discourse is a widely used Forum/Mailing List in one, and is great for nearly an knowledge management needs particularly for distributed or inter-agency communities.

[Learn More](http://www.discourse.org/)

In order to make Discourse available through cloudfoundry there are a few additional steps that need to be taken:

> Steps below assume you are in the [home directory of the official repository](https://github.com/discourse/discourse) some of these steps have already been taken in [18F's fork](https://github.com/18F/discourse/tree/cloud-gov-prod)

1. EDIT `Procfile`
1. EDIT `config/application.rb`
1. ADD `config/load_cf_env.rb`
1. REMOVE `config/puma.rb`
1. ADD `manifest-prod-app.yml` OPTIONALLY use a staging environment with
1. ADD `manifest-prod-worker.yml` OPTIONALLY use a staging environment with
1. CONFIG [custom authentication plugin](https://github.com/18F/discourse/tree/cloud-gov-prod/plugins/oauth2)

## Procfile
```
web: bundle exec puma -t 5:5 -p ${PORT:-3000} -e ${RACK_ENV:-development} --preload
worker: bundle exec sidekiq -e $RAILS_ENV
```
## config/application.rb
INSERT the following into the existing `require_relative` entries
```
require_relative './load_cf_env'
```

## config/load_cf_env.rb
```
require 'json'

begin
  vcap = ENV["VCAP_SERVICES"]
  JSON.parse(vcap)["user-provided"].each do |service|
    if service["name"].include?("-env")
      service["credentials"].each do |k,v|
        ENV[k] = v
      end
    end
  end
rescue
  puts "Error loading env vars"
```  

## Manifest for app
```
---
applications:
- name: discourse-prod
  memory: 512M
  instances: 3
  host: discourse
  domains:
  - cloud.gov
  command: bundle exec puma -t 5:5 -p ${PORT:-3000} -e ${RACK_ENV:-development} --preload
services:
  - community-redis-swarm
  - community-db
  - discourse-env
```

## Manifest for worker
```
---
applications:
- name: discourse-prod-worker
  memory: 512M
  instances: 1
  no-route: true
  command: bundle exec sidekiq -e $RAILS_ENV
services:
  - community-redis-swarm
  - community-db
  - discourse-env
```
