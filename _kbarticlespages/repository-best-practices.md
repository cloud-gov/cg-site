---
layout: post
title: "GitHub Repository Best Practices"
date: April 23, 2024
excerpt: Pages guide for maintaining GitHub hosted repositories
---

Adhering to a set of best practices when it comes to managing GitHub repositories can greatly ease the maintenance burden and drastically improve the developer experience for websites hosted on cloud.gov Pages. This document should serve as a constructive conversation piece for agencies and not as an audit mechanism. But by utilizing certain code scanning tools, agencies may find it easier to identify and cover certain security controls within their respective Customer Responsibility Matrix (CRM). Here is a useful guide for you to get started with implementing some best practices regarding user permissions and security for your GitHub hosted repositories.

## Public vs Private repositories

A repository does *not need* to be public in order for Pages to be able to build the website and there are no added website security benefits for private repositories; both public and private repositories are acceptable on Pages due to all branches, both public and private, being published publicly when built. When it comes to deciding whether to make your GitHub repository public or private you may consider the following items.

### Public


#### Pros
  - Easy for Pages engineers to access the codebase and provide support/debug
  - Transparency/High visibility
  - Able to utilize CodeQL free of charge
  - Seamless OpenSSF Allstar integration
  - Collaboration with outside contributors
  - Compliance with open source and transparency initiatives per agency/program 

#### Cons
  - Sensitive information inadvertently hardcoded is immediately visible 

### Private


#### Pros
  - Test/Make changes to a website without exposing commits to the public
  - Safeguard sensitive data such as API keys, access tokens or other credentials by [using environment variables](https://cloud.gov/pages/documentation/env-vars-on-pages-builds/) in the build runtime.
  *Websites on Pages are all published publicly, user's configuration settings and static site build engine factor into what is included in the site build output.*

#### Cons
  - Not able to utilize CodeQL for free
  - Potentially out of compliance with agency/program transparency initiatives

### Repository User Permissions

It is important to designate admin/owner access of the repository to one or more individuals who are either the persistent site owners or else federal employees with the “manager” role within the Pages organization. It is strongly recommended to not grant admin/owner privileges of the repository to any contractors or other temporary employees. This is because in certain instances where actions will need to be taken by either Pages engineers or by customers that require an active user with admin access to a website's repository. Additionally, when adding contributors or collaborators to a private repository it should mirror the member count that your organization has within Pages. Please note that removing an organization member from an organization within Pages will **not** automatically remove them from the repository within GitHub. They will still retain whatever read/write access they have in GitHub until explicitly removed.


### GitHub Repository Security

#### Dependabot

Dependabot is a useful and highly configurable automated dependency management tool which assists developers with keeping third-party dependencies up-to-date with their latest version. This can benefit smaller developer teams by reducing maintenance overhead. Dependabot scans the repository for outdated dependencies and generates pull requests against whatever branch it is enabled on to update them. Check out our [knowledge base article on Dependabot](https://cloud.gov/pages/knowledge-base/dependabot-with-pages/#configuring-dependabot) to learn how to enable and configure it for your repository.

#### Branch Protection

[Branch protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) is a security feature within GitHub that limits users with write and push access the ability to push directly to any branch where branch protections are enabled. This includes but is not limited to requiring a pull request to merge code, setting the number of pull request reviews required, requiring status checks, dismissing approvals and other configuration options. With good branch protection settings you can protect your repository from an attack by a malicious actor with the stolen credentials from a single maintainer of that repository. 

#### OpenSSF Allstar

[Allstar](https://github.com/ossf/allstar?tab=readme-ov-file#disabling-unwanted-issues-1) is an open source security tool which monitors organizations and repositories within GitHub for adherence to security best practices and improves the security posture for those organizations. It achieves this by continuously scanning repositories for any breach of enabled [security policies](https://github.com/ossf/allstar?tab=readme-ov-file#policies) and then raising an alert for any security remediation findings. This alert can be in the form of a GitHub issue or another type of configured action. In some instances Allstar can automatically resolve the issue on the admin/owner's behalf. 

### Additional Advanced Feature Settings for GitHub Repository Security

#### CodeQL

[CodeQL](https://docs.github.com/en/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning), a GitHub open source security application, is a code analysis tool that automatically finds security vulnerabilities and other software bugs in codebases. Although primarily used for security analysis it can also be used for general code quality analysis as well. It is important to again note that CodeQL is only free to use on public repositories and GitHub Advanced Security must be purchased/enabled in order to utilize the tool on private repositories. 

#### Signed Commits

In conjunction with good user permissions practices and as an added layer of security you can ensure that only commits by members of your Pages organization are made to the repository by having them signed and then verified by GitHub. This increases the authenticity and integrity of your repositories' commit history, especially for those repositories which are public facing. There are various methods when it comes to implementing [commit signing](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification) so be sure to review them in full detail.