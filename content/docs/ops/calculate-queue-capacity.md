---
menu:
  docs:
    parent: operations
title: Calculate Queue Capacity
---

Let's outline below how to calculate our `queue` in our ELK stack. You have to
be [logged into a staging jumpbox]({{< relref "troubleshooting-bosh.md" >}}) in
order to get the information to perform the calculation. We calculate the
numbers on staging as in order to ensure that we don't affect production logs or
production deployments of Cloud Foundry. You will be turning off all the
`parsers` in order to allow the `queue` to fill up gradually so you can
calculate logs capacity.

## Preparing the queue

In order to fill up the queue, we'll need to pause the parser VMs that are
running. Once inside the jumpbox, target the logsearch deployment when checking
the vms.

```sh
$ bosh vms logsearch
# ... output shortened for brevity
Acting as user 'admin' on deployment 'logsearch' on 'bosh'

+----------------------+---------+-----+-----------+-------------+
| VM                   | State   | AZ  | VM Type   | IPs         |
+----------------------+---------+-----+-----------+-------------+
|                      | running | n/a |           |             |
| parser/0 (yyy)       | running | n/a | parser    | 192.168.x.x |
| parser/1 (xxx)       | running | n/a | parser    | 192.168.x.x |
|                      | running | n/a |           |             |
+----------------------+---------+-----+-----------+-------------+
```

Once you have the name of the VMs you can run the following commands to turn off
the parsers. Please turn them back on after the calculations.

You will first need to ssh into each parser VM you find. Let's log into the
first one from the list above using the new bosh-cli v2.

```sh
bosh-cli -e env -d logsearch ssh parser/0
```
Once that's done, make sure you're running in a sudo shell.
```sh
sudo -i
```

Afterwards, you can get a `monit` summary to make sure the parser is running on
the virtual machine.

```sh
monit summary
```
Finally, stop the parser job.

```sh
monit stop parser
```

Repeat these steps to turn off the parser and move on to the next VMs from the
`bosh vms` output.

## Calculating the used memory per log in bytes

Once the `parser` VMs are stopped, you will be able to interact with the `queue`
to calculate the used memory per log in bytes. First log into the `queue` VM.

```sh
$ bosh vms logsearch
# ... output shortened for brevity
Acting as user 'admin' on deployment 'logsearch' on 'bosh'

+----------------------+---------+-----+-----------+-------------+
| VM                   | State   | AZ  | VM Type   | IPs         |
+----------------------+---------+-----+-----------+-------------+
|                      | running | n/a |           |             |
| queue/0 (yyy)        | running | n/a | queue     | 192.168.x.x |
|                      | running | n/a |           |             |
+----------------------+---------+-----+-----------+-------------+
```

The first step is to determine a rough estimate for the memory per log object in
the queue. We use redis for our ELK-stack queue and so we'll be using the
`redis-cli` to get this information from the queue.

Just reference the packaged redis-cli release on the machine at the following
path.

```sh
export PATH=$PATH:/var/vcap/packages/redis/bin
```

With that settled, run the following command to get a total of the used memory
on the machine along with the number of logs

```sh
$ redis-cli -c info | grep used_memory: && redis-cli -c llen logsearch
used_memory:1024
(integer) 0
```

Let the queue fill up with log messages, this may take a while. Once this is
complete, run the previous command again to get the `used_memory` and `llen`
values.

## Get the average number of logs

```shell
curl localhost:9200/logs-app-*/_search -d '{"query": {"range": {"@timestamp": {"gte": "now-2w"}}}}' | $JQ '.hits.total'
```


Run this from within a jumpbox, preferably staging, with the parser turned off.
This will allow for the queue to


To calculate **memory per log bytes** take the `used_memory` using redis-cli



Figure out how many logs we have in the queueo
