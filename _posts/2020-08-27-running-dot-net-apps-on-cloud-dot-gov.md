---
layout: post
title: "Running .NET Apps on cloud.gov"
date: August 27, 2020
excerpt: Learn more about how you can run .NET apps on the cloud.gov platform and get answers to commonly asked questions about .NET development and deployment for cloud.gov
---

The cloud.gov team often gets asked about whether the platform supports running .NET applications. The good news is: Yes! You can run .NET applications on the cloud.gov platform and [reap all the benefits](https://cloud.gov/docs/technology/responsibilities/) enjoyed by developers using [other languages and frameworks](https://cloud.gov/docs/overview/portfolio-analysis/) for their applications.

Here is a list of commonly asked questions about .NET applications on cloud.gov, and some additional information to get you started using the platform.

**What version of .NET is supported on cloud.gov?**

cloud.gov leverages the [Cloud Foundry .NET Core Buildpack](https://github.com/cloudfoundry/dotnet-core-buildpack), which provides access to the latest versions of .NET Core. The platform does not support .NET Framework applications and you should understand the [differences between the two options](https://docs.microsoft.com/en-us/dotnet/standard/choosing-core-framework-server) prior to migrating your application to cloud.gov.

cloud.gov is an ideal platform for deploying microservices, or for building highly performant and scalable systems, so .NET Core is a good fit for the way our platform is architected. If you are currently running a legacy .NET Framework application, you should consider porting your application to .NET Core to take advantage of the features of the platform and also to realize the benefits of using cloud.gov. Microsoft provides [detailed documentation](https://docs.microsoft.com/en-us/dotnet/core/porting/) for porting your application to .NET Core, including a [portability analyzer](https://docs.microsoft.com/en-us/dotnet/standard/analyzers/portability-analyzer) to help you identify potential issues with your existing application.

**Can I use SQL Server with my .NET application on cloud.gov?**

Yes, with one small caveat. You can easily connect your .NET Core application on cloud.gov to an instance of SQL Server using Cloud Foundry’s [user provided service instance approach](https://docs.cloudfoundry.org/devguide/services/user-provided.html). This will let your application connect to a SQL Server instance running on any cloud service provider, or even a legacy instance running on premise inside your network.

However, because cloud.gov does not broker this service to your application directly as part of our marketplace, this falls outside the scope of our current FedRAMP approval, so there may be some additional compliance work required for you to get your application [authorized to operate in production](https://cloud.gov/docs/overview/fedramp-tracker/#how-you-can-use-this-p-ato). That said, there are no technical limitations on using SQL Server with your .NET Core application running on cloud.gov, and the set up to bind your application to SQL Server is simple and straightforward.

It's also possible to use the [PostgreSQL or MySQL RDS services](https://cloud.gov/docs/services/relational-database/#plans) brokered from Amazon GovCloud by cloud.gov in your .NET Core application. So, migrating from SQL Server to one of these options may provide some additional compliance benefits, as they are within the cloud.gov P-ATO boundry. 

**Does cloud.gov provide any CI/CD tools to use in conjunction with my .NET application?**

cloud.gov does not provide any specific CI/CD tools for customers to use, but instead makes it easy for customers to [integrate deployments to our platform](https://cloud.gov/docs/management/continuous-deployment/) into their existing tools and workflows. If you are currently using a tool like Team Foundation Server or Azure DevOps, you can quickly and easily [set up a service account](https://cloud.gov/docs/services/cloud-gov-service-account/) to automate deployments to cloud.gov for your application.

**Can I run .NET Framework applications on cloud.gov in a container?**

While cloud.gov supports [deployments using containers](https://cloud.gov/docs/deployment/docker/), and there are [containers for .NET Framework](https://hub.docker.com/search?q=microsoft-dotnet-framework) available, this approach should be considered experimental. The better approach for running .NET applications on cloud.gov is to target the .NET Core platform and port any existing applications to run on the platform.

Got additional questions? Don't hesitate to [reach out to us](mailto:inquiries@cloud.gov) to learn more about how you can run your .NET applications on the cloud.gov platform.
