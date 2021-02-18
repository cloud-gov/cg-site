---
layout: post
title: "Writing an SSP for a cloud.gov system: System Environment"
date: February 17, 2021
excerpt: We share a sample "System Environment" SSP response for a Low-impact system
---

At cloud.gov, we often get requests from partners going through the ATO process for guidance on how to complete the System Environment section of their System Security Plan (SSP). Since this is a common question, here is an example to get you started. Partners with additional questions can also reach out to support@cloud.gov.


---
## System Environment 

As the cloud.gov PaaS is based on Cloud Foundry, our application components are each built and deployed in accordance with their corresponding Cloud Foundry manifest files. Manifest files indicate the required Cloud Foundry buildpack (e.g, language runtime for Node.js, Python, Docker, etc.) and stack (e.g., cflinuxfs3, which is based on Ubuntu 18.04).  Our application components operate on Cloud Foundry containers provided by cloud.gov.  As a result, they rely on security configurations put into place by the cloud.gov team.

Once an application is built into an app image, the cloud.gov platform instantiates a corresponding execution container, isolated from other tenant applications, within which the application’s process will run.
To improve availability for end users, 3 instances of the web application are launched in cloud.gov. Behind the scenes, cloud.gov deploys these instances across multiple availability zones within the AWS GovCloud (US) region.

Our application is deployed to cloud.gov  by the continuous integration server (fill in the blank).

The cloud.gov platform ensures that these buildpack and stacks have been configured and hardened as required by our authorizing agency.

Likewise, cloud.gov provides suitable, hardened configuration for the following brokered services: Relational Database Service (RDS) for PostgreSQL, S3, CloudFront and Redis.

Finally, maintaining TLS certificates for the application components accessible via the web and terminating inbound, external SSL (TLS) encrypted connections to them are also handled by cloud.gov using their Let's Encrypt TLS certificate broker, and documented in the cloud.gov System Security Plan (SSP).


Asset Inventory
The following table identifies the virtual and physical components of the our application 1.1.

IP Address/Hostname | Make | Model and Firmware | Location | Components that Use this Device 
 -- | -- | -- | -- | -- 
cloud.gov org: my-org<br>space: prod<br>app: my-app | nodejs_buildpack | Cloud Foundry cflinuxfs3 | cloud.gov
cloud.gov org: my-org<br>space: prod<br>RDS my-db | cloud.gov brokered AWS RDS service| PostgreSQL 12.3  | cloud.gov | app: my-app


### Other SSP development resources

* [Data flow diagrams](/docs/compliance/diagrams/)


