# 18F CF Docs [![wercker status](https://app.wercker.com/status/b53005d7e69162205a5c9b63f3d65029/s/master "wercker status")](https://app.wercker.com/project/bykey/b53005d7e69162205a5c9b63f3d65029)

This repository contains the site code for the 18f Cloud Foundry documentation site.

## Contributing

Hugo uses markdown to build the pages. Just add your page to the section you want inside the content folder.

### Running the site locally

This project uses [Hugo](https://gohugo.io) to build the site. Once hugo is installed, run `hugo server -w` and browse to [http://localhost:1313](http://localhost:1313).

### Style development

This site uses a shared cloud.gov style, [cg-style](https://github.com/18F/cg-style). This means any styling code has to be developed in *cg-style*.

1. Download or clone the *cg-style* repository, `git clone git@github.com:18F/cg-style.git`
2. Run the watching build task in the *cg-style* repository: `npm run watch`
3. Run `npm install` in the *cg-docs* repository.
4. Run `npm link` in *cg-docs*.
5. Run the watching build task in *cg-docs* repository: `npm run watch`
6. Edit code in the *cg-style* directory and they will propagate down to *cg-docs*

## Acknowledgement

The theme for the site has been "forked" from the [Hugo documentation site](https://gohugo.io/overview/introduction/).
