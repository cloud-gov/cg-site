---
parent: tenants
layout: ops
layout: docs
sidenav: true
title: Managing services
---

## Reset pending `cdn-route` service creation

The `create-service` command for the cdn-route broker will be in a pending state until either a) the user completes the verification of domain ownership or b) one week elapses. If someone has mistyped a domain, they won't want to wait a week to try again.

To resolve this, an operator can force the service from the `provisioning` state to `provisioned` with this script, https://github.com/18F/cg-scripts/blob/master/poke-cdn.sh. Then delete or update the service to the correct settings.

## Increasing RDS capacity

On occasion, we receive alerts in Prometheus (`AWSRDSStorage`) that user RDS instances are running low on space. Our protocol for addressing these alerts is as follows:

1. Log into the AWS console and identify the instance using the details from the Prometheus alert.
2. Use the [org](https://v3-apidocs.cloudfoundry.org/version/3.87.0/index.html#get-an-organization), [space](https://v3-apidocs.cloudfoundry.org/version/3.87.0/index.html#get-a-space) and service GUIDs to identify the details of the instance owner.
3. Reach out to the instance owner and notify them of the alert, and offer the option of increasing space or directing them to purge unneeded data.
4. If the instance owner opts for an increase in space, they can choose to have the change applied immediately (which may degrade service for a short period as the change takes effect) or at the next scheduled service window. Our standard practice is to increase existing instance quotas by 50% (note - some thresholds [may trigger pricing changes](https://cloud.gov/pricing/#all-use-of-cloud-gov-includes)).
5. Apply the increase in the AWS console (if opted by customer).
6. Notify customer that the change has been made.