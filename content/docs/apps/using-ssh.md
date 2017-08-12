---
menu:
  docs:
    parent: advanced
title: Using SSH
---

You can use SSH to inspect how your app is operating, transfer files via SCP, or interact directly with your bound services. [More information about one-off tasks.]({{< relref "docs/getting-started/one-off-tasks.md" >}})

You can get a shell via the [`cf
ssh`](https://docs.cloudfoundry.org/devguide/deploy-apps/ssh-apps.html#ssh-command)
command, which lets you securely log in to an application instance where you can
perform debugging, environment inspection, and other tasks.

Your application environment is not completely setup when you log in. You'll probably need
to [configure your session to match your application's
environment](https://docs.cloudfoundry.org/devguide/deploy-apps/ssh-apps.html#ssh-env)
in order to debug your application.

You can interact directly with the services bound to your application via [port-forwarding](https://docs.cloudfoundry.org/devguide/deploy-apps/ssh-services.html). This allows you to access those services using native clients on your local machine. The [Service Connect plugin](https://github.com/18F/cf-service-connect#readme) makes this even easier.

`cf ssh` uses port 2222. If your network blocks port 2222, you may receive an error message such as `Error opening SSH connection`.


## SSH-Related Questions

*Q*: When I SSH to my application and I try to run `python`  I get `ImportError: No module named site`. How should I set that up?

*A*: You'll need to configure your application environment with these commands:

```
for f in /home/vcap/app/.profile.d/*.sh; 
  do source "$f"; 
done
export LD_LIBRARY_PATH=/home/vcap/deps/0/python/lib/
export PYTHONHOME=/home/vcap/deps/0/python
```

*Q*: What version of SSH does cloud.gov use to access application containers?

*A*: The cloud.gov application containers use the SSH-2.0 protocol. The SSH service uses the CloudFoundry SSH implementation, https://github.com/cloudfoundry/diego-ssh. For more on how CloudFoundry implements SSH, refer to https://docs.cloudfoundry.org/concepts/diego/ssh-conceptual.html.


