---
menu:
  docs:
    parent: deployment
title: Kubernetes quickstart
---

### Overview
Kubernetes provides stateful services to tenant applications through the
[kubernetes-broker](https://github.com/18F/kubernetes-broker).  Kubernetes
will provision "Pods" for services, which are created to satisfy a 
"Deployment" specification.

For all configurations, storage can move as pods are created and deleted,
however storage will not be mounted simultaneously.

#### Set Path
Kubernetes binaries are shipped in a BOSH package:
```shell
export PATH=$PATH:/var/vcap/packages/kubernetes/bin
```

#### Get a list of pods
Pods are created to satisfy a deployment requirement.
```shell
kubectl get pods
```

#### Get a list of deployments
Deployments describe how to provision a application, including
memory, disk, and services.  For example, a WordPress deployment
would need both a PHP pod and a MySQL pod.
```shell
kubectl get deployments
```

#### Get a list of replica sets
```shell
kubectl get rs
```

#### Get a list of services / ports and ips
```shell
kubectl get svc
```

#### Review pod logs
Pods output logs to STDOUT, and these are temporary stored
by Kubernetes for review.  Pods should not contain their
own logging mechanisms (ie ElasticSearch should not also
run logrotate):
```shell
kubectl logs x0e41a06287f54-master-1362982585-aamfj
```

#### Show pod status
```shell
kubectl describe pod x0e41a06287f54-master-1362982585-aamfj
```

#### Stop entire Kubernetes deployment
```shell
bosh stop kubernetes
```

#### Get a shell in a particular pod
Sometimes you need to connect inside a pod:
```shell
kubectl exec -it x0e41a06287f54-master-1362982585-aamfj /bin/bash
```

#### Deleting a pod
Sometimes a pod gets scheduled, and the EBS volume
is unable to be mounted on that instance.  You can
safely delete a pod and it will be automatically 
rescheduled:
```shell
kubectl delete pod x0e41a06287f54-master-1362982585-aamfj
```

#### NodePorts
Currently services are deployed via NodePort, which means that Kubernetes generates a temporary random port, and assigns that port to each Master node.  This port will redirect to the containers exposed service port, for example 9200

  - Node Port 31000
  - Service Port 9200

  ## Both of these return the same host via iptables:
  ```
  curl http://0.master.default.kubernetes.bosh
  curl http://1.master.default.kubernetes.bosh
  ```
