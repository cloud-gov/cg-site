---
title: Build Scans
permalink: /pages/documentation/build-scans/
layout: docs
navigation: pages
sidenav: pages-documentation
---


Builds Scans are a new experimental feature being offered by Pages.

For select site builds, users can see scan results which check their website for security vulnerabilities, accessibility violations, and other relevant information to help improve their site. These scans begin running after a build completes. When the scan finishes, the results are available as downloadable HTML files for easy sharing among team members. There are currently two scans available: ZAP Security Scan and Accessibility Scan.

## ZAP Security Scan

The ZAP Security Scan tests your published website for common security vulnerabilities. It uses the [Zed Attack Proxy (ZAP)](https://www.zaproxy.org/) software to passively scan the site for vulnerabilities but does not perform any attack or attempt to maliciously modify your site code. Example security findings include unintended exposure of sensitive data, SQL injection opportunities, cross-site scripting (XSS) flaws, and the use of components with known vulnerabilities. More details about the scan mechanisms and the resulting file output can be found at [ZAP -  Baseline Scan](https://www.zaproxy.org/docs/docker/baseline-scan/)

## Accessibility Scan

This scan identifies website accessibility violations from [Section 508](https://www.section508.gov/) and the [latest WCAG version](https://www.w3.org/TR/WCAG22/). The scan first crawls your website to identify all pages to test. It then uses the open source portion of [`axe`](https://www.deque.com/axe/) to identify accessibility violations. The final scan is a custom report generated from the `axe` output.
