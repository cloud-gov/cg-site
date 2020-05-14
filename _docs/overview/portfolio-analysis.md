---
parent: overview
layout: docs
sidenav: true
title: What applications are supported?
overview: true
weight: 16
---

cloud.gov is suitable for a wide range of applications, including websites and non-website applications for internal and public uses.

Here's a process you can follow to identify the applications in your portfolio ready to move to cloud.gov.
<!--more-->

For help interpreting this list or evaluating specific cases, please email the cloud.gov team at [inquiries@cloud.gov](mailto:inquiries@cloud.gov). The cloud.gov team can help you evaluate whether you application is easy to migrate to cloud.gov, as well as how to approach more complex applications that require more modification. 

## Identify applications with a compatible security impact level
- FISMA Low
- FISMA Moderate
- Department of Defense Impact Level 2 (DoD CC SRG IL2)
<!-- The abbreviation used in the line above is intended to make this page easier for search engines to find. --> 

## Identify applications with a supported technology stack

**Operating systems**: 

- Application hosting: Linux (64-bit ABI)
- Client workstation: Any

**Application runtime options**:

- Go
- Java
- .NET Core (note, not .NET Framework!)
- Node.js
- PHP
- Python
- R
- Ruby
- Static HTML+JS+CSS
- 64-bit Linux binary (including compiled C and C++ applications)

**Backing services**:

- **Relational databases**:
  - MySQL
  - Oracle
  - PostgreSQL
- **Search engines**:
  - Elasticsearch
- **Cache/queues**:
  - Redis
- **Blob stores**:
  - S3

## Evaluate applications for cloud operations readiness
Once you have a list of applications with a compatible impact level and technology stack, use these criteria to sort that list from those applications already ideally suited to running in a PaaS environment to those which are likely to require modification.

Ideal applications follow as many of the [12-Factor App](https://12factor.net/) guidelines as possible. The more of the following questions you can answer with "yes", the better. Applications that follow these guidelines are easier to migrate between modern hosting environments; the guidelines aren't cloud.gov-specific except as noted!

1. **Codebase**: Is the codebase tracked in version control?
1. **Dependencies**: Are dependencies explicitly listed (such as package manager manifest)?
1. **Configuration**: Can the configuration be retrieved from environment variables?
1. **Backing services**: Does the application retry or fail gracefully if a service it connects to is unavailable?
1. **Build, release, run**: Can you build the deployment artifacts outside of the deployment environment, for example in a continuous deployment system?
1. **Processes**: Does the application keep its state in a backing service, rather than shared memory or filesystem?
1. **Port binding**: Does the application listen for requests over HTTP on a single port?
  - Applications that only accept requests over straight TCP are also possible, but may require additional work on the cloud.gov side to get going.
1. **Concurrency**: Does the application scale correctly without modification when you run additional instances of it behind a load-balancer?
  - Applications that require instances to be aware of each other are also possible, but may require additional work to configure correctly.
1. **Disposability**: Can the application start quickly and shutdown gracefully?
1. **Dev/prod parity**: Does the application exclude environment-sensitive code?
1. **Logs**: Does the application emit logs as a streams of single events (eg timestamped on single lines or JSON stanzas)?
1. **Administrative processes**: Can you run maintenance/management tasks as one-off processes?

## Watch out for networking complexity

- Does the application need to access services that reside in a private network (for example in your data center or in another cloud service provider)?
    - This is supported, but adds complexity because you may need to coordinate with your agency's network security staff and cloud.gov staff.

## What now?
Now that you have a sense of which applications are compatible with cloud.gov, and which will require more effort or are more complex, identify those which have the highest cost-of-delay... That is, the systems which will deliver the most benefit and which will reduce operational and security overhead the most by being in the cloud. You may need to work with your agency leadership to come to a consensus about where there's the most pain to be relieved or the most gain to be received, from the mission and financial (rather than technical) side.
