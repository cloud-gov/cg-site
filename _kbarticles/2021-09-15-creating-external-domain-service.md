---
layout: post
title: "Issues setting up an external domain service"
date: September 15, 2021
excerpt: Some tips on how to address issues when setting up a new external domain service
---

If you are trying to set up an external domain service for your website or application, you may encounter specific error messages that indicate a problem setting up your new service. Specifically, one error message you might encounter when creating a new external domain service looks like this:

```
You are not authorized to perform the requested action
```

This error is a result of the wrong role being set for the user attempting to create the new service. Some user with the `SpaceManager` role may assume that they have sufficient privileges to create a new service. However, in order to create a new service within your org or space a user must have the `SpaceDeveloper` role.

Some things you can do:

* You can check the existing roles in an organization by executing `cf org-users ORGANIZATION-NAME`
* If you do not currently have the `SpaceDeveloper` role, a space manager can add it by executing `cf set-org-role USERNAME ORGANIZATION-NAME SpaceDeveloper`.

Users with a `SpaceDeveloper` role should be able to create an external domain service without issue. More information on roles [can be found here](https://docs.cloudfoundry.org/adminguide/cli-user-management.html).