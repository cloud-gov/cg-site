---
menu:
  docs:
    parent: experimental

aliases:
    - /apps/multi-buildpack-deploys/
    - /apps/apt-get/

title: Custom buildpacks
---

[**This is an experimental feature.**]({{< relref "docs/apps/experimental/experimental.md" >}}) In this case, this means: we offer long-term support for the *ability* to have custom buildpacks, but you are responsible for maintaining your custom buildpack.

Cloud Foundry (the underlying open source project behind cloud.gov) uses [buildpacks]({{< relref "docs/getting-started/concepts.md">}}#buildpacks) to allow your applications to be deployed.

cloud.gov [officially supports]({{< relref "overview/pricing/rates.md">}}#what-s-included) a set of buildpacks, and it also allows you to provide your own.

For example, if you want to use [this "R" buildpack](https://github.com/virtualstaticvoid/heroku-buildpack-r/tree/heroku-16), you can push your code by typing:

`cf push myapp -b http://github.com/virtualstaticvoid/heroku-buildpack-r.git#heroku-16`

Once you push your code using a custom buildpack, cloud.gov cannot update it for you. You are responsible for keeping it up to date. Please see [this description of responsibilities]({{< relref "overview/technology/responsibilities.md">}}).

## Example custom buildpacks

### apt-buildpack

cloud.gov does not allow the use of `sudo` inside of buildpacks. If your app depends on a library that is `apt-get` installable, you can use the CF flavor of [`apt-buildpack`](https://github.com/cloudfoundry/apt-buildpack), which is a custom buildpack.

## Experimental multi-buildpack support

If your application involves multiple languages, and it's not practical to split it into smaller applications (or the other options [under "Multiple languages" here]({{< relref "docs/getting-started/concepts.md#buildpacks">}})), Cloud Foundry offers experimental support for [using multiple buildpacks](https://docs.cloudfoundry.org/buildpacks/use-multiple-buildpacks.html) for an application.
