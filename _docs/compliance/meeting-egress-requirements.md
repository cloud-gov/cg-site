---
parent: compliance
layout: docs
sidenav: true
title: Meeting Egress requirements
---
Protecting your boundaries

By default, when new spaces are created in your orgaization, cloud.gov
[applies an application security group (ASG)]({{ site.baseurl }}/docs/management/space-egress/)
that restricts access to only the internal cloud.gov network.
This helps protect your new spaces, but for most use cases, you will need to modify
the ASG that govern your space.

Your cloud.gov application will require some configuration in order
to properly meet SC-7's Boundary Protection Requirements. Meeting those
requirements means protecting your system's external and key internal
interfaces, to prevent bad actors from 

{% mermaid_diagram id-prefix="Figure-1.-Typical setup" %}
graph TB

subgraph Public internet
  user((Public user))
end

subgraph cloud.gov boundary
  balancer[cloud.gov load balancer]
  gorouter[gorouter]

  subgraph cloud.gov organization
    subgraph space
      backend[backend.app.internal]
      frontend[frontend.app.cloud.gov]
    end
  end

  subgraph Brokered services
    services[RDS, Redis, Elasticsearch ...]
  end
end

user -- TLS --> balancer
balancer -- TLS --> gorouter
gorouter -- TLS --> frontend
frontend -- "TLS (via 61443)" --> backend
backend -- TLS --> services

{% endmermaid_diagram %}


