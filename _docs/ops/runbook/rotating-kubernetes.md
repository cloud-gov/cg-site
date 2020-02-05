---
parent: runbook
layout: ops

layout: docs
sidenav: true
title: Rotating Secrets VI - Kubernetes
---

## Introduction

cloud.gov uses Kubernetes to provided managed services, including elasticsearch
and redis. The Kubernetes bosh deployment and service broker are deployed from
https://github.com/18F/cg-deploy-kubernetes.

When rotating Kubernetes, you must open a scheduled maintenance window. Use the
**Maint - GovCloud - Experimental services disruption** _Scheduled Maintenance_
template. Schedule the window to last at least three hours in order to complete
all the steps below when rotating secrets in Kubernetes.

Lastly, get familiar with the [Troubleshooting Kubernetes]({{ site.baseurl }}{% link _docs/ops/runbook/troubleshooting-kubernetes.md %}) runbook in case
anything goes wrong during the deployment.

## Rotating certificates

Please see the documentation for [_Rotating certificates_]({{ site.baseurl }}{% link _docs/ops/runbook/rotating-secrets.md %}#rotating-certificates).

Generate all certificates using https://github.com/18F/cg-deploy-kubernetes/blob/master/generate-consul-certs.sh.
Generate kubernetes certificates using the master bosh CA certificate and the IP SANs in https://github.com/18F/kubernetes-release/blob/master/generate-certificates.sh. Note: we should automate this step next time we rotate secrets.

## Recreating Kubernetes secrets and daemonset-managed pods

Rotating Kubernetes certificates breaks the automatically generated
[secrets](https://kubernetes.io/docs/concepts/configuration/secret/). To fix,
destroy the default secret in the `default` and `kube-system` namespaces, then
destroy the daemonset-managed pods that use those secrets. Note: both the
secrets and the pods will be recreated automatically by Kubernetes.

```sh
kubectl delete secret $(kubectl get secrets | grep "default-token" | awk '{print $1}')
for pod in $(kubectl get pod | grep "kube2iam" | awk '{print $1}'); do kubectl delete pod ${pod}; done

kubectl --namespace kube-system delete secret $(kubectl --namespace kube-system get secrets | grep "default-token" | awk '{print $1}')
for pod in $(kubectl --namespace kube-system get pod | grep "fluentd-cloudwatch" | awk '{print $1}'); do kubectl --namespace kube-system delete pod ${pod}; done
```

## Recreating Kubernetes DNS pods

Rotating Consul certificates breaks the communication between the Consul proxy
jobs on the Kubernetes `master` and `minion` VMs and the internal Kubernetes DNS
pods. Fix Kubernetes DNS resolution with the following command. Connect to a
`master` or `minion` VM to run the command.

```sh
kubectl get pods --namespace kube-system | grep kube-dns | awk '{ print $1 }' | xargs kubectl delete pods --namespace kube-system
```

## Restarting the proxy job in the BOSH VMs

Restart the proxy job in the `master` and `minion` Kubernetes BOSH deployment
with the following commands. Connect to the appropriate BOSH Director with [the
shared `cg-script` Jumpbox script](https://github.com/18F/cg-scripts/blob/master/jumpbox).

```sh
bosh ssh -d kubernetes master -c "sudo /var/vcap/bosh/bin/monit restart proxy"
bosh ssh -d kubernetes minion -c "sudo /var/vcap/bosh/bin/monit restart proxy"
```

When restarting all of these proxies at once, make sure that the proxy starts up
and reports healthy with Monit before closing the maintenance window. SSH into
each `master` and `minion` in order to verify that the service has restarted
properly.

Things to look for include:

- Is `monit summary` reporting healthy for the process?
- Are there multiple PIDs for the process?
- Do the proxy logs include errors about multiple listeners or problems binding to a port?

Once the deployment is in a healthy state, you may close the maintenance window.
