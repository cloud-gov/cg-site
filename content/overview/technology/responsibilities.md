---
menu:
  overview:
    parent: technology
title: What the cloud.gov PaaS offers
weight: 5
aliases:
  - /docs/intro/technology/responsibilities
  - /intro/technology/responsibilities
---

As a Platform as a Service, cloud.gov is responsible for maintenance and security of the cloud.gov platform. Customers are responsible for maintenance and security of their custom code running on the platform.

cloud.gov is always responsible for the following components at its platform level:

* Operating system
* Continuous monitoring
* Anti-malware
* Network security
* Versioning
* Scaling
* Logging
* Alerting

App #1 uses a [standard buildpack]({{< relref "docs/getting-started/concepts.md#buildpacks" >}}). (A buildpack provides support for a programming language.) The customer is only responsible for the app code and its dependencies.

{{< diagrams id-prefix="app-example-1" >}}
graph LR
  sbp(Supported buildpack)
  os(Operating system)
  conmon(Continuous monitoring)
  amw(Anti-malware)
  ns(Network security)
  vs(Versioning)
  sc(Scaling)
  lg(Logging)
  at(Alerting)
  cc[Your application code]

  subgraph customer responsibility
    cc
  end
  subgraph cloud.gov responsibility
    cc --> sbp
    sbp --- os
    os --- conmon
    conmon --- amw
    amw --- ns
    ns --- vs
    vs --- sc
    sc --- lg
    lg --- at
  end
{{< /diagrams >}}

App #2 uses an [unsupported/custom buildpack]({{< relref "docs/apps/experimental/custom-buildpacks.md" >}}), so the customer's responsibility expands from the app code to managing the unsupported/custom buildpack and its dependencies. If you choose to use a custom buildpack, you are responsible for:

* Ensuring your application framework/runtime and all dependencies are supported versions with no known vulnerabilities.
* Continually updating your runtime and dependencies as new vulnerabilities are discovered and fixed.
* Maintaining a best practice baseline configuration for your application framework/runtime that meets all applicable security standards.

{{< diagrams id-prefix="app-example-2" >}}
graph LR
  os(Operating System)
  conmon(Continuous Monitoring)
  amw(Anti-Malware)
  ns(Network Security)
  vs(Versioning)
  sc(Scaling)
  lg(Logging)
  at(Alerting)
  cbp["Custom (unsupported) buildpack"]
  cc[Your App Code]

  subgraph customer responsibility
    cc --- cbp
    cbp
  end
  subgraph cloud.gov responsibility
    cbp --> os
    os --- conmon
    conmon --- amw
    amw --- ns
    ns --- vs
    vs --- sc
    sc --- lg
    lg --- at
  end
{{< /diagrams >}}


App #3 is a Docker setup, where the customer is fully responsible for their Docker container and custom image. [Learn about this experimental feature.]({{< relref "docs/apps/experimental/docker.md" >}})

{{< diagrams id-prefix="app-example-3" >}}
graph LR
  os(Operating System)
  conmon(Continuous Monitoring)
  amw(Anti-Malware)
  ns(Network Security)
  vs(Versioning)
  sc(Scaling)
  lg(Logging)
  at(Alerting)
  cig["Custom (unsupported) image"]
  cc[Docker container]

  subgraph customer responsibility
    cc --- cig
    cig
  end
  subgraph cloud.gov responsibility
    cig --> os
    os --- conmon
    conmon --- amw
    amw --- ns
    ns --- vs
    vs --- sc
    sc --- lg
    lg --- at
{{< /diagrams >}}
