---
date: 2015-05-27T13:32:00-04:00
menu:
  docs:
    parent: advanced
title: Running multiple instances
---
## Starting Multiple Instances
There are three ways to start multiple app instances in Cloud Foundry:

1.  In the `cf push` command
2.  In the `manifest.yml`
3.  Using the `cf scale` command

When you scale your app by running multiple instances, cloud.gov attempts to schedule those instances across availability zones to maximize your app's resiliency.

#### Push Command Method
When pushing an app use the `-i` flag to declare the number of instances. The example below demonstrates pushing an app with 2 instances.
```bash
cf push <<APP_NAME>> -i 2
```

#### Manifest Method
The number of instances can also be defined using the `instances` key in the `manifest.yml`.
```yaml
memory: 512mb
instances: 2
applications:
  - name: <<APP_NAME>>
    path: .
```

#### Scale Command Method
The number of instances can be changed for a running app using the [cf-scale](http://docs.cloudfoundry.org/devguide/deploy-apps/cf-scale.html) command.
```bash
cf scale <<APP_NAME>> -i 2
```

#### Managing Multiple Instances with [CF-INSTANCE-INDEX](http://docs.run.pivotal.io/devguide/deploy-apps/environment-variable.html#CF-INSTANCE-INDEX)
Running multiple instances may sometimes cause scheduled tasks or a data loads to run multiple times. This issues can be prevented by using the [CF-INSTANCE-INDEX](http://docs.run.pivotal.io/devguide/deploy-apps/environment-variable.html#CF-INSTANCE-INDEX) environment variable. This variable denotes the specific instance number.

The example below shows a bash load script for a Python project. The commands within the `if` condition are only run when the first app instances is starting.

```bash
#!/bin/bash
echo "------ Starting APP ------"
if [ $CF_INSTANCE_INDEX = "0" ]; then
    echo "----- Migrating Database -----"
    python manage.py migrate --noinput
    echo "----- Loading Agency Contacts -----"
    python manage.py load_agency_contacts
fi
gunicorn foia_hub.wsgi:application --log-file -
```
