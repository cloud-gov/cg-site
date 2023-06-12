---
layout: post
title: "Configuring Dependabot"
date: May 22, 2023
excerpt: Configure Dependabot to assist with managing pull requests
---

## GitHub Dependabot defined

Dependabot is a feature of GitHub whose main purpose is to assist developers stay on top of their dependency ecosystem by automating the dependency update process which in turn proactively addresses any potential security concerns. Dependabot also explicitly raises pull requests to address security vulnerabilities in dependencies and alerts developers to the precise location in the code where the vulnerabilities lay. When enabled it achieves this by scanning a projects dependency files such as package manifests (ie. package-json, Gemfile) or configuration files to identify dependencies and their versions. It then compares the current versons against the latest versions in the relevant package registries. As a developer woking on a site hosted on Pages you may have seen a host of these types of alerts/pull requests in your given repository. This article will explin on how to effectively manage these alerts without comprosing your code's security. 

There are 3 distinct functions of Dependabot.  

* __Dependabot alerts__: Alerts regarding dependency vulnerabilities where pull requests are automatically opened.

* __Dependabot security updates__: Additional alerts/information regarding vulnerabilities in any out of date dependencies where a vulnerability alert “faux” non mergeable pull request is opened in relation to the initial out of date dependency alert. If applicable it is linked to the actual dependency pull request.  

* __Dependabot version updates__: Automatic pull requests opened when version bumps are available for dependencies.   

\* For Pages users with existing jekyll sites Dependabot alerts was automatically enabled upon launch. This is not the case for users who have 11ty or Gatsby based sites where by default all Dependabot services are disabled upon launch.

## Where to locate and turn on dependabot  

To enable any of the Dependabot features navigate to the rightmost tab “settings” in the GitHub repository. On the left hand panel under security select “Code security and analysis”. Here you can enable either of the three previously discussed settings. You can enable Dependabot alerts and Dependabot version updates singularly as they are mutually exclusive of the feature. Enabling Dependabot security updates will also enable Dependabot alerts as it is reliant on alerts to function. 

## Where to locate and configure the dependabot.yml file

The best way to take advantage of Dependabot while not getting overwhelmed by the amount of pull requests opened is to override the default behavior by customizing the dependabot.yml file which is located in the .github folder of the repository. You can either create it manually or have it automatically generated when enabling Dependabot version updates.

There are certain configuration options which can be set in your dependabot.yml file which will help reduce noise and cut down the amount of open pull requests in your repository. The options that we will focus on specifically are as follows:

<p>
  
 **interval**: Determine the frequency that Dependabot will check for new versions for each defined package manager.
  <br>
  
**open-pull-requests-limit**: Modify the max limit of pull requests opened for version updates.
  <br>
  
* `ignore`: Explicitly ignore specific dependencies, versions and update-types.
  <br>
  
* `target-branch`: Specify a different branch for manifest files and for pull requests instead of the default branch.
</p>

For a complete list of configuration options and implementations, visit the GitHub site via [Configuration options for the dependabot.yml file](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file#about-the-dependabotyml-file).

This example `dependabot.yml` file is for any Jekyll site running on Pages. In this case there are two defined package ecosystems which are npm and bundler, both located in the root directory. Specifically for the npm package we’ve set the conditions for Dependabot to check for dependency updates once a week, on Monday, while specifying the time and timezone. By default, Dependabot is set to the UTC timezone. We’ve added and set the condition `open-pull-requests-limit` to the value 2 so no matter how many updates there are, Dependabot will only open 2 pull requests a week maximum which will drastically cut down on noise. By default, Dependabot opens a maximum of five pull requests for version updates. We have also set an `ignore` condition for the dependency `minimatch` which will ignore all updates through version 3, effectively pinning it at its current version for the time being. For the bundler package manager we have kept the same conditions as with npm except we have set the frequency interval to monthly which by default will be the first Monday of the month. Although this is in the same yaml file, conditions set for each package-ecosystem are independent of each other. We have also specified a bundler dependency version to ignore.

```
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
        internval: "weekly"
        day: "monday"
        time: "07:57"
        timezone: "America/New_York"
    open-pull-requests-limit: 2
    ignore:
        -dependency-name: "minimatch"
        versions: ["^3.x"]

- package-ecosystem: "bundler"
  directory: "/"
  schedule:
    interval: "monthly"
    time: "07:57"
    timezone: "America/New_York"
open-pull-requests-limit: 2
ignore:
    -dependency-name: "nokogiri"
    versions: "~1.13.5"       
```
        
In this example an 11ty site is used and we have specfified our npm package manager once again. We have set dependabot to check for version updates daily by specifying "daily" as the interval. We have set the branch that dependabot will run checks against as our `staging` branch by utilizing the "target-branch" option. By default, Dependabot will check for manifest files on the production  branch and raise pull requests for version updates against it. You can override this behavior by explicitly setting the `target-branch` condition to another branch and have pull requests opened against it instead of your main branch which is what we have done here. It may be easier for Pages users to run more frequent version checks against a staging type branch as opposed to the main branch to make pull requests and alerts more manageable. We have also set Dependabot to ignore all version updates for 3.0 on the dependency `rimraf` with a pull request limit of 2.

```
version: 2
updates:
    -package-ecosystem: "npm"
    directory: "/"
    schedule:
        interval: "daily"
        timezone: "America/New_York"
        time: "10:30"
    target-branch: "staging"
    ignore:
        - dependency-name: "rimraf"
          versions: ["^3.x"]
    open-pull-requests-limit: 2
```
***Please note that the dependencies used in this article were for example use only. We do not advocate for the explicit neglect of specific dependencies. It is up to each developers best judgement on how to best address version updates.***

