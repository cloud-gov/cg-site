---
title: External Tools and Resources
permalink: /pages/documentation/external-tools-and-resources/
layout: docs
navigation: pages
sidenav: pages-documentation
---

An outline of external tools and resources customer could leverage outside of the Cloud.gov Pages platform to improve site accessibility, user experience, and security posture.

Cloud.gov Pages sites' source code is managed via [Git](https://git-scm.com/) version control and hosted on [GitHub](https://www.github.com). The combination of these source code management tools allows Cloud.gov Pages customers to leverage open source tools, third-party services, and other resources outside of the Cloud.gov Pages platform to improve their development workflow, user experience, and security posture. This will outline different areas of interest with possible resources for customers to research in-depth based on their current priorities, resources, skill sets, and constraints. This is not an endorsement of any single resource or tool so this outline will change with the landscape and it is only a small sample of possible tools and resources.

## Continuous integration and deployment

Continuous integration and deployment (CI/CD) refers to the use of automated workflows to build, test, and deploy code. Implementing these automated workflows improves consistency in the development process and adds confidence when deploying updates to the system. CI/CD can be leveraged by Cloud.gov Pages customers to automatically run checks against any update to the site source code and protect the production site from errors or security vulnerabilities that could be introduced from an update to the site. The following are some of the CI/CD platforms that could potentially be used in conjunction with your Cloud.gov Pages site:

- [GitHub Actions](https://github.com/features/actions)
- [CircleCI](https://circleci.com/)
- [Jenkins](https://www.jenkins.io/)
- [Concourse CI](https://concourse-ci.org/)
- [Bamboo](https://www.atlassian.com/software/bamboo)

The above is just a small list of CI/CD platforms that a customer could use to automate their development and deployment workflows.

## Branch protections

[Branch protections](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches) in a GitHub repository allow Cloud.gov Pages customers to add additional security measures to make sure the site's production source code is updated through a well defined process and protects it from errors or security vulnerabilities. Customers can define branch protection rules to designate user approval or require passing [status checks](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches#require-status-checks-before-merging) before merging into the production source code's branch. [Status Checks](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches#require-status-checks-before-merging) are the automated workflows run by your CI/CD platform whenever a branch is added or updated. Customers can leverage external tools, resources and services through these automated workflows and protect site source code through the status checks associated with them.

## Automated workflows

The automated workflows in a site's CI/CD system enable Cloud.gov Pages customers to leverage external tools, resources, and services. The following sections will outline some possibilities customers may choose to explore.

### Scanning tools

Source code and live site scanning are required to obtain an Authorization to Operate (ATO) a federal information system like a Cloud.gov Pages site. Being able to incorporate these tools into the CI/CD process will provide the best outcomes for customer sites. The following is a list of possible scanning tools:

#### Static Code Analysis

These tools run before a site update is deployed to production and look at the site's source code to identify vulnerabilities or suggest best practices.

- [CodeQL](https://codeql.github.com/)
- [SonarQube](https://docs.sonarqube.org/latest/)
- [Snyk](https://snyk.io/)
- [Checkmarx](https://checkmarx.com/)

#### Live site scanning

These tools run after a preview or production update is deployed to the site. They check the live site to identify vulnerabilities.

- [OWASP Zap](https://www.zaproxy.org/)
- [Invicti](https://www.invicti.com/)
- [Qualys](https://www.qualys.com/)
- [Checkmarx](https://checkmarx.com/)

### Accessibility

These tools run against the site to make it more accessible and improve the user experience for all. They help Cloud.gov Pages customers improve their [Section 508](https://www.section508.gov/) compliance posture on their sites.

- [Pa11y CI](https://github.com/pa11y/pa11y-ci)
- [Axe](https://www.deque.com/axe/)

These tools do detailed scans of an individual page, and can be run from a web browser extension or bookmarklet:
- [WAVE tools](https://wave.webaim.org/)
- [ANDI](https://www.ssa.gov/accessibility/andi/help/install.html)

### Other

Here are some additional tools customers could add to improve their site.

- [Lychee](https://github.com/lycheeverse/lychee) to identify any links on the site that are no longer valid.
- [ESLint](https://eslint.org/) to identify problems with the javascript syntax.
- [CSpell](https://cspell.org/) to run spell check against the site.
