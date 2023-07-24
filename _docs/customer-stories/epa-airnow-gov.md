---
parent: customer-stories
layout: docs
sidenav: true
title: Environmental Protection Agency - AirNow.gov
kicker: Case study
redirect_from:
  - /overview/customer-stories/environmental-protection-agency-airnow-gov/
  - /case-studies/epa-airnow-gov/
---

<figure class="content-image">
 <img alt="Screenshot from analytics.usa.gov showing the top requested government domains for the last 7 days on June 13, 2023" src="{{site.baseurl}}/assets/images/content/TopDomainsAirNow.png" />
 <figcaption>Screenshot from analytics.usa.gov showing the top requested government domains for the last 7 days on June 13, 2023</figcaption>
</figure>

In 2018, as wildfires raged in California, Californians turned to [AirNow.gov](https://www.airnow.gov), which is a partnership program operated by the Environmental Protection Agency (EPA) in order to provide the public with near real-time air quality data.

The increased traffic to AirNow.gov during this event put more load on the web servers than they could handle, leading to frequent outages for the site. The EPA team who operates AirNow.gov said they were “struggling to keep up” with the traffic and “it was a fight” to keep the site up.

As a service providing public health data, it is vital for AirNow.gov to remain available, especially during wildfire smoke events when poor air quality can affect millions of people.

To better handle these unanticipated traffic surges in the future, the EPA AirNow team began to look at their options for migrating to cloud infrastructure. The team quickly discovered that the EPA’s Office of Mission Support had [a prototyping agreement with Cloud.gov](https://cloud.gov/pricing/) which they could leverage to deploy AirNow.gov in the cloud.

In the summer of 2019, the EPA AirNow team began deploying AirNow on Cloud.gov.

Immediately, the EPA AirNow team noticed that it was really easy to launch new instances of their application on Cloud.gov, which translated into “elasticity” or the ability to scale their AirNow application up and down as necessary in response to traffic. “We realized we had elasticity immediately,” said Phil Dickerson of EPA’s Office of Air Quality Planning and Standards, which operates AirNow.gov.

> <span class="quote">“Cloud.gov checks the boxes for being able to scale very quickly"</span><span class="source">- Phil Dickerson, EPA Office of Air Quality Planning and Standards</span>

But in the summer of 2023, the newfound “elasticity” of AirNow.gov and its resiliency to traffic surges was really put to the test.

The Canadian wildfires of summer 2023 “drove our traffic higher than it’s ever been before”, said Dickerson. The traffic was “several orders of magnitude higher than what we have ever seen before.”

<figure class="content-image">
  <img alt="Screenshot of Google Analytics showing AirNow.gov traffic from 2018 until 2023" src="{{site.baseurl}}/assets/images/content/epaairnow-analytics-2018-now.jpg" />
  <figcaption>A screenshot provided by the EPA of Google Analytics showing the traffic for AirNow.gov, including the spikes from the California wildfires in 2018 and the Canadian wildfires in summer 2023.<strong> Please note: AirNow.gov did not start running on Cloud.gov until 2019.</strong></figcaption>
</figure>

Not only was the traffic volume higher than ever before, it also grew at a faster rate than ever before. As Dickerson put it: “This past episode was amazing, the traffic surged faster than we’ve ever seen, it probably went up by a million hits in one day.” He continued: “On a Tuesday morning everything looked normal and by Wednesday afternoon we were at a new record high for traffic, which was then broken on Thursday, it happened that fast”.

Even in the face of this unprecedented traffic and load, AirNow.gov was completely stable. “My team and I were amazed it did not slow down or show any signs of having trouble before we could get in to monitor it”, said Dickerson.

The AirNow team attributed the stability of AirNow.gov [to their ability to easily scale their applications on Cloud.gov](https://cloud.gov/docs/management/multiple-instances/). Additionally, the EPA AirNow team credited the [CDN (Content Distribution Network) service](https://cloud.gov/docs/services/external-domain-service/) for efficiently handling many site requests thereby reducing load on their application instances. “The elasticity and the CDN kept everything humming along pretty well before we even knew this was going to be a major episode”, said Dickerson.

> <span class="quote">“I will say this right up front – Cloud.gov is the single biggest factor in our success last week. The traffic we saw was astounding and beyond anything we tested for or ever even anticipated. Our ability to expand resources, combined with the CDN service in front of AirNow, made us incredibly stable.”</span><span class="source">- Phil Dickerson, EPA Office of Air Quality Planning and Standards</span>

As the EPA discovered, while the platform infrastructure offered by Cloud.gov is designed to scale, it also empowers users to scale their applications as necessary. To take advantage of this flexibility offered by Cloud.gov, the EPA AirNow team developed a standard operating procedure for when they observe increased traffic from their analytics:

* [Scale up the number of their application instances]({{ site.baseurl }}{% link _docs/management/multiple-instances.md %})
* Modify the cache headers on their site assets to increase cache lifetime in the CDN and decrease load on their applications
* Use plugins like [“cf top” to monitor the health of their instances](https://github.com/ECSTeam/cloudfoundry-top-plugin)

Building on the solid foundation offered by cloud.gov, the AirNow.gov team is delivering for the public even under the most extreme conditions.

EPA’s success in operating AirNow.gov on Cloud.gov played an important role in the launch of a companion service on Cloud.gov, the [AirNow Fire and Smoke Map](https://fire.airnow.gov/), which EPA runs in partnership with the U.S. Forest Service. Again, the EPA credited the ease of using Cloud.gov in allowing them to quickly develop new services for the public.

If you are a government agency interested in building on a secure, scalable platform so you can spend less time worrying about infrastructure and more time focusing on your application, please contact us at [inquiries@cloud.gov](inquiries@cloud.gov). We would love to help you deliver on your mission.
