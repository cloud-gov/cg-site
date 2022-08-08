---
layout: post
title: "Adding users to your sandbox"
date: August 8, 2022
excerpt: Follow these instructions to add a user to your sandbox
---

If you would like to add a user to your sandbox org, login to your account via the command line and run:

`cf set-space-role <USERNAME> <ORG> <SPACE> <ROLE>`

Where:

- `USERNAME` is the username of the user you want to add
- `ORG` is the name of your sandbox org
- `SPACE` is the name of the space you want the user to have access to within your org.
- `ROLE` is set to one of 'SpaceManager', 'SpaceDeveloper', or 'SpaceAuditor' depending on the level of access you want the user to have.

The next time the user logs back in to their account they will be able to see and access the space you assigned them to.