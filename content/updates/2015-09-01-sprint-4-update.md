+++
date = "2015-09-01"
title = "Status page and console additions"
+++

We've added a new status page to show you the state of the cloud.gov platform, and we've made significant upgrades in your ability to manage your apps via the web.
<!--more-->

### Status Page
As production use of cloud.gov ramps up, it's important that you have a constant picture of the platform's status, which may affect your product's operations and availability.

We're now providing this visibility via the [cloud.gov Status Page](https://cloudgov.statuspage.io/), where you'll be able to see at a glance:

- When there are any ongoing or recent degradations in service
- When any maintenance is planned or recently completed

We've proactively subscribed existing users to that page, so there's no need for any action on your part... You'll be notified via e-mail whenever problems are identified, or when planned maintenance is expected to impact your application's availability. However, you can also use the subscription control at the upper-right of the page to subscribe to updates via texts or Atom/RSS feed if you so choose.

### Console Improvements
In addition to the command-line client, the [cloud.gov web-based console](https://console.cloud.gov/) has now entered an alpha state. You can use the console to **review your organizations and spaces**, and **manage the state of your applications, services, and routes**. Creation of accounts, orgs, and spaces is still managed [via GitHub request](https://docs.cloud.gov/getting-started/setup/).

Here are examples of actions now possible via the magic of your Interweb-capable browsing apparatus:

- Traverse the layout of your accessible organizations and spaces
- Control access to your owned orgs and spaces for other accounts
- Browse a list of available services and provision new instances
- Bind service instances with specific applications
- Edit the routes that will bring user traffic to an application
- Inspect the live resource utilization of a running application
- Restart stopped or misbehaving applications

If you've not taken a look in a while, please [check it out](https://console.cloud.gov/)!

Note I said above the console is in "alpha" state, and really it's more of an MVP. Please [report problems or feature requests](https://github.com/18F/cf-deck/issues) or better yet, [make pull-requests](https://github.com/18F/cf-deck/pulls) via GitHub. (Side note: **We are short-handed on front-end/design/UI resources**, so any quick help anyone can offer, even if it's just some help with our IA, would be very **VERY** welcome!)

### Other stuff
We're now publishing our [roadmap](https://18f.storiesonboard.com/m/gov-dev) in [story-map form](http://jpattonassociates.com/wp-content/uploads/2015/03/story_mapping.pdf) in case anyone wants to get a peek at what we're focused on now and what we're juggling for the future. Our focus right now is: **Buttoning up loose ends that prevent us from offering cloud.gov to other agencies.**

Our [intra-sprint kanban board](https://trello.com/b/ChGzyepo/gov-dev) is also visible, as is the [calendar of cloud.gov team rituals](https://www.google.com/calendar/embed?src=gsa.gov_0samf7guodi7o2jhdp0ec99aks%40group.calendar.google.com&ctz=America/Los_Angeles) for anyone who would like to attend.

That's all for now...
