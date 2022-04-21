---
layout: post
date: April 6, 2022
title: "New Feature: Encrypted Container-to-Container Networking"
excerpt: A new update to Container-to-Container networking allows developers to enable encryption of traffic between applications using SSL/TLS.
---

The cloud.gov platform now offers developers the ability to encrypt container-to-container traffic using SSL/TLS, providing more security for your applications' internal communications. This feature is also a step towards zero trust security.

## About Container-to-Container Networking

Container-to-container networking allows applications to communicate with each other over an internal network known as an [overlay network](https://docs.cloudfoundry.org/concepts/understand-cf-networking.html#overlay-network). Traffic sent over this overlay network is not allowed to leave it, and the network itself is not externally routable. This ensures that nothing outside of the network can see the traffic being passed between applications.

In order to implement container-to-container networking you will need to:

1. Set up [internal routes](https://docs.cloudfoundry.org/devguide/deploy-apps/routes-domains.html#internal-routes) to your applications using the `cf map-route` command.
2. Create [network policies](https://docs.cloudfoundry.org/devguide/deploy-apps/cf-networking.html#add-policy) using the `cf add-network-policy` command.

Once you have the routes and policies in place your applications will be able to communicate with each other by connecting to the endpoints and ports you specified.

## Securing Container-to-Container Networking

Container-to-container networking on its own works to keep traffic between applications from being accessed by the outside world. However, this does not prevent other applications or users on the internal network from accessing the data being transferred between applications. This is where secure container-to-container networking comes in. By encrypting the internal traffic between applications nothing else will be able to read the information being sent.

In terms of the zero trust security model this addresses the assumption that just because something is on the internal network it should be implicitly trusted. Instead of trusting what is on the internal network, we encrypt traffic so that only the specified applications can see the data. This can also be taken one step further by configuring your applications to implement their own TLS and confirming the permissions of the client requesting data.

### Implementation

There are two options for implementing secure container-to-container networking. The `automatic` option which handles provisiong certificates and ensuring TLS termination for you, and the `manual` option where you configure your own certificates and handling of TLS termination.

Cloud Foundry, and by extension cloud.gov, has designated port `61443` to be used for the automatic encryption of container-to-container networking. Any traffic sent to this port will be encrypted automatically. You can specify the use of this port with the `cf add-network-policy` command. When using the automatic option the destination application itself does not need to be changed, and the source application only needs to be modified to send traffic to the correct port. The automatic option is useful if you only need to care about preventing sniffing of traffic between your applications.

If your application needs to manage its own TLS termination (for example if it uses mutual TLS), then you need to implement the 'manual option' for secure container-to-container networking. This option requires configuring your own certificates, but it also means your applications can use those certificates for its TLS configuration. Using this option you can also specify which ports your applications will use for terminating your encrypted traffic, instead of only being able to use port `61443`.

## In Conclusion

Having the ability to encrypt container-to-container networking provides more security for your applications' internal communications, and with multiple methods you can choose which option is best for you and your organization. For a more in-depth guide check out the [container-to-container networking]({{ site.baseurl }}{% link _docs/management/container-to-container.md %}) documentation. You can also find out more from the official Cloud Foundry documentation on [Securing Container-to-Container Traffic](https://docs.cloudfoundry.org/concepts/understand-cf-networking.html#securing-traffic).