---
date: 2015-05-27T13:32:00-04:00
parent: management
layout: docs
sidenav: true
redirect_from: 
    - /docs/apps/multiple-instances/
title: Running multiple instances
---

It is critical that your production application has more than one instance. Then if there are any issues with one of the platform runners where your app instances are assigned, or we upgrade platform components underneath an instance, your app will continue to function correctly (with less risk of downtime).

When you scale your app by running multiple instances, cloud.gov schedules those instances across availability zones to maximize your app's resiliency. cloud.gov also load-balances access from users by default, so you should set up your instances to share session data to avoid unexpected behavior. If your application already stores data in a database, you can use it for this as well; applications that don't yet have databases can establish one (for example using [AWS RDS]({{ site.baseurl }}{% link _docs/services/relational-database.md %})) or use another type of data storage (such as [Redis]({{ site.baseurl }}{% link _docs/services/redis.md %})).

## Starting multiple instances
There are three ways to start multiple app instances on cloud.gov:

1.  In the `cf push` command
2.  In the `manifest.yml`
3.  Using the `cf scale` command

#### Push command method

When pushing an app, use the `-i` flag to declare the number of instances. The example below demonstrates pushing an app with 2 instances:
```sh
cf push <<APP_NAME>> -i 2
```

#### Manifest method

You can also define the number of instances using the `instances` key in the `manifest.yml`:
```yaml
memory: 512mb
instances: 2
applications:
  - name: <<APP_NAME>>
    path: .
```

#### Scale command method

You can change the number of instances for a running app using the [cf-scale](http://docs.cloudfoundry.org/devguide/deploy-apps/cf-scale.html) command:
```sh
cf scale <<APP_NAME>> -i 2
```

#### Managing multiple instances with [CF-INSTANCE-INDEX](http://docs.cloudfoundry.org/devguide/deploy-apps/environment-variable.html#CF-INSTANCE-INDEX)

Running multiple instances may sometimes cause scheduled tasks or data loads to run multiple times. This issue can be prevented by using the [CF-INSTANCE-INDEX](http://docs.cloudfoundry.org/devguide/deploy-apps/environment-variable.html#CF-INSTANCE-INDEX) environment variable. This variable denotes the specific instance number.

The example below shows a bash load script for a Python project. The commands within the `if` condition are only run when the first app instance is starting.

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
