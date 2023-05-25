---
layout: post
title: Upgrading a Jekyll site to Ruby 3.1
date: May 24, 2023
excerpt: "Ruby 2.7 has reached “end of life” so we’re providing instructions on how to upgrade your Jekyll site to use Ruby 3.1. Cloud.gov Pages will continue supporting Ruby 2.7 builds for six months, but then only Ruby 3 versions will be supported."
---

Ruby 2.7 has reached “end of life” so we’re providing instructions on how to upgrade your Jekyll site to use Ruby 3.1. Cloud.gov Pages will continue supporting Ruby 2.7 builds for six months, but then only Ruby 3 versions will be supported. 

The main difficulty with upgrading a site to use a newer version of Ruby is that one or more of your required Gems could break when changing Ruby versions. This is notably the case for `jekyll-assets`. If you don’t have that dependency, this could be a relatively straightforward upgrade. We recently upgraded our own [Jekyll template repo](https://github.com/cloud-gov/pages-uswds-jekyll) which you can check out for reference.

## Instructions for sites without jekyll-assets

If you don’t see `jekyll-assets` in your `Gemfile` or `Gemfile.lock`, you don’t have a dependency on `jekyll-assets` and you might be able to upgrade to Ruby 3.1 with just a few steps:
- Create a file called `.ruby-version` in your site folder which contains the string `3.1`. If you already have this file, you can replace the previous version with `3.1`
- If you have any other site-specific scripts which specify the ruby version, update these as well.
- Delete your previous `Gemfile.lock` and regenerate by running `bundle install`
  - If this command adds a new `PLATFORM` to your `Gemfile.lock`, and it’s anything other than `ruby`, remove it with the following command:
    - `bundle lock --remove-platform example_platform_name`. For example `bundle lock --remove-platform arm64-darwin-21`
- Commit and push all these changes to see if the cloud.gov Pages build succeeds!

## Instructions for sites with jekyll-assets

Jekyll Assets is a helpful gem for compiling SASS, JS, and image files into your final jekyll build. Unfortunately it is unmaintained and hasn’t been updated in three years. It also doesn’t support Ruby 3. So if you remove it, you’ll need alternative ways to make sure your SASS, JS, and image files are included in your site build correctly. 
We’ve documented the migration process in a [PR to our deprecated jekyll template](https://github.com/cloud-gov/pages-uswds-jekyll/pull/314) and included the main steps below.
- Create a file called `.ruby-version`  in your site folder which contains the string `3.1`. If you already have this file, you can replace the previous version with `3.1`
- If you have any other site-specific scripts which specify the ruby version, update these as well.
- Remove `jekyll-assets` from your `Gemfile`. Delete your previous `Gemfile.lock` and regenerate by running `bundle install`
  - If this command adds a new `PLATFORM` to your `Gemfile.lock`, and it’s anything other than `ruby`, remove it with the following command:
    - `bundle lock --remove-platform example_platform_name`. For example `bundle lock --remove-platform arm64-darwin-21`
- [The hard step] Replace the primary functionality of jekyll-assets:
  - First move everything from the `_assets` folder to the `assets` folder
  - Remove any uses of the `{% asset %}` liquid tag or `asset_url` function in your content. This tag and function provided a way to find a given asset in any of multiple specified site folders. You’ll likely want to replace this with `{{site.baseurl}}/assets/example.png` or `{{ /assets/example.png | relative_url }}` where `example.png` is the name of the example file.
  - Move all SASS partials to a new folder called `_sass`. You can leave the entrypoint SASS file (styles.scss) in `assets/css` but you’ll need to add [two sets of triple dashes to the start of the file](https://jekyllrb.com/docs/assets/).
  - Add our two helper jekyll plugins to the `_plugins` folder:
    - [`asset-helper.rb`](https://github.com/cloud-gov/pages-uswds-jekyll/blob/main/_plugins/asset-helper.rb) copies USWDS assets from the `node_modules` folder into your `assets` folder
    - [`autoprefixer.rb`](https://github.com/cloud-gov/pages-uswds-jekyll/blob/main/_plugins/autoprefixer.rb) roughly recreates the functionality of `jekyll-autoprefixer` and adds vendor prefixes to CSS rules
  - You’ll need to update `_config.yml` to reflect passing configuration options to our new plugins instead of `jekyll-assets`. You can see an [example configuration change in our template PR](https://github.com/cloud-gov/pages-uswds-jekyll/pull/314/files#diff-ecec67b0e1d7e17a83587c6d27b6baaaa133f42482b07bd3685c77f34b62d883).
  - Add a new empty file called `.gitkeep` in `assets/uswds` and then add these three lines to `.gitignore` to ignore temporary USWDS assets during the build:
	
  ```
  assets/uswds/*
  !assets/uswds/.gitkeep
  assets/js/uswds*
   ```
  - There are a few css variables you might need to change:
    - [`theme-font-path` and `theme-image-path`](https://github.com/cloud-gov/pages-uswds-jekyll/pull/314/files#diff-9c2164c6dbe14003458901df1f193e2ac22a958d6fef21a16a439cda577945b9L20-L22)
    - [`theme-hero-image`](https://github.com/cloud-gov/pages-uswds-jekyll/pull/314/files#diff-e2364fbc077a3a2cae9a0614a089904cff29c043b49ed1627690eebfa6a88522R99)

  Note that these upgrades will temporarily make your site builds slower (but more secure!). We're working on an alternative build container which uses Ruby 3.1 as its default. Please reach out to us at [pages-support@cloud.gov](mailto:pages-support@cloud.gov) with any questions about this process.


