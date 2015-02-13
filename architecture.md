## Architecture

General architecture: http://docs.cloudfoundry.org/concepts/architecture/.

![CF Architecture](http://docs.cloudfoundry.org/concepts/images/cf_architecture_block.png)

## Our current install includes:

- ELB (load balancing)
- [Router (Go app)](https://github.com/cloudfoundry/gorouter)
- [UAA (Oauth Spring app)](https://github.com/cloudfoundry/uaa)
- UAA DB (RDS)
- [Login (Spring app)](https://github.com/cloudfoundry/login-server)
- [Cloud Controller (Ruby app)](https://github.com/cloudfoundry/cloud_controller_ng)
- Cloud Controller DB (RDS)
- [Health Manager (Go app)](https://github.com/cloudfoundry/hm9000)
- [DEA - App Execution (Ruby and Go)](https://github.com/cloudfoundry/dea_ng)
- [Warden - Containers (Ruby)](https://github.com/cloudfoundry/warden)
- Blob Store (S3)
- [Message Bus - NATS (Go app)](https://github.com/cloudfoundry-attic/nats)
- [Loggregator (Go app)](https://github.com/cloudfoundry/loggregator)
- [Etcd (Go)](https://github.com/coreos/etcd)

## Buildpacks:

- [Python](https://github.com/cloudfoundry/python-buildpack)
- [Ruby](https://github.com/cloudfoundry/ruby-buildpack)
- [Go](https://github.com/cloudfoundry/go-buildpack)
- [Java](https://github.com/cloudfoundry/java-buildpack)
- [Nodejs](https://github.com/cloudfoundry/nodejs-buildpack)
- [PHP](https://github.com/cloudfoundry/php-buildpack)

## Tools:

- [CF CLI (Go)](https://github.com/cloudfoundry/cli)
- [Bosh - Deploys CF (Ruby)](https://github.com/cloudfoundry/bosh)
