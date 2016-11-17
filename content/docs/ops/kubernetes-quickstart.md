---
menu:
  docs:
    parent: deployment
title: Kubernetes quickstart
---

#### Set Path
export PATH=$PATH:/var/vcap/packages/kubernetes/bin

#### Get a list of pods
kubectl get pods

#### Get a list of deployments
kubectl get deployments

#### Get a list of replica sets
kubectl get rs

#### Get a list of services / ports and ips
kubectl get svc

#### Review pod logs
kubectl logs x0e41a06287f54-master-1362982585-aamfj

#### Show pod status
kubectl describe pod x0e41a06287f54-master-1362982585-aamfj

#### Stop entire Kubernetes deployment
bosh stop kubernetes

#### NodePorts
Currently services are deployed via NodePort, which means that Kubernetes generates a temporary random port, and assigns that port to each Master node.  This port will redirect to the containers exposed service port, for example 9200

  - Node Port 31000
  - Service Port 9200

  ## Both of these return the same host via iptables:
  ```
  curl http://0.master.default.kubernetes.bosh
  curl http://1.master.default.kubernetes.bosh
  ```
