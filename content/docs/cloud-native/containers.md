---
menu:
    docs:
        parent: cloud-native
title: Containers
---

## History

While Docker has become the household name for containers, in 2014 during a rewrite of the internal container implementation from C++ to Go, Docker announced _libcontainer_, the shared container runtime library for designing, building, and deploying container images. Since then, _libcontainer_ has moved to the [runc](https://github.com/opencontainers/runc) project as the open source standard way of managing containers and has been picked up by other projects. Since then, containers have risen to be the ruling unit of work in the infrastructure landscape.

## What's in a Container?

Containers are made up of container images, a compressed, versioned binary tree of software components that can be loaded by an operating system. Container images consist of a couple core components:

* rootfs (root filesystem)
* Filesystem layers

The rootfs is known as the base layer of your container image. This base layer, or rootfs, generally consists of the filesystem layout and any core tools that your container image needs. Rootfs' are generally provided by platform vendors, such as Ubuntu, Cloud Foundry, Red Hat, Microsoft, etc. For Docker images, when you specify `FROM ubuntu:18.04`, you are specifying that you want to use the Ubuntu 18.04 base layers, which consist of their own set of layers upon their rootfs, which is local build directory where things are compiled from scratch and packaged as the rootfs. When you specify `FROM ubuntu:18.04`, you are taking ownership of the 6 base layers which make up the `ubuntu:18.04` container image.

Sitting above the rootfs are your filesystem layers. These layers consist of any updates, binaries, application code, folder renames, etc.; anything you do outside the rootfs creates at least one layer. For example, if you have a `Dockerfile` which looks something like this:

```
FROM ubuntu:18.04
CMD ["/bin/bash"]
```

You are creating a new layer in your container with the `CMD` instruction. Paired with the previous 6 layers of the base Ubuntu 18.04 image, you now own and control 7 container layers as part of your operational guidelines.

## Container Image Security

Container images are downloaded from registries like Docker Hub or third-party registries like Quay. These registries host container images from organizations and individuals alike. There are official repositories from most IT vendors, and many unauthorized ones as well–which can lead to some serious security concerns. Across the application lifecycle, developers, QA and IT will download many images for different needs. It’s important to monitor these container images, and perform checks before they are installed in order to ensure container security.

With these container registries, there is often not due diligence performed by the owning parties to ensure proper security compliance and scanning. Not only are those steps generally not taken, developers and operators generally don't perform static analysis on the container image, so there are potentially malicious components in your containers that you may not be aware of. While this is most likely not the case, it's important to understand the high level of risk associated with owning a container image.

## Containers with cloud.gov

cloud.gov is fully compatible with Linux-based Docker containers. However, by leveraging the Bring-Your-Own-Container (BYOC) model, developers and operators are assuming much higher security risks that cloud.gov cannot protect against. cloud.gov does not currently provide any type of security scanning or static analysis of BYOC workloads, which means developers and operators are generally responsible for ensuring their workloads meet compliance standards.

cloud.gov does, however, provide DISA STIG-compliant container images for your appliation workloads. When developers push raw code to the platform using one of the supported buildpacks, cloud.gov uses it's DISA STIG-compliant rootfs as your base container rootfs, and then layers your application bits on top of that. Once cloud.gov has created your baseline secure container image, it's then deployed to the DISA STIG-compliant container orchestration engine that underpins the platform. By leveraging cloud.gov's secure-by-default container images and container build process, developers and operators are only responsible for application-specific compliance and no longer have to worry about platform or runtime compliance concerns.
