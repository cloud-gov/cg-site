---
menu:
  docs:
    parent: runbook

title: Troubleshooting Kubernetes
---

## Overview
Kubernetes is used to provided managed services to tenant applications via [18F/kubernetes-broker](https://github.com/18F/kubernetes-broker).

### Responding to Kubernetes alerts
Alerts are generated whenever a pod's status is not `Running`. Alerts contains the [namespace](https://kubernetes.io/docs/user-guide/namespaces/), [pod name](https://kubernetes.io/docs/user-guide/pods/), and [pod status](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-phase).

If the namespace is `default` and the pod name is a random string then it is a managed service and likely only impacts a specific tenant application.  If the namespace is `kube-system` or the pod name is human readable then it is a platform component which could impact all managed services.

#### Fixing non-running pods
Login to a kubernetes master and describe the pod:
```sh
/var/vcap/packages/kubernetes/bin/kubectl --namespace :namespace describe pod :pod-name
```

The `Events` section should indicate why the pod cannot be started.  Resolve the underlying issue and the pod should transition into a `Running` state.  If you need to force the pod to be restarted you can delete it which will cause kubernetes to immediately recreate it.
```sh
/var/vcap/packages/kubernetes/bin/kubectl --namespace :namespace delete pod :pod-name
```


### Other Useful Kubernetes commands

#### Set Path
Kubernetes binaries are shipped in a BOSH package:
```sh
export PATH=$PATH:/var/vcap/packages/kubernetes/bin
```

#### Get a list of pods
Pods are created to satisfy a deployment requirement.
```sh
kubectl get pods
```

#### Get a list of deployments
Deployments describe how to provision a application, including
memory, disk, and services.  For example, a WordPress deployment
would need both a PHP pod and a MySQL pod.
```sh
kubectl get deployments
```

#### Get a list of replica sets
```sh
kubectl get rs
```

#### Get a list of services / ports and ips
```sh
kubectl get svc
```

#### Review pod logs
Pods output logs to STDOUT, and these are temporary stored
by Kubernetes for review.  Pods should not contain their
own logging mechanisms (ie ElasticSearch should not also
run logrotate):
```sh
kubectl logs x0e41a06287f54-master-1362982585-aamfj
```

#### Show pod status
```sh
kubectl describe pod x0e41a06287f54-master-1362982585-aamfj
```

#### Stop entire Kubernetes deployment
```sh
bosh -d kubernetes stop
```

#### Get a shell in a particular pod
Sometimes you need to connect inside a pod:
```sh
kubectl exec -it x0e41a06287f54-master-1362982585-aamfj /bin/bash
```

#### Deleting a pod
Sometimes a pod gets scheduled, and the EBS volume
is unable to be mounted on that instance.  You can
safely delete a pod and it will be automatically
rescheduled:
```sh
kubectl delete pod x0e41a06287f54-master-1362982585-aamfj
```

#### NodePorts
Currently services are deployed via NodePort, which means that Kubernetes generates a temporary random port, and assigns that port to each Master node.  This port will redirect to the containers exposed service port, for example 9200

  - Node Port 31000
  - Service Port 9200

  ## Both of these return the same host via iptables:
  ```sh
  curl http://0.master.default.kubernetes.bosh
  curl http://1.master.default.kubernetes.bosh
  ```
