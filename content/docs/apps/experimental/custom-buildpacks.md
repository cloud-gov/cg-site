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

For example, if you want to use the ["R" buildpack](https://github.com/alexkago/cf-buildpack-r), you can push your code by typing:

`cf push myapp -b https://github.com/alexkago/cf-buildpack-r`

Once you push your code using a custom buildpack, cloud.gov cannot update it for you. You are responsible for keeping it up to date. Please see [this description of responsibilities]({{< relref "overview/technology/responsibilities.md">}}).

## Example custom buildpacks

### apt-buildpack

cloud.gov does not allow the use of `sudo` inside of buildpacks. If your app depends on a library that is `apt-get` installable, you can use the CF flavor of [`apt-buildpack`](https://github.com/pivotal-cf-experimental/apt-buildpack), which is a custom buildpack. This can work with `cf-buildpack-multi`.

You can see this in the wild in 18F's [`iaa-pdf-api`](https://github.com/18f/iaa-pdf-api) repo, which depends on the [`pdftk`](https://www.pdflabs.com/tools/pdftk-server/) library.
