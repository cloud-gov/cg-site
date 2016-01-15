---
date: 2015-08-28T10:32:59-04:00
menu:
  main:
    parent: advanced
title: Production Ready Checklist
---

## Zero-Downtime deploy

Your application should be able to be deployed without generating any downtime.
Check out the [cf-blue-green](https://github.com/18F/cf-blue-green) script as a
sample script.

## More than one instance

It is critical that your production application has more than one instance so if
there any issue with one of the runners your app is on your app continues to work.

### How

See the [multiple instances]({{< relref "multiple-instances.md" >}}) page.

## Prefer User Provided Services

Prefer user provided services over environment variables for a secure centralized way to store application credentials and variables.

### How

Create user provided services with `cf cups` bind them with `cf bs`.

## NewRelic (or similar)

You want to be able to receive alerts about application errors and throughput issues.

## Uptime monitor

NewRelic provides uptime monitoring with "Insights". It is easy to set up and
receive alerts for downtime.

## Caching

The best way to prevent performance issues is by having caching enabled on your
application.
Cloud.gov has a memcached service but you can also rely on S3 or file storage for caches.

## Asset Serving

It is best not to serve static files from Cloud.gov directly. You can store your
files in S3 or point CloudFront to an assets folder so you serve your assets with a CDN.

## Domain Delegation

You will need a domain for your application. DNS delegation for the domain is the
easiest path for getting the domain up and running.
