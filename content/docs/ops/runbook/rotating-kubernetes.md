---
menu:
  docs:
    parent: runbook
layout: ops

title: Rotating Secrets VI - Kubernetes
---

## Introduction

Cloud.gov uses kubernetes to provided managed services, including elasticsearch and redis. The kubernetes bosh deployment and service broker are deployed from https://github.com/18F/cg-deploy-kubernetes.

## Rotating certificates

Generate new certificates for consul and Kubernetes using the master bosh
certificate authority. Certificates for both consul and Kubernetes should be
rotated in three steps, as described in https://docs.cloudfoundry.org/deploying/common/consul-security.html#rotating-certs:

* Append new CA certificate
* Replace old certificates and keys
* Drop old CA certificate

Generate consul certificates using https://github.com/18F/cg-deploy-kubernetes/blob/master/generate-consul-certs.sh.
Generate Kubernetes certificates using the master bosh CA certificate and the IP
SANs in https://github.com/18F/kubernetes-release/blob/master/generate-certificates.sh.

> Note: we should automate this step next time we rotate secrets.

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
