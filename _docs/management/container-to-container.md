---
parent: management
layout: docs
sidenav: true
redirect_from: 
    - /docs/apps/container-to-container/
title: Container-to-Container Networking
---

App developers can leverage cloud.gov's [container-to-container networking](https://docs.cloudfoundry.org/concepts/understand-cf-networking.html) feature to allow direct communication between their applications. This utilizes Cloud Foundry's [overlay network](https://docs.cloudfoundry.org/concepts/understand-cf-networking.html#overlay-network), which is not externally routable. Any traffic sent between containers on this network does not leave the overlay.

## How to set up container-to-container networking

To set up and allow traffic between your applications:

1. Create an internal route to your application(s)
   ```
   cf map-route APP apps.internal --hostname APP
   ```
2. Add a network policy to allow traffic from one application to another
   ```
   cf add-network-policy SOURCE_APP DESTINATION_APP -s DESTINATION_SPACE_NAME -o DESTINATION_ORG_NAME --protocol (tcp | udp) --port RANGE
   ```

## Configuring secure container-to-container networking

There are two main ways to enable TLS between your application: 
- Automatically - With this option the platform handles everything, from provisioning certificates to enforcing TLS termination at the destination (steps described below)
- Manually - This option is necessary if you want to listen on multiple or non-configurable ports. With this option, you are responsible for configuring your application with its own TLS termination and managing TLS certificates. The steps to enable this option depend on the application(s) you're running, and are out of scope for this documentation.

To set up automatic encryption:

1. Create a network policy for your destination application and set the port to 61443. All traffic sent to this port will use SSL/TLS
   ```
   cf add-network-policy SOURCE_APP DESTINATION_APP -s DESTINATION_SPACE_NAME -o DESTINATION_ORG_NAME --protocol tcp --port 61443
   ```
2. Update your source application to send all traffic to the destination application on port 61443.

For more information you can check out the Cloud Foundry documentation on [Securing Container-to-Container Traffic](https://docs.cloudfoundry.org/concepts/understand-cf-networking.html#securing-traffic)