+++
date = "2016-07-07"
title = "Today’s Dashboard update (formerly the “Deck”)"
+++

Today we released a new version of the [cloud.gov Deck (now Dashboard)](https://dashboard.cloud.gov/). The best part is invisible: we refactored the codebase so we can improve it much faster than we could with the old version. But it has visible changes too, so here’s what’s new, what we have in mind, and how to tell us what you think.
<!--more-->

We'll keep the [old Deck](https://console.cloud.gov/) around for about a week and then will redirect it to this new version. Let us know if this would cause problems for you.

### What's new and different

* **Name:** We took this opportunity to rename it from the “Deck” to the “Dashboard”, since that’s what people usually call it.
* **Style:** It fits into the overall cloud.gov style and navigation! So for example, when you’re in the Dashboard troubleshooting something, you can easily go look at [documentation](https://docs.cloud.gov/) and [status](https://cloudgov.statuspage.io/).
* **Navigation:** Navigating to your orgs, spaces, and apps is simpler: the sidebar displays a straightforward list of the orgs and spaces in your account, along with the marketplaces available for your orgs. You won’t have to click as many menus to do common tasks.
* **Labels:** Data about your apps has unit labels to identify whether numbers are in GB or MB.
* **Code:** The Dashboard's refactored codebase has better tests and less repetition.
* **More potential for open source collaboration:** This improved codebase will help us encourage reuse and contributions by outside-18F teams that are also building tools on top of Cloud Foundry.

### What’s missing in this version

* **App management options:** This version doesn’t include all the earlier Deck’s options for managing apps (such as starting/stopping them, binding services, and updating routes). Instead, it links to documentation for those tasks on the command line. These web options weren’t used much, and we’re researching whether we should prioritize rebuilding them. (We’re curious what you think.)
* **App logs and events:** The Dashboard now points to [logs.cloud.gov](https://login.cloud.gov/) for viewing app logs and events, instead of duplicating it.
* **Quota meter:** We didn’t re-implement the small quota indicator from the old Deck, since it was mostly mysterious to people. We’re researching how to helpfully explain your quota usage.
* **Perfectly bug-free experience:** We have a list of [known bugs](https://github.com/18F/cg-deck/issues?q=is%3Aopen+is%3Aissue+label%3Abug) — please feel free to file more if you notice something weird or broken.

### What we’ve heard that people want

As we figure out next steps, we know that people want the Dashboard to help them:

* Understand how to use cloud.gov
* Troubleshoot apps that are having problems
* Do more tasks that are only available on the command line
* Get insight into quotas and billing

### We’d like your thoughts

Everyone can [file issues](https://github.com/18F/cg-deck/issues) for bugs and suggestions. If you're in 18F, come talk to us about the Dashboard in [#cloud-gov-navigator](https://gsa-tts.slack.com/messages/cloud-gov-navigator/). If you're a cloud.gov user outside 18F, you can send thoughts and questions to us at cloud-gov-support@gsa.gov.
