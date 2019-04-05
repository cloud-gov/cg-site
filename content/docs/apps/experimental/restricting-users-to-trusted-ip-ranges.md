---
menu:
  docs:
    parent: experimental
title: Restricting users to trusted IP ranges
---

You can configure cloud.gov to restrict users in a particular domain (e.g., `agency.gov`) from using cloud.gov services unless their requests originate from a trusted network location. You can use this feature to help your agency comply with the [Trusted Internet Connections (TIC) Initiative](https://www.dhs.gov/trusted-internet-connections) while using cloud.gov. For more context, see [Meeting TIC requirements]({{< relref "docs/compliance/meeting-tic-requirements.md" >}}).

This feature only limits requests to cloud.gov services, such as the cloud.gov API accessed via the command line and the [cloud.gov dashboard](https://dashboard.fr.cloud.gov). This feature does not restrict requests directly to applications that you run on cloud.gov, though [you can do that](#restricting-access-to-your-own-applications) on your own.

### Contact support to configure restrictions for your domain

_Note: As of October 2017, this feature is not yet available, pending FedRAMP approval. If you want to configure this feature, create a ticket and our team will let you know our estimated timeline for approval._

Create a [support ticket](mailto:cloud-gov-support@gsa.gov?body=Email%20domain%3A%0A%0AEgress%20IP%20ranges%3A%0A%0AAgency%20CIO%3A%0A) specifying the IP address ranges that are valid for your domain. Because address restriction applies to all cloud.gov users from your email domain, we will request confirmation from your agency CIO before changing the configuration.

### Grant roles only to users from your restricted domain
To fully limit access to your apps and services, you must ensure that all users with roles in your orgs and spaces are using email addresses within your email domain. For example, if your email domain is `agency.gov` but you grant access to a contractor whose email address is `bob@example.com`, the contractor will not be limited to your configured IP address ranges. We recommend you give contractors an e-mail address within your domain like `contractor-bob@agency.gov`, and grant roles to them using only that address.

## Restricting access to your own applications

Limiting or restricting access for both ingress and egress traffic from your applications is fairly straightforward through a feature called [Application Security Groups](https://docs.cloudfoundry.org/concepts/asg.html), or ASGs. ASGs support white- and black-listing network traffic from given IPv4 ranges.

### Scoping

Application Security Groups (ASGs) support two types of scoping:

* Platform
* Space

These scopes allow both operators and developers to have more fine grained access control. Platform-scoped ASGs are applied at the platform level, and would apply to all tenants of cloud.gov. The cloud.gov team does not apply platform-scoped ASGs as they can interrupt tenant operations unless they are needed to meet platform compliance requirements.

Space-scoped ASGs are specific to a given tenant's Space within their allotted organization. This allows for tenants to create Space-specific security groups that apply to all applications within a given space. To apply a Space-scoped ASG to a single application, create a new Space, assign the ASG, and then deploy the application.

### Defaults

cloud.gov is preconfigured with two ASGs: `public_networks` and `dns`. These ASGs are applied by default to all containers in your deployment.

* `public_networks`: This group allows access to public networks, and blocks access to private networks and link-local addresses. Cloud Foundry blocks outgoing traffic to the following IP address ranges by specifically allowing traffic to all other addresses.

```
10.0.0.0 - 10.255.255.255
169.254.0.0 - 169.254.255.255
172.16.0.0 - 172.31.255.255
192.168.0.0 - 192.168.255.255
```

`dns`: This group allows access to DNS on port 53 for any IP address.

The default ASGs are defined as follows:

```yaml
  security_group_definitions:
  - name: public_networks
    rules:
    - destination: 0.0.0.0-9.255.255.255
      protocol: all
    - destination: 11.0.0.0-169.253.255.255
      protocol: all
    - destination: 169.255.0.0-172.15.255.255
      protocol: all
    - destination: 172.32.0.0-192.167.255.255
      protocol: all
    - destination: 192.169.0.0-255.255.255.255
      protocol: all
  - name: dns
    rules:
    - destination: 0.0.0.0/0
      ports: '53'
      protocol: tcp
    - destination: 0.0.0.0/0
      ports: '53'
      protocol: udp
```

### More Information

If you need more information about Application Security Groups, the [Cloud Foundry documentation](https://docs.cloudfoundry.org/concepts/asg.html) goes into depth about ASGs and the various features they provide.