---
menu:
  main:
    parent: getting-started
title: Your first deploy
weight: 0
---

18F-specific Cloud Foundry documentation lives at [docs.18f.gov](https://docs.18f.gov). The general docs are at [docs.cloudfoundry.org](http://docs.cloudfoundry.org).

TODO move to the docs site /cc [https://github.com/18F/cloud-foundry-notes/issues/65](https://github.com/18F/cloud-foundry-notes/issues/65)

@mhz took some awesome notes from one of the sessions here: [https://docs.google.com/document/d/10Ql-HrxVOm7KHld48HiZMSdONuy2TTUnB-bYVna8wz4/edit](https://docs.google.com/document/d/10Ql-HrxVOm7KHld48HiZMSdONuy2TTUnB-bYVna8wz4/edit)

# Prework

Follow [https://docs.18f.gov/getting-started/setup/](https://docs.18f.gov/getting-started/setup/) a day or two in advance.

# Deploying

1. Follow instructions at [https://github.com/18F/cf-hello-worlds](https://github.com/18F/cf-hello-worlds#readme).

2. Tweak the app (without committing) and re-`push`.

# Explanation of the magic

* The [terminology](https://docs.18f.gov/getting-started/concepts/)

* Routing and what that means in terms of DNS/requests

    * ELBs

    * [Custom domains](https://docs.18f.gov/apps/custom-domains/)

* Packaging up the app (based on what’s in that directory, so commit your code!)

# Caveats

* Don’t write to local storage (it’s ephemeral)

* Assets must be precompiled

* Instances will be restarted if exceed memory usage

* Proper logging might require extra libraries for your app

* [`.gitignore`/`.cfignore`](https://docs.18f.gov/apps/deployment/#exclude-files:98159bafc57a07057ca8a36ea636fe50)

# Other stuff you might need to do

* [Continuous deployment](https://docs.18f.gov/apps/continuous-deployment/)

* Connecting to a service? (or just a RDS example for now)

    * [Databases](https://docs.18f.gov/apps/databases/)

* Deploying with zero downtime by flipping between 2 apps?

    * [Blue-green deployments](http://docs.pivotal.io/pivotalcf/devguide/deploy-apps/blue-green.html)

* Rollback?

    * Just `checkout` the old version and `cf-push`

* [one-off commands](https://docs.18f.gov/getting-started/cf-ssh/)

* Delete application

* * *


# Aidan TODO

* Create users+spaces for everyone

* Turn on Keycastr

* Turn on Quicktime recording

# Related links

* [EPA training notes](https://docs.google.com/document/d/1HOWUV_cqwyfOXJ_2ssb_FU7pdHjhQGmvi1OKxxN0aCc/edit)
