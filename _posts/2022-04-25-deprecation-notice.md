---
layout: post
date: April 25, 2022
title: "Deprecation Notice: Shared Database Service Instances"
excerpt: Important change to service offerings in the database service
---

This message is to let you know about the planned deprecation of the shared instance plans in cloud.gov’s relational database service.

## What is happening and what is the impact on cloud.gov customers?

As of May 24, 2022, shared instance plans will no longer be available as a choice for creating new database instances.  Customers will only be able to choose from the dedicated service plans.  Sandbox accounts will only have access to the micro-psql and small-mysql service plans.

## What do cloud.gov customers need to do?

At this time, customers who are currently running shared database server instances will need to begin planning a migration to a dedicated instance plan.  To perform a migration, a customer must export their existing database and restore it into a new instance created with a dedicated service plan.  We have instructions on how to export and restore a database on our website.

## Why are the shared instance plans being deprecated?

We are deprecating the shared instance plans in favor of offering new, micro- and small-sized dedicated instance plans.  This will enable us to improve our security compliance posture and offer more performant and efficient database server choices for our customers.
It will also enable more flexibility for customers in managing their own database instances and allow both customers and our own platform operators to manage database backups and restorations.  This is not currently possible in the shared instance plans.

## How can customers leverage the new service plans?

Customers can begin using the new service plans right away when creating a new database service.  In addition to this, we have also added the ability to modify existing database services in place.  Customers can now switch database service plans by following the update instructions in our documentation.  There are a couple of things to note about this:

- Switching between shared instance plans and dedicated instance plans is not possible; you must manually backup and restore your database
- Switching between database engines (e.g., PostgreSQL and MySQL) is not possible; you must switch between plans for the same database engine
  
Furthermore, we have also updated our documentation to include all of the service plans we currently offer in cloud.gov and which plans are available in sandbox accounts.

If you have any questions or concerns, please contact us at support@cloud.gov.
