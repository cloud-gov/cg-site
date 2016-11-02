---
menu:
  docs:
    parent: operations
title: Billing
---

This document describes how the 18F cloud.gov team will manage billing systems for the platform.

## Abacus

Abacus provides usage metering and aggregation for Cloud Foundry (CF) services. It is implemented as a set of REST micro-services that collect usage data, apply metering formulas, and aggregate usage at several levels within a Cloud Foundry organization.

### Deployment

#### Preparing to deploy Abacus

- First, we need to create UAA clients.
  - Follow the instructions [here](https://github.com/18F/cf-abacus/blob/cg-v0.0.5-rc.1/lib/cf/bridge/README.md#uaa-clients) in order create your UAA clients. The first client's credentials will become env vars `CF_CLIENT_ID` and `CF_CLIENT_SECRET`. The second client's credentials will become env vars `CLIENT_ID` and `CLIENT_SECRET`.
- Second, we need to get the address to a deployed CouchDB. That env var will be `DB` and will follow the format of `http://username:password@ip-address:port`.
- Finally we need to set the env var `JWTKEY` to UAA's public key which can be found by looking at your BOSH Release manifest under the properties.uaa.jwt.verification_key value.

#### Deploying Abacus

- Start with the cg-v0.0.5-rc.1 branch from github.com/18F/cf-abacus
- You will need to set `CLIENT_ID`, `CLIENT_SECRET`, `DB`, `JWTKEY` in all the manifest.yml files for the project.
- You will need to set `CF_CLIENT_ID`, `CF_CLIENT_SECRET` in the `lib/cf/bridge/manifest.yml` file.
- `AUTH_SERVER` is `https://login.cloud.gov`
- `UAA` is `https://uaa.cloud.gov`
- `JWTALGO` is `RS256`
- This fork differs from upstream in only a few ways, basically in the manifest.yml files for all the apps. The cloud.gov versions differ in just two ways:
- RAM size has been increased for some apps.
- Env vars have been omitted for most apps. Specifically, where you specify a secret, or a database URI, I've commented those lines out, so that redeploying from such a yml file doesn't blow away the specific values we have for each app.


- For doing a full deploy, just follow the [documents](https://github.com/18F/cf-abacus/tree/cg-v0.0.5-rc.1#deploying-to-cloud-foundry).

- If you want to deploy just one app, it's a little trickier:
  - For abacus-cf-bridge, `cd into lib/cf/bridge; npm install && npm run babel && npm run lint && npm test; npm run cfpack; npm run cfpush`
  - For the other apps, cd into the app's directory (they're all under lib/???/appname), verify the values in the manifest.yml and then:
```
../../../node_modules/abacus-cfpack/cfpack
../../../node_modules/abacus-cfpush/cfpush
  ```

### Preparing to access Abacus
With secured APIs enabled, all curls, etc, have to be done via the following method using [UAAC](https://github.com/cloudfoundry/cf-uaac):

- uaac token client get abacus-linux-container --secret $CLIENT_SECRET
(obtain CLIENT_SECRET from the env vars on most abacus apps, a good one is abacus-cf-bridge)
- uaac curl <whichever abacus app's url>


### Generating reports:
- uaac curl the following URL: `uaac curl https://abacus-usage-reporting.apps.cloud.gov/v1/metering/organizations/:organization_id/aggregated/usage/:time`
  - e.g.:
`uaac curl https://abacus-usage-reporting.apps.cloud.gov/v1/metering/organizations/cfeb9be5-a61a-4f68-894e-8808ab008aaa/aggregated/usage/1459460444000`
  - That's the 'cf' org', and a Java (not unix) timestamp. This web site has been super helpful in dealing with Java timestamps:
http://coolduke.github.io/SimpleTimestampHelper/simpletimestamphelper.html

Look at this file for more details on how to generate reports:
node_modules/abacus-demo-client/lib/test/report.js

### Logging

#### Start logging:
- curl https://abacus-cf-bridge.apps.cloud.gov/debug?config=abacus-cf\*
- (replace abacus-cf with whatever app you're working on)

#### Stop logging:
*You'll want to do this really fast with some apps like abacus-cf-bridge, as it will produce enough log output to crash logs.cloud.gov after a while*

- curl https://abacus-cf-bridge.apps.cloud.gov/debug?config=disabled
