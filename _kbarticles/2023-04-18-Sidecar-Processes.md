---
layout: post
title: "Sidecar Processes"
date: April 18, 2023
excerpt: Using sidecar processes.
---

## What is a sidecar process?
Sidecar processes are additional processes you can run in the same container as your application.

## How do sidecar processes work?
When deploying a sidecar with your application Cloud Foundry packages the code and configuration needed for running the application and sidecar in the same droplet. The droplet is then deployed in the same container with the application and sidecar being deployed in parellel. The application and sidecar have independent health checks.

## Use Case
Sidecars can be used on processes which depend on each other or need to run in the same container.

## What are some example uses?
Sidecar processes are useful for things such as application monitoring processes or a process that allows for a centralized server to deliver external configuration properties to an application and management of that configuration across different environments.

## How do you deploy sidecar processes?
You can push sidecar processes with your app by using one of two methods:
* Using an app manifest. For instructions, see [Push an App with a Sidecar Using an App Manifest](https://docs.cloudfoundry.org/devguide/sidecars.html#create).
* With a custom buildpack. For instructions, see [Sidecar Buildpacks](https://docs.cloudfoundry.org/buildpacks/sidecar-buildpacks.html).

## What are some limitations and things to keep notice of?

* The start and stop order of app processes and their sidecars is undefined.
* App processes and sidecars are codependent: If either crashes or exits, the other does also.
* Sidecars are currently not independently scalable. Sidecars share resources with the main application process and other sidecars within the container.
* Sidecars only support process-based health checks. HTTP health checks for sidecars are not currently supported.

## Specific Java application requirements
Linked here are specific considerations for [Java applications](https://docs.cloudfoundry.org/devguide/sidecars.html#java).
