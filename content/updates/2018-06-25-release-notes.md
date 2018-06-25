+++ 
date = "2018-06-25" 
title = "cloud.gov update: Buildpack notifications, better backup protection, and more" 
+++ 

It's been a few months since our last update, so there’s more to see here than usual. As always, get in touch with us if you have any questions or feedback about these features. 

### Announcements

* We’ve switched dedicated RDS instances from 24 hours to 14 days backup retention. Please note that for shared plans (shared-psql and shared-mysql), [RDS does not back up your data]({{< relref "docs/services/relational-database.md" >}}).

### Added

* Since AWS CloudFront is outside the AWS FedRAMP P-ATO boundary, we offer [a custom domain service without CloudFront]({{< relref "/updates/2018-05-21-new-custom-domain-service.md" >}}).  If you’re using the CDN service and you need to switch to the custom domain service, follow the instructions on the [custom domain page]({{< relref "/docs/services/custom-domains.md" >}}).

* Support for SpringBoot “thin” JARs has been added to the Java buildpack in CloudFoundry. 

### Buildpacks 

[.NET Core Buildpack v2.0.6 → 2.1.201](https://github.com/cloudfoundry/dotnet-core-buildpack/releases/tag/v2.1.0) 
[Go Buildpack v1.8.20 → 1.8.21](https://github.com/cloudfoundry/go-buildpack/releases/tag/v1.8.21) 
[Java Buildpack v4.9 → 4.12](https://github.com/cloudfoundry/java-buildpack/releases/tag/v4.12) 
[Nginx v1.13.12 → 1.15](https://github.com/cloudfoundry/nginx-buildpack/releases/) 
[Node.js Buildpack v1.6.20 → 1.6.23](https://github.com/cloudfoundry/nodejs-buildpack/releases/tag/v1.6.23)
[Python Buildpack v1.6.11 → 1.6.15](https://github.com/cloudfoundry/python-buildpack/releases/tag/v1.6.15) 
[PHP Buildpack v4.3.51 → 4.3.54](https://github.com/cloudfoundry/php-buildpack/releases/tag/v4.3.54) 
[Ruby Buildpack v1.7.15 → 1.7.18](https://github.com/cloudfoundry/ruby-buildpack/releases/tag/v1.7.18) 
[Staticfile Buildpack v1.4.24 → 1.4.27](https://github.com/cloudfoundry/staticfile-buildpack/releases/tag/v1.4.27)
