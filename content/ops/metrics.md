---
menu:
  main:
    parent: ops
title: Metrics
weight: 10
---

# Requesting an account on Metrics
1. Please [create a ticket](https://github.com/18f/devops/issues/new) with the title including `[Metrics Acct Req]`
1. Please indicate if you need an `admin` account or `regular` account.

# Updating the Metrics containers.
1. SSH into jumpbox
1. Go into the metrics folder `cd ~/workspace/deployments/monitoring-services/cf-metrics-18f`
1. Pull all the recent changes for that project `git pull`
1. Run `eval "$(docker-machine env cfmetrics-chili)"`
1. Run `docker-compose build && docker-compose up -d`
1. Verify none of the components went down by running `docker-compose ps`

### Warning: Any commits that update the version of Grafana will wipe out dashboards and users for now. The following actions should be taken in case.

# Pointing Grafana to new Datasource or Updating Datasoruce (Grafana admins)
1. Currently, the dashboards are looking for the `Name` to be `cf_prd`, `cf_np`, `bosh_prd`, or `bosh_np`. So if you are updating one of those, please ensure the name fits exactly.
1. Set the `Type` to `InfluxDB 0.9.x`
1. Given the AWS Internal IP of the Docker Host (Please refer to the AWS EC2 Console), Set the `Url` to `http://<internal-ip>:8086`
1. Set the `Database`, `User`, and `Password` as appropriate.

# Uploading dashboards
1. Run `for f in grafana/dashboards/*.json; do curl --user <insert username>:<insert password> 'http://<internal AWS IP For Docker Host>:3000/api/dashboards/db' -X POST -H 'Content-Type: application/json;charset=UTF-8' --data-binary @$f; done`

