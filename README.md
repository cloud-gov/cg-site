# 18F cloud.gov documentation

This repository contains the site code for [cloud.gov documentation](https://docs.cloud.gov/).

cloud.gov is a Platform as a Service based on the Cloud Foundry project, which provides its own [Cloud Foundry documentation](http://docs.cloudfoundry.org/).

## Contributing

Hugo uses Markdown to build the pages. Add your page to the section you want inside the content folder.

### Running the site locally

1. This project uses [Hugo](https://gohugo.io) to build the site. Once Hugo is installed, run `hugo` to build the site.
1. Run `npm install` to download all the dependencies.
1. Run `npm run start` and browse to [http://localhost:1313](http://localhost:1313).

### Making redirects

If you delete or rename a page, you can make a redirect to avoid breaking links from other sites: [make an alias](https://gohugo.io/extras/aliases/) (use the "YAML frontmatter" style).

### Style development

This site uses a shared cloud.gov style, [cg-style](https://github.com/18F/cg-style). This means any styling code has to be developed in *cg-style*.

1. Download or clone the *cg-style* repository, `git clone git@github.com:18F/cg-style.git`
2. Run the watching build task in the *cg-style* repository: `npm run watch`
3. Run `npm install` in the *cg-docs* repository.
4. Run `npm link` in *cg-docs*.
5. Run the watching build task in *cg-docs* repository: `npm run watch`
6. Edit code in the *cg-style* directory and they will propagate down to *cg-docs*

## Acknowledgment

The theme for the site has been "forked" from the [Hugo documentation](https://gohugo.io/overview/introduction/).
