---
layout: post
title: Shared Database Deprecation Notice
date: April 2, 2021
---

_This is a repost of our StatusPage notice, originally posted August 7th, 2020_

# Important updates and enhancements to cloud.gov’s relational database service

This message is to let you know about recent and upcoming changes to cloud.gov’s relational database services, which include the following:

- Deprecation of the shared instance plans
- Scaling down of under-utilized instances
- New service plan offerings
- Ability to modify existing service instances
- Documentation updates on our website


## What is happening and what is the impact to cloud.gov customers?

As of January 24, 2021, shared instance plans will no longer be available as a choice for creating new database instances. Customers will only be able to choose from the dedicated service plans. Sandbox accounts will only have access to the micro-psql and small-mysql service plans.

Within 14 days of this notice, we will also begin scaling down under-utilized database instances to smaller service plans and asking if unused instances are still needed. We will initially target databases with 10 or fewer recent concurrent connections and low CPU usage. Applications that are dependent on database availability may experience a short period of unavailability during the scale operation; please reach out to our team with your org, space, and service name if there are days we should avoid resizing deployed instances. As a cost-recoverable program, we are tasked with being responsible stewards for our operating costs and this will allow us to keep costs under control.


## What do cloud.gov customers need to do?

At this time, customers who are currently running shared database server instances will need to begin planning a migration to a dedicated instance plan. To perform a migration, a customer must export their existing database and restore it into a new instance created with a dedicated service plan. We have instructions on how to export a database on our website and will send out more information on how to perform the restore in the near future.

New sandbox users will be able to use the new dedicated instance plans right away, and we will be reaching out to customers about under-utilized instances at the aforementioned date with additional information and instructions for next steps.


## Why are the shared instance plans being deprecated?

We are deprecating the shared instance plans in favor of offering new, micro- and small-sized dedicated instance plans. This will enable us to improve our security compliance posture and offer more performant and efficient database server choices for our customers.

It will also enable more flexibility for customers in managing their own database instances and allow both customers and our own platform operators to manage database backups and restorations. This is not currently possible in the shared instance plans.


## How can customers leverage the new service plans?

Customers can begin using the new service plans right away when creating a new database service. In addition to this, we have also added the ability to modify existing database services in place. Customers can now switch database service plans by following the update instructions in our documentation. There are a couple of things to note about this:

- Switching between shared instance plans and dedicated instance plans is not possible; you must manually backup and restore your database
- Switching between database engines (e.g., PostgreSQL and MySQL) is not possible; you must switch between plans for the same database engine

Furthermore, we have also updated our documentation to include all of the service plans we currently offer in cloud.gov and which plans are available in sandbox accounts.


If you have any questions or concerns, please contact us at support@cloud.gov.
