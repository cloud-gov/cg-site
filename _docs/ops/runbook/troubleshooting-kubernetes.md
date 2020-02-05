---
parent: runbook
layout: ops

layout: docs
sidenav: true
title: Troubleshooting Kubernetes
---

## Overview
Kubernetes is used to provided managed services to tenant applications via [18F/kubernetes-broker](https://github.com/18F/kubernetes-broker).
We deploy both the [Kubernetes Bosh release](https://github.com/18F/kubernetes-release)
and the broker via the [18F/cg-deploy-kubernetes](https://github.com/18F/cg-deploy-kubernetes)
repository. Custom images can be found in the [Kubernetes broker](https://github.com/18F/kubernetes-broker/tree/master/custom_images).

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

##### Pod is in a CrashLoopBackoff state

Check the logs for the pod (in this case, we are looking at the elasticsearch container on the pod):
```
kubectl logs <podname> elasticsearch
```

If you find that the pod logs are saying that it is out of disk space, follow
this course of action:

1. Search in the AWS console for the first part of the pod-name, e.g.
   `xc926b2d94dd54`.
1. Go to console, search under EC2 > Volumes for the first part of
   the pod name, select the volume, and manually increase the size.
1. Find the `minion` instance that it is attached to in the AWS console,
   as well as the volume name: `(minion/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX):/dev/xvdbX (attached)`
1. bosh ssh into `minion/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`
1. Do a `df | grep /dev/xvdbX` to make sure that the volume is there and is full.
1. Resize the filesystem with `resize2fs /dev/xvdbX`.
1. Delete the pod(s) with `kubectl delete pod <podname>`.
1. The pod(s) should be recreated without disk space problems, which should
   result in them not getting into the CrashLoopBackoff state.

#### Manually pulling an image from Docker

By default, Kubernetes does not pull docker images that already exist on the
node. When updating an existing image and tag, force Kubernetes to pull the
latest version from a [jumpbox]({{ site.baseurl }}{% link _docs/ops/runbook/troubleshooting-bosh.md %})
with the following command.

```shell
bosh -d kubernetes ssh minion 'bash -c "/var/vcap/packages/docker/bin/docker --host unix:///var/vcap/sys/run/docker/docker.sock pull ${DOCKER_USER}/${IMAGE_NAME}:${DOCKER_TAG}"'
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

#### Rotating secrets for a single service

If a secret shared for a deployment or stateful-set needs to be rotated, you
should be able to follow the current steps using the `kubectl` binary on the
`master` and `minion` VMs in the Kubernetes BOSH deployment. Please refer to the
[official Kubernetes documentation](https://kubernetes.io/docs/concepts/configuration/secret/)
around **Secrets** for more information.

You will need to rotate the Secret resource. You can get the ID for the secret
by describing the statefulset or deployment of any of the pods in a particular
service. You can use `kubectl get all | grep ${service_id}` to determine all
the pods, deployments, services, stateful-sets, etc for a given service. All
cloud.gov services are prefixed with the `${service_id}`.

The following examples gets the ID of the Secret resource from a StatefulSet.

```
kubectl describe statefulset ${name_of_stateful_set} | grep -i secret
```

look for output which talks about the key being set from a secret named with the
Service ID and the Service Name.

```sh
# possibly something along these lines...
<set to the key ${secret_name_from_k8s_manifest} in secret ${service_id}-${service_name}-credentials>
```

With that Secret ID, you can edit the secret with the following command.

```sh
kubectl edit secret ${service_id}-${service_name}-credentials
```

From this point forward, follow the Kubernetes documentation around updating
Secrets.

- https://kubernetes.io/docs/concepts/configuration/secret/#creating-a-secret-manually
- https://kubernetes.io/docs/concepts/configuration/secret/#decoding-a-secret
- https://kubernetes.io/docs/concepts/configuration/secret/#secret-and-pod-lifetime-interaction

Once the password has been changed and the pods have come up in a healthy state, you'll need the application to use the updated VCAP service. To do so: unbind the service from the application (`cf unbind-service`), bind it again (`cf bind-service`), then restage the application (`cf restage`)

**You should expect application failure from the time you've reset the Kubernetes pods until you've restaged the application.** During this window the application will be using outdated credentials.

#### Deleting a pod
Sometimes a pod gets scheduled, and the EBS volume
is unable to be mounted on that instance.  You can
safely delete a pod and it will be automatically
rescheduled:
```sh
kubectl delete pod :pod-name
```

