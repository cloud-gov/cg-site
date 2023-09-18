---
title: Getting started with Decap CMS
permalink: /pages/documentation/getting-started-with-decap-cms/
layout: docs
navigation: pages
sidenav: pages-documentation
---

Pages recently integrated support for Decap CMS, an open source content management system for your Github-based content that provides editors with a friendly UI and workflow.

### Building a new site from template
The Pages templates include pre-configured Decap CMS functionality. To begin utilizing:
1. select the [template]({{site.baseurl}}/pages/documentation/templates/) that you wish to use as your base site
2. navigate to the new GitHub repository that Pages created, and **update** the Decap CMS configuration to point to the current repository

```
    # 11ty: /admin/config.yml
    # Gatsby or Hugo: /static/admin/config.yml

    backend:
      ...
      repo: <your github org>/<your repo>
      ...
```
3. when you are done, your configuration should look something like the one in [configuration requirements](#configuration-requirements)

4. once your site is rebuilt in Pages, Decap CMS is ready to use! Navigate to `https://<your site url>/admin` and edit away.

### Adding Decap CMS to existing site
If your site is already up and running, please follow the instructions on [Decap's Add To Your Site](https://decapcms.org/docs/add-to-your-site/) page to add Decap CMS. Please pay particular attention to the location of the admin folder depending on your static site generator.

- 11ty: `/admin/config.yml`
- Gatsby or Hugo: `/static/admin/config.yml`

For examples of existing configurations, see the Pages starter:
- [Pages USWDS 11ty](https://github.com/cloud-gov/pages-uswds-11ty/blob/main/admin/config.yml)
- [Pages USWDS Gatsby](https://github.com/cloud-gov/pages-uswds-gatsby/blob/main/static/admin/config.yml)

### Configuration Requirements
To use Decap CMS, you must authenticate with Github, and in order for Pages to facilitate this, your Decap CMS configuration should include the following:

```

    backend:
      name: github
      repo: <your org>/<your repo>
      base_url: https://pages.cloud.gov
      auth_endpoint: external/auth/github
      preview_context: pages/build
      branch: main


      # optional
      use_graphql: true
    ...
```

See [Decap CMS Backends Overview](https://decapcms.org/docs/backends-overview/) for a full description of the configuration options.

### Authentication Requirements
Because Pages facilitates the authentication with Github, we require users of Decap CMS to be Pages users in addition to having `write` permissions to the Github repository.

### Getting familiar with Decap CMS
To learn more about Decap CMS and how it may help you manage content changes on your Pages site, please visit [decapcms.org](https://www.decapcms.org/)
