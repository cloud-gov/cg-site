---
menu:
  docs:
    parent: operations
title: Metrics
---

**This page is out of date.**

## Saving and Exporting Dashboards
The Dashboards created in Metrics provide rich data. Any changes to the configuration need to be exported and put into the [repository](https://github.com/18F/cg-metrics/tree/master/grafana/dashboards).

In order to export a dashboard:

1. Navigate to the dashboard via the drop-down menu at the top.
1. Click the Settings cog-wheel at the top to open a dropdown menu
1. Click `Export` and it will download the .JSON to your computer locally.
1. Move the file to your local Git repo, add, commit, push it and create a PR.
  * Make sure there are no spaces in the file name and remove the timestamp from the end.

## Requesting an account on Metrics
1. Please [create a ticket](https://github.com/18f/infrastructure/issues/new) with the title including `[Metrics Acct Req]`
1. Please indicate if you need an `admin` account or `regular` account.

## Updating the Metrics containers.
1. SSH into jumpbox `ssh <username>@<jumpbox-address>`
  * Make a ticket in the `DevOps` repository with the title `[JumpBox Access Req]` to be given access.
1. Go into the metrics folder `cd ~/workspace/deployments/monitoring-services/cf-metrics-18f`
1. Pull all the recent changes for that project `git pull`
1. Run `eval "$(docker-machine env cfmetrics-chili)"`
1. Run `docker-compose build && docker-compose up -d`
1. Verify none of the components went down by running `docker-compose ps`

**Warning: Any commits that update the version of Grafana will wipe out dashboards and users for now. The following actions should be taken in case.**

## Pointing Grafana to new Datasource or Updating Datasoruce (Grafana admins)
1. Currently, the dashboards are looking for the `Name` to be `cf_prd`, `cf_np`, `bosh_prd`, or `bosh_np`. So if you are updating one of those, please ensure the name fits exactly.
1. Set the `Type` to `InfluxDB 0.9.x`
1. Given the AWS Internal IP of the `cfmetrics-chili` EC2 instance (Please refer to the [AWS EC2 Console for the IP](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-instance-addressing.html#using-instance-addressing-common)), Set the `Url` to `http://<internal-ip>:8086`
1. Set the `Database`, `User`, and `Password` as appropriate.
 * Current `Database` options are `cf_prd`, `cf_np`, `bosh_prd`, or `bosh_np`
 * `Password` and `User` can be found in the ` ~/workspace/deployments/monitoring-services/cf-metrics-18fi/influxdb/run.sh` file on the Jumpbox

## Importing Dashboards
1. SSH into jumpbox `ssh <username>@<jumpbox-address>`
  * Make a ticket in the `DevOps` repository with the title `[JumpBox Access Req]` to be given access.
1. Go into the metrics folder `cd ~/workspace/deployments/monitoring-services/cf-metrics-18f`
1. Run `for f in grafana/dashboards/*.json; do curl --user <insert username>:<insert password> 'http://<internal AWS IP For Docker Host>:3000/api/dashboards/db' -X POST -H 'Content-Type: application/json;charset=UTF-8' --data-binary @$f; done`
