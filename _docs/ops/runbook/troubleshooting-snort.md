---
parent: runbook
layout: ops

layout: docs
sidenav: true
title: Troubleshooting Snort
---

## Overview
Snort is a network intrusion detection system that runs on all cloud.gov hosts.

### Responding to snort alerts
* Identify the rule that triggered the alert. Snort alerts include a snort rule ID (sid), such as `1:22968`. Check https://www.snort.org/rule_docs/ for a description of the alert rule and its impact and mitigations.
* Check the snort logs to verify that the alert is a true positive.
    * Connect to the host identified in the error message.
    * Inspect the snort logs:

        ```
        cat /var/vcap/sys/log/snort-eth0/snort.log.XXXXX | strings
        ```

    * Optionally use `u2spewfoo` to decode the snort binary format:
        
        ```
        /var/vcap/packages/snort/bin/u2spewfoo /var/vcap/sys/log/snort-eth0/snort.log.XXXXX
        ```

* If the alert appears to be a false positive, consider excluding the rule from the snort configuration.
    * Excluded rules are currently managed centrally in https://github.com/18F/cg-snort-boshrelease/blob/master/ci/config/disablesid.conf; if we find that different VMs require different exclusions, this may be moved to a job property.
* If the alert appears to be a true positive, read about mitigations and apply if appropriate.
