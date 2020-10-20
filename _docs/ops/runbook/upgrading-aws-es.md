---
parent: runbook
layout: ops

layout: docs
sidenav: true
title: Upgrading AWS ES instance for Migration
---

These instructions outline how to assist a customer in upgrading their AWS ES 6.8 migration instance to AWS ES 7.4.

## Check Upgrade Eligibility 
1. Go to the Elasticsearch Service in the AWS Console
2. Find the instance that the customer wants to upgrade
3. Click the Actions Button and then click the Upgrade domain option
{% asset es-migration-1-domain.png alt="Click the Actions Button and then click the Upgrade domain option" %}
4. Select Version as 7.4 and Operation as Check upgrade eligibility
{% asset es-migration-2-check.png alt="Select Version as 7.4 and Operation as Check upgrade eligibility" %}
5. Go back to the overview of the Elasticsearch Domain and click the Upgrade History Tab to see the results of the check.
{% asset es-migration-3-results.png alt="Go back to the overview of the Elasticsearch Domain and click the Upgrade History Tab to see the results of the check." %} 

The result will either be "Failed" or "Succeeded"
If "Failed" - AWS will tell you which index is not compatible with the target Elasticsearch version. Please reply back to the customer and tell them which index is not compatible.
If "Succeeded" - Let the customer know that their Elasticsearch Domain is able to be upgraded.

## Upgrade the Elasticsearch Domain
1. Go to the Elasticsearch Service in the AWS Console
2. Find the instance that the customer wants to upgrade
3. Click the Actions Button and then click the Upgrade domain option
{% asset es-migration-1-domain.png alt="Click the Actions Button and then click the Upgrade domain option" %}
4. Select Version as 7.4 and Operation as Upgrade
{% asset es-migration-4-upgrade.png alt="Select Version as 7.4 and Operation as Upgrade" %}
5. Go back to the overview of the Elasticsearch Domain and click the Upgrade History Tab to see the results of the check.
{% asset es-migration-3-results.png alt="Go back to the overview of the Elasticsearch Domain and click the Upgrade History Tab to see the results of the check." %} 

AWS will show the progress of the upgrade. Check every now and then to see when the upgrade finishes. When it does, let the customer know that it is done. 
