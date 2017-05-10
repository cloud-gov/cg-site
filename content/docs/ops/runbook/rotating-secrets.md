---
menu:
  docs:
    parent: runbook

title: Rotating Secrets
---

This guide assumes that you're following the Offboarding Checklist [found
here](https://github.com/18F/cg-product/blob/master/OffboardingChecklist.md) and
removed direct access to our AWS accounts. The following guide walks a cloud.gov
operator through rotating all sensitive information (secrets) including the
following:

- Passphrases
- AWS IAM users
- Deployer users
- Certificates
- Clients
- Service Brokers

# Start by rotating access to various services and IAM accounts.

- Access AWS
- Rotate these specific IAM Users first
    - `bosh_user`
    - `concourse_user`
    - `cf_user`
    - `release_user`
    - `stemcell_user`
    - `read_only_admin`
- [Rotating Concourse secrets stub]({{< relref "ops/runbook/rotating-concourse.md" >}})
- [Rotating Bosh secrets stub]({{< relref "ops/runbook/rotating-bosh.md" >}})
- [Rotating Cloud Foundry / Diego secrets stub]({{< relref "ops/runbook/rotating-cloudfoundry-diego.md" >}})

- Rotate Bosh stuff and resurrect them

## Rotate deployment users

Rotating deployment users that are either manually created CF users or cloud.gov
Service Account deployers.

- Rotating cloud.gov Service Account deployers
    - Run `$CG_SCRIPT/get-all-cf-deployers <environment>` to get the all the current
      deployer accounts.
    - Rotate each one.
        - `cf target -o $org_name -s $space_name`
        - `cf rename-service $name_of_deployer "${name_of_deployer}_prev"`
        - `cf create-service cloud-gov-service-account space-deployer "${name_of_deployer}"`
        - `cf service "${name_of_deployer}"`
        - View the Fugacious link and save the credentials locally in the
          `credentials.yml`
        - If the user is a broker, give it the proper `cloud_controller.admin` scope
          manually using `uaac`
             - `uaac member add cloud_controller.admin ${guid_of_deployer}`
        - Refly the pipeline with updated credentials
        - Delete the `${name_of_deployer}_prev` service account deployer.
