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

If the namespace is `default` and the pod name is an random string then it is a managed service and likely only impacts a specific tenant application.  If the namespace is `kube-system` or the pod name is human readible then it is a platform component which could impact all managed services.

#### Fixing non-running pods
Login to a kubernetes master and describe the pod:
```bash
/var/vcap/packages/kubernetes/bin/kubectl --namespace :namespace describe pod :pod-name
```

The `Events` section should indicate why the pod cannot be started.  Resolve the underlying issue and the pod should transition into a `Running` state.  If you need to force the pod to be restarted you can delete it which will cause kubernetes to immediately recreate it.
```bash
/var/vcap/packages/kubernetes/bin/kubectl --namespace :namespace delete pod :pod-name
```
