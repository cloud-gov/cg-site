---
layout: post
date: "2017-08-02"
title: "Platform Release Notes: August 2, 2017"
redirect_from:
  - /updates/2017-08-02-release-notes/
---

Curious what’s new that you might find helpful as a Cloud.gov user? Here are highlights from our platform updates over the past two weeks.
<!--more-->

### Added
You can [add people to spaces]({{ site.baseurl }}/docs/apps/managing-teammates.md#give-roles-to-a-teammate) from the [dashboard](https://dashboard.fr.cloud.gov/#/) if you’re an Org Manager. For example, this makes it easier for program managers to add developers to projects without using the command line tool.

### Changed
In the dashboard, Org Managers and Space Managers can [remove a person from a space]({{ site.baseurl }}/docs/apps/managing-teammates.md#space-users) with one click on "Remove All Space Roles".
Org Managers must remove a person from all spaces before removing them from the Org otherwise. If you try to remove them with the dashboard, you’ll see an error if the user still belongs to any space.

### In case you missed it
We presented at two events during the Amazon Web Services Public Sector summit: [Deliver your agency mission faster with Cloud.gov](https://www.youtube.com/watch?v=NGmDhWEfMuo&list=PLhr1KZpdzukePsKIUofhgp50b63-5yr1V&index=78) and [FedRAMP Accelerated: An update with GSA and Cloud.gov](https://www.youtube.com/watch?v=iXqbIxtiwQY&index=87&list=PLhr1KZpdzukePsKIUofhgp50b63-5yr1V).

### Platform releases
We upgraded the Cloud Foundry deployment to [v268](https://github.com/cloudfoundry/cf-release/releases/tag/v268#v268-security-notices).

You should [restage your application](http://cli.cloudfoundry.org/en-US/cf/restage.html) to [incorporate fixes in the base filesystem](https://docs.cloudfoundry.org/devguide/deploy-apps/stacks.html#cli-commands) and ensure you’re running the most recent language version supported by your [buildpack](https://docs.cloudfoundry.org/buildpacks/).

#### Additional upgrades
* [RootFS cflinuxfs2 v1.141.0](https://github.com/cloudfoundry/cflinuxfs2/releases/tag/1.141.0) which remediates all 19 CVEs related to [USN-3363-1: ImageMagick vulnerabilities](https://usn.ubuntu.com/usn/USN-3363-1/)
* [Diego v1.23.1](https://github.com/cloudfoundry/diego-release/releases/tag/v1.23.1)
* Buildpack updates:
  * [PHP v4.3.38](https://github.com/cloudfoundry/php-buildpack/releases/tag/v4.3.38) removes PHP versions 5.6.19, 7.0.19, 7.1.5; adds PHP versions 5.6.21, 7.0.21, 7.1.7
  * [.NET Core v1.0.22](https://github.com/cloudfoundry/dotnet-core-buildpack/releases/tag/v1.0.22)
 * [NodeJS v1.6.3](https://github.com/cloudfoundry/nodejs-buildpack/releases/tag/v1.6.3)
  * [Staticfile v1.4.11](https://github.com/cloudfoundry/staticfile-buildpack/releases/tag/v1.4.11)
  * [Java v3.19](https://github.com/cloudfoundry/java-buildpack/releases/tag/v3.19) including new Java frameworks
  * [Ruby v1.6.44](https://github.com/cloudfoundry/ruby-buildpack/releases/tag/v1.6.44)

### See also

If you’re interested in details about recent dashboard updates, you can also see the [dashboard release notes](https://github.com/18F/cg-dashboard/releases).
