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

#### Login to kubernetes master

From a jumpbox in the appropriate environment:
- ssh to a master
- update the PATH to find the kubernetes binaries
- sudo to root for all the `kubectl` commands

```sh
bosh -d kubernetes ssh master/0
sudo bash
export PATH=$PATH:/var/vcap/packages/kubernetes/bin
```

#### Fixing non-running pods
Login to a kubernetes master, find the namespaces, and describe the pods:
```sh
kubectl get namespaces 
kubectl --namespace :namespace describe pod :pod-name
```
where you provide values for :namespace and :pod-name. A pod-name will be something like `xc956b1d94dd64-master-0`

The `Events` section should indicate why the pod cannot be started. Resolve the underlying issue and the pod should transition into a `Running` state.  

For pods that are part of persistent set, like a `statefulset`, `deployment`, `daemonset`, etc, you can force a pod restart by deleting it, and letting the kubernetes scheduler recreate it:

```sh
kubectl --namespace :namespace delete pod :pod-name
```

### Other useful Kubernetes `kubectl` commands 

All of these assume you are logged into a Kubernetes master:

#### Get a list of pods
Pods are created to satisfy a deployment requirement.
```sh
kubectl get pods
```

#### Get a list of deployments
Deployments describe how to provision a application, including
memory, disk, and services.  For example, a WordPress deployment
would need both a PHP pod and a MySQL pod:
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
kubectl logs :pod-name
```

#### Show pod status
```sh
kubectl describe pod :pod-name
```

#### Get a shell in a particular pod
Sometimes you need to connect inside a pod:
```sh
kubectl exec -it :pod-name /bin/bash
```

#### Deleting a pod
Sometimes a pod gets scheduled, and the EBS volume
is unable to be mounted on that instance.  You can
safely delete a pod and it will be automatically
rescheduled:
```sh
kubectl delete pod :pod-name
```

