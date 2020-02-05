---
menu:
  docs:
    parent: tenants
layout: ops
layout: docs
sidenav: true
title: Managing services
---

## Reset pending `cdn-route` service creation

The `create-service` command for the cdn-route broker will be in a pending state until either a) the user completes the verification of domain ownership or b) one week elapses. If someone has mistyped a domain, they won't want to wait a week to try again.

To resolve this, an operator can force the service from the `provisioning` state to `provisioned` with this script, https://github.com/18F/cg-scripts/blob/master/poke-cdn.sh. Then delete or update the service to the correct settings.
