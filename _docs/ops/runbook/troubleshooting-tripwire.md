---
parent: runbook
layout: ops

layout: docs
sidenav: true
title: Troubleshooting Tripwire Alerts
---

# Dealing with Tripwire Violation alerts
tripwire reported a violation, now what?

1. Use a jumpbox + bosh ssh to access the host that is alerting.
2. Run a tripwire report in update mode: `tripwire -m c -L <local site key path> -S <site-key-path> -P <password> -I`
3. The report opens in `vim`. Look for the `Object Detail` section(s) to see what changed. Properties with `*` by 
their names have changed. 
4. If the changes seem reasonable:
    1. Update the [Tripwire Policy](https://github.com/18F/cg-tripwire-boshrelease/blob/master/jobs/tripwire/templates/config/twpol.txt.erb). Try to figure out the most restrictive tripwire policy change you can make that will silence the alert. E.g. a logfile that gets truncated/rotated periodically might need to be changed from `Growing` to `Dynamic`. `IgnoreAll` and `!` should be absolute last resorts.
    2. Make sure to exit vim with `:cq` so your changes are not persisted locally to the database.
    3. Push your changes, make a PR, and redeploy any releases that may be affected by the policy change.
5. If the changes are not reasonable, find their cause and consider opening a security incident.
