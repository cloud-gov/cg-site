---
layout: post
title: "Restricting access to apps"
date: October 05, 2021
excerpt: Information to help you restrict access to your apps
---

Applications sometimes need to restrict access to just an allow list of IP's like only allowing access from an agency's VPN. This is a common use case, and using nginx as a reverse proxy is the preferred method for this. We even have some samples that you can work from if you are interested.

In addition, you may also want to take a look at internal routes on cloud.gov. Running an app on an internal route and using an nginx proxy to manage access is the standard way of restricting access to an app. Here are a few resources that might be helpful.

* The cloud.gov team a tech talk on internal routes: [https://www.youtube.com/watch?v=2m4FP522DU8](https://www.youtube.com/watch?v=2m4FP522DU8)
* There are some examples apps that went along with this talk here: [https://github.com/cloud-gov/tech-talk-internal-routes](https://github.com/cloud-gov/tech-talk-internal-routes)
* Some additional resources that might be useful are here: [https://github.com/cloud-gov/tech-talk-internal-routes#additional-resources](https://github.com/cloud-gov/tech-talk-internal-routes#additional-resources)
