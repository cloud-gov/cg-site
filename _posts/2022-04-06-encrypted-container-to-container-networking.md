---
layout: post
date: February 9, 2022
title: "New Feature: Encrypted Container-to-Container Networking"
excerpt: A new update to Container-to-Container networking allows developers to enable encryption of traffic between applications using SSL/TLS.
---

The cloud.gov platform now offers developers the ability to encrypt container-to-container traffic using SSL/TLS, providing more security for your applications internal communications. This feature is also another step towards zero trust security.

## About Container-to-Container Networking

Container-to-container networking allows applications to communicate with each other over an internal network known as an [overlay network](https://docs.cloudfoundry.org/concepts/understand-cf-networking.html#overlay-network). Traffic sent over this overlay network is not allowed to leave said network, and the network itself is not externally routable. This ensures that nothing outside of the network can see the traffic being passed between applications.

In order to implement container-to-container networking you will need to:

1. Set up [internal routes](https://docs.cloudfoundry.org/devguide/deploy-apps/routes-domains.html#internal-routes) to your applications using the `cf map-route` command.
2. Create [network policies](https://docs.cloudfoundry.org/devguide/deploy-apps/cf-networking.html#add-policy) using the `cf add-network-policy` command.

Once you have the routes and policies in place your applications will be able to communicate with each other by connecting to the endpoints and ports you specified.

## Securing Container-to-Container Networking

Container-to-container networking on its own works to keep traffic between applications from being accessed by the outside world. However, this does not prevent other applications or users on the internal network from accessing the data being transferred between applications. This is where secure container-to-container networking comes in. By encrypting the internal traffic between applications nothing else will be able to read the information being sent.

In terms of the zero trust security model this addresses the assumption that just because something is on the internal network it should be implicitly trusted. Instead, traffic is encrypted so that only the specified applications involved can see the data.

Cloud Foundry, and by extension cloud.gov, has designated port `61443` to be used for encrypted container-to-container traffic. Any traffic sent between applications using this port will automatically be encrypted. This port can be specified using the `cf add-network-policy` command.

When setting up encryption the destination application itself does not need to be changed, and the source application only needs to be modified to send traffic to the correct port. For a more in-depth guide check out the [container-to-container networking]({{ site.baseurl }}{% link _docs/management/container-to-container.md %}) documentation. You can also check out the official Cloud Foundry documentation on [Securing Container-to-Container Traffic](https://docs.cloudfoundry.org/concepts/understand-cf-networking.html#securing-traffic).