---
layout: post
date: February 9, 2022
title: "New Feature: Encrypted Container-to-Container Networking"
excerpt: A new update to Container-to-Container networking allows developers to enable encryption of traffic between applications using SSL/TLS.
---

The cloud.gov platform now offers developers the ability to encrypt container-to-container traffic using SSL/TLS.

So what is container-to-container networking, how does it work, and why would you need encryption?

## About Container-to-Container Networking

Container-to-container networking allows applications to communicate with each other over an internal network known as an [overlay network](https://docs.cloudfoundry.org/concepts/understand-cf-networking.html#overlay-network). Traffic sent over this overlay network is not allowed leave the network, and the network itself is not externally routable. This ensures that nothing outside of the network can see the traffic being passed between applications.

To use the overlay network you set up [internal routes](https://docs.cloudfoundry.org/devguide/deploy-apps/routes-domains.html#internal-routes) to your applications using the `cf map-route` command, and create [network policies](https://docs.cloudfoundry.org/devguide/deploy-apps/cf-networking.html#add-policy) using the `cf add-network-policy` command. Once the routes and policies are in place your apps are able to communicate with each other by connecting to the specified endpoints and ports.

## Enabling Secure Container-to-Container Networking

Container-to-container networking on its own does well in keeping traffic between applications from being seen by the outside world. However, anything on the same network as the applications may potentially be able to read the traffic being sent between them. This is where secure container-to-container networking comes in. By encrypting the internal traffic only the applications that are meant to receive the data will be able to read it.

To this end Cloud Foundry, and by extension cloud.gov, has designated port `61443` as the port to use for encrypted container-to-container traffic. Any traffic sent between applications using this port will automatically be encrypted.

Using the `cf add-network-policy` you can specify that traffic is sent to this port. The destination application itself does not need to be changed, and the source application only needs to be modified to send traffic to the correct port.


For more information check out the official Cloud Foundry documentation on [Securing Container-to-Container Traffic](https://docs.cloudfoundry.org/concepts/understand-cf-networking.html#securing-traffic).