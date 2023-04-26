
# cloud.gov

This site uses the [cloud.gov Pages USWDS Jekyll template](https://github.com/cloud-gov/pages-uswds-jekyll). [cloud.gov Pages](https://cloud.gov/pages/) runs on cloud.gov and supports the development of this template. By leveraging this template cloud.gov get the benefits  of a maintained template as well as a way to test out new functionality in the template.

This [Jekyll theme](https://jekyllrb.com/docs/themes/) uses the [U.S. Web Design System v 2.0](https://v2.designsystem.digital.gov) and provides developers a starter kit and reference implementation for cloud.gov Pages websites.

This code uses the [Jekyll](https://jekyllrb.com) site engine and built with Ruby. If you prefer to use Javascript, check out [pages-uswds-gatsby](https://github.com/cloud-gov/pages-uswds-gatsby), which uses [Gatsby](https://gatsbyjs.org) site engine.

This site uses a customized [U.S. Web Design System](https://v2.designsystem.digital.gov) theme and strives to be compliant with requirements set by [21st Century IDEA Act](https://designsystem.digital.gov/website-standards/). The standards require that a website or digital service:

- is accessible to individuals with disabilities;
- has a consistent appearance;
- does not duplicate any legacy websites (the legislation also requires agencies to ensure that legacy websites are regularly reviewed, removed, and consolidated);
- has a search function;
- uses an industry standard secure connection;
- is designed around user needs with data-driven analysis influencing management and development decisions, using qualitative and quantitative data to determine user goals, needs, and behaviors, and continually test the website, web-based form, web-based application, or digital service to ensure that user needs are addressed;
- allows for user customization; and
- is mobile-friendly.

## Key Functionality
This repository contains the following examples and functionality:

✅  Publish blog posts, press releases, announcements, etc. To modify this code, check out `blog/index.html`, which manages how the posts are listed. You should then check out `_layouts/post.html` to see how individual posts are structured.

✅ Publish single one-off pages. Instead of creating lots of folders throughout the root directory, you should put single pages in `_pages` folder and change the `permalink` at the top of each page. Use sub-folders only when you really need to.

✅  Publish data (for example: job listings, links, references), you can use the template `_layouts/data.html`. Just create a file in you `_pages` folder with the following options:

```
---
title: Collections Page
layout: data
permalink: /collections
datafile: collections
---
```

The reference to `datafile` referers to the name of the file in `_data/collections.yml` and loops through the values. Feel free to modify this as needed.

✅  There are two different kinds of `pages`, one does not have a side bar navigation, and the other uses `_includes/sidenav.html`. You can enable this option by adding `sidenav: true` to your page front matter.

```
---
title: Document with Sidenav
layout: page
sidenav: true
permalink: /document-with-sidenav
---
```

✅ Enable search with [Search.gov](https://search.gov) by adding option to `_config.yml`.

```
---
searchgov:
  endpoint: https://search.gov  # You should not change this.
  affiliate: pages-uswds-example # replace this with your search.gov account
  access_key: your-access-key # This is placeholder. Not private.
  inline: true #this renders the results on the same domain. Otherwise, it will render the results in the search.gov domain
---
```

## How to edit cloud.gov content
- Non-developers should focus on editing markdown content in the `_posts`, `_docs`, and `_pages` folder. Generally most of the cloud.gov content will be in the _docs file.

- Pricing updates can go directly into `_data/pricing.yml` file and if any of the aws services need to be updated that can occur in the `_data/services.yml` file.

- We try to keep configuration options to a minimum so you can easily change functionality. You should review `_config.yml` to see the options that are available to you. There are a few values on top that you **need** to change. They refer to the agency name and contact information. The rest of `_config.yml` has a range of more advanced options.

- If you look at `package.json` you will see that the `npm run pages` command that will run when running on the cloud.gov Pages platform.

- Do not edit files in the `_site/` folder. These files are auto-generated, and any change you make in the folder will be overwritten.

- To edit the look and feel of the site, you need to edit files in `_includes/` folder, which render key components, like the menu, side navigation, and logos.

- Some pages are styled to be `.html` rather than markdown you can find these in the `_layouts` folder.
    - The `homepage` can be editted more directly by manipulating the `.html` in `home.html`
    - The `pricing` page is mostly edited with the `pricing.html`
    - The `getting-started` page is in the `_pages/sign-up.md` folder.

- `_layouts/` may require the least amount of editing of all the files since they are primarily responsible for printing the content.

- `search/index.html` is used by search.gov.

- If you make major changes to content, let the [#search](https://gsa-tts.slack.com/archives/C33CZQG2D) team know and they can reindex the site. More information on the search.gov account here: https://search.usa.gov/sites/6217

## Updating content on your own computer

```shell
    git clone https://github.com/cloud-gov/cg-site
    cd cg-site
```

Note that when built by cloud.gov Pages, `npm run pages` is used instead of the
`build` script.

### Install dependencies and run app

```shell
    nvm use
    npm install
    bundle install
    npm start
```

Open your web browser to [localhost:3000](http://localhost:3000/) to view your
site.

### Testing

```shell
    npm test
```

### Link checking

This project uses [`lychee`](https://github.com/lycheeverse/lychee) and the accompanying [GitHub action](https://github.com/lycheeverse/lychee-action) to verify that all the links in this documentation are valid.

Default configuration for `lychee` can be found in [`lychee.toml`](./lychee.toml).

Default URL patterns that are ignored by `lychee` can be found in [`.lycheeignore`](./.lycheeignore).

#### Running locally

First, install `lychee`:

```shell
brew install lychee
```

To run `lychee` locally, use the `link-checker` npm script:

```shell
# can use any globbing pattern or filepath
GITHUB_TOKEN=<your-github-token> npm run link-checker -- ./_site/**/*.html
```

You can also use multiple patterns/filepaths:

```shell
GITHUB_TOKEN=<your-github-token> npm run link-checker -- ./*.md ./_site/**/*.html
```

Including a `GITHUB_TOKEN` environment variable will reduce the number of 429 responses returned by GitHub, since
by default GitHub throttles requests without a token.

When you run this script, results from the `lychee` link scan will be generated in `lychee-out.md` so that you can
review and address any errors.

## Technologies you should be familiarize yourself with

- [Jekyll](https://jekyllrb.com/docs/) - The primary site engine that builds your code and content.
- [Front Matter](https://jekyllrb.com/docs/frontmatter) - The top of each page/post includes keywords within `--` tags. This is meta data that helps Jekyll build the site, but you can also use it to pass custom variables.
- [U.S. Web Design System v 2.0](https://v2.designsystem.digital.gov)

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md) for additional information.

## Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright
> and related rights in the work worldwide are waived through the [CC0 1.0
> Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication.
> By submitting a pull request, you are agreeing to comply with this waiver of
> copyright interest.

See [CONTRIBUTING](CONTRIBUTING.md) for additional information.
