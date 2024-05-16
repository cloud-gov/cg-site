---
layout: post
date: May 16th 2024
title: "May 16th Cloud.gov Release Notes"
excerpt: The Cloud.gov team is working on providing release notes so everyone can see new features and updates.
---

# Release Notes

## Developer Impacting Changes

The audience for this section is developers who maintain applications on cloud.gov and may need to respond to stack or buildpack changes.

###  Cloud.gov IDP
* Updated TOTP QR Code image generation
* TOTP Seed Length is now 32

### CF-Deployment - v40.3.0 to v40.9.0

Changes below are broken down by component:


#### Go Buildpack v1.10.18

* Add go 1.21.9, remove go 1.21.8 for stack(s) cflinuxfs3, cflinuxfs4 (#441)
* Add go 1.22.2, remove go 1.22.1 for stack(s) cflinuxfs3, cflinuxfs4 (#442)


### Java Buildpack v4.68.0

This release contains dependency updates and an expansion to the detection criteria for the MySQL Driver - the buildpack will now not supply the driver if it finds an existing AWS MySQL driver, with the pattern aws-mysql-jdbc*.jar (thanks to @scottgai, #1068)

### Nginx Buildpack v1.2.13

* Updated github-config (#274)

### NodeJS Buildpack v1.8.24

* Add node 18.20.2, remove node 18.19.0 (#717) for stack(s) cflinuxfs3, cflinuxfs4
* Add node 20.12.2, remove node 20.11.0 (#716) for stack(s) cflinuxfs4, cflinuxfs3
* Add python 3.11.9, remove python 3.11.8 (#712) for stack(s) cflinuxfs4, cflinuxfs3
* Updating github-config (#706)

### PHP Buildpack v4.6.18

* Add php 8.2.18, remove php 8.2.16 for stack(s) cflinuxfs4, cflinuxfs3
* Add php 8.3.6, remove php 8.3.3 for stack(s) cflinuxfs4, cflinuxfs3
* Add httpd 2.4.59, remove httpd 2.4.58 for stack(s) cflinuxfs4, cflinuxfs3

### Python Buildpack v1.8.23

* Add setuptools 69.5.1, remove setuptools 69.2.0 for stack(s) cflinuxfs4, cflinuxfs3
* Add python 3.12.3, remove python 3.12.2 (#904) for stack(s) cflinuxfs3, cflinuxfs4
* Add python 3.11.9, remove python 3.11.8 (#903) for stack(s) cflinuxfs4, cflinuxfs3
* Add python 3.10.14, remove python 3.10.13 (#901) for stack(s) cflinuxfs4, cflinuxfs3
* Add python 3.9.19, remove python 3.9.18 (#900) for stack(s) cflinuxfs3, cflinuxfs4
* Add python 3.8.19, remove python 3.8.18 (#899) for stack(s) cflinuxfs3, cflinuxfs4

### R Buildpack v1.2.11

* Add r 4.3.3, remove r 4.3.2 for stack(s) cflinuxfs3, cflinuxfs4
* Update r 4.2.3 dependencies for stack(s) cflinuxfs3, cflinuxfs4:
* plumber from 1.2.1 to 1.2.2
* shiny from 1.8.0 to 1.8.1.1

### Ruby Buildpack v1.10.13

* Deprecate Ruby 3.0.X (EOL)
* Enable rails 7.1 compatibility for buildpack (#925)
* Add rubygems 3.5.9, remove rubygems 3.5.8 (#932) for stack(s) cflinuxfs4, cflinuxfs3 [#187420578]
* Add rubygems 3.5.8, remove rubygems 3.5.7 (#930)for stack(s) cflinuxfs4, cflinuxfs3
* Add bundler 2.5.9, remove bundler 2.5.8 (#931) for stack(s) cflinuxfs4, cflinuxfs3
* Add bundler 2.5.8, remove bundler 2.5.7 (#929) for stack(s) cflinuxfs4, cflinuxfs3
* Add node 20.12.2, remove node 20.12.1 (#926) for stack(s) cflinuxfs3, cflinuxfs4

### Staticfile Buildpack v1.6.12
* Updating github-config (#415)
