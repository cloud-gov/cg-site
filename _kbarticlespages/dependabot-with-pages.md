---
layout: post
title: "Configuring Dependabot"
date: May 18, 2023
excerpt: Configure Dependabot to assist with managing PRs
---

## Dependabot defined
There are 3 distinct functions of Dependabot.  

* __Dependabot alerts__: Alerts regarding dependency vulnerabilities where PRs are automatically opened.

* __Dependabot security updates__: Additional alerts/information regarding vulnerabilities in any out of date dependencies where a vulnerability alert “faux” non mergeable PR is opened in relation to the initial out of date dependency alert. If applicable it is linked to the actual dependency PR.  

* __Dependabot version updates__: Automatic PRs opened when version bumps are available for dependencies.   

\* For Pages users with existing jekyll sites Dependabot alerts was automatically enabled upon launch. This is not the case for users who have 11ty or Gatsby based sites where by default all Dependabot services are disabled upon launch.

## Where to locate and turn on dependabot  

To enable any of the Dependabot features navigate to the rightmost tab “settings” in the repository. On the left hand panel under security select “Code security and analysis”. Here you can enable either of the three previously discussed settings. You can enable Dependabot alerts and Dependabot version updates singularly as they are mutually exclusive of the feature. Enabling Dependabot security updates will also enable Dependabot alerts as it is reliant on alerts to function. 

## Where to locate and configure the dependabot.yml file

The best way to take advantage of Dependabot while not getting overwhelmed by the amount of PRs opened is to override the default behavior by customizing the dependabot.yml file which is located in the .github folder of the repository. You can either create it manually or have it be automatically generated when enabling Dependabot version updates.

There are certain conditions which can be set in your dependabot.yml file which will help reduce noise and cut down the amount of open PRs in your repository. The conditions that we will focus on specifically are as follows:

<p>interval
  <br>
open-pull-requests-limit
  <br>
ignore
  <br>
target-branch</p>

This example dependabot.yml file is for any Jekyll site running on Pages. In this case there are two defined package ecosystems which are npm and bundler. Specifically for the npm package we’ve set the conditions for Dependabot to check for dependency updates once a week, on monday, while specifying the time and timezone. By default Dependabot is set to the UTC timezone. We’ve added and set the condition “open-pull-requests-limit” to the value 2 so no matter how many updates there are Dependabot will only open 2 PRs a week maximum which will drastically cut down on noise. We have also set an “ignore” condition for the dependency minimatch which will ignore all updates through version 3, effectively pinning it at its current version for the time being. For the second defined package ecosystem bundler we have set similar conditions but have specified a monthly check for updates. 

<img src="{{ site.baseurl }}/assets/images/pages/dependabot-yml.png"/>


By default Dependabot will check for manifest files on the production  branch and raise pull requests for version updates against it. You can override this behavior by explicitly setting the “target-branch” condition to another branch and have PRs opened against it instead of your main branch. In this example for an 11ty site we have pointed it to our staging branch.

<img src="{{ site.baseurl }}/assets/images/pages/dependabot-target-branch.png"/>


