+++
date = "2019-07-12"
title = "VPN backhaul, Drupal 8 example, and new team members" 
+++

Curious what’s new that you might find helpful as a cloud.gov user? Here are highlights from our recent changes.

## Announcements

### Now available: Connect your cloud.gov apps to your private network

Last October, we announced our team was working on a way for cloud.gov applications to interact securely with your applications on other networks through a VPN, such as systems in an agency data center. This VPN connection can make it easier to run cloud-native applications that need to communicate with legacy systems.

We are so excited to announce [our VPN backhaul](https://cloud.gov/docs/apps/private-egress/) is officially available, and we can configure it for customers who need it! [Contact us if you’d like this to use this feature](https://cloud.gov/docs/apps/private-egress/#how-to-get-a-dedicated-pool-of-cloud-gov-hosts-connected-to-your-organization), and we’ll work with the appropriate teams in your agency to get you set up.

### 2019 FedRAMP annual assessment completed, cloud.gov granted re-authorization

Every year, to maintain [our FedRAMP Authorization](https://cloud.gov/overview/security/fedramp-tracker/), cloud.gov goes through a robust security compliance audit to ensure our security measures are up to date with current federal standards. This enables our customer systems to inherit a significant amount of compliance from the cloud.gov platform, supporting faster ATOs and less work for their teams.

Our team has successfully completed this year’s re-authorization. Current and prospective customers can view our audit materials in the FedRAMP document repository on MAX.gov by [requesting access from FedRAMP](https://cloud.gov/overview/security/fedramp-tracker/#start-the-ato-process).

## New additions


### Try an experimental feature for no-downtime deployments

It’s often a challenge to build a process for deploying new versions of your applications with zero downtime, without needing to double your memory usage. The [latest version of the Cloud Foundry command-line interface (CLI)](https://github.com/cloudfoundry/cli/releases) includes new beta commands to push apps using [rolling deployment](https://docs.cloudfoundry.org/devguide/deploy-apps/rolling-deploy.html). This makes it much easier to implement [blue-green deployment patterns](https://docs.cloudfoundry.org/devguide/deploy-apps/blue-green.html) without doubling your memory quota. (For example, this can replace the unmaintained [autopilot plugin](https://github.com/contraband/autopilot).) Install [the CF CLI update](https://github.com/cloudfoundry/cli/releases), try it out, and let us know if you have any questions!

### Functions support for MySQL databases

If you need to set up a MySQL schema that includes functions, procedures, and triggers, you can now create new databases that have that feature enabled. [To do this, see the “Options” documentation for RDS databases.](https://cloud.gov/docs/services/relational-database/#options) This allows you to build a wider range of applications on cloud.gov.

### Improved instructions for running Drupal 8 for managing content

A lot of government teams run Drupal for content management for their websites, including the [Drupal 8](https://www.drupal.org/8) version. With some modifications, Drupal runs well on cloud.gov. We’ve improved our [instructions and sample code](https://github.com/18F/cf-ex-drupal8) showing how to run Drupal in cloud.gov with best practices including configuration-as-code and continuous deployment principles. Contact our team if you need additional help!

### Automatically label your applications with version control information

Do you want to track which version of your code is running in each of your deployed applications? You can now use the cloud.gov API to automatically label your applications and other resources with your choice of metadata, such as the relevant git commit hash (SHA). For instructions, see [this guide to resource labeling](https://www.cloudfoundry.org/blog/labeling-cloud-foundry-api-resources-with-a-git-sha/).

## Updated

We encourage staying up to date with the latest Cloud Foundry Command-Line Interface (CLI) versions. The latest version is v6.45.0. [You can download the CF CLI update here.](https://github.com/cloudfoundry/cli/releases)

We routinely update the operating system underneath your applications to ensure your applications are using the latest patched versions. For example, there was a high-severity Ubuntu Linux security vulnerability nicknamed [SACKPanic](https://wiki.ubuntu.com/SecurityTeam/KnowledgeBase/SACKPanic) that was announced on June 18, and we mitigated it by the evening of June 19.

## Removed

### Removed: CNAME ALIAS method for verifying DNS ownership

When using the [CDN service](https://cloud.gov/docs/services/cdn-route/) to set up a custom domain name for an application, cloud.gov now only offers certificate provisioning via DNS challenges. We stopped supporting the CNAME ALIAS method. See the [updated steps for setting up DNS](https://cloud.gov/docs/services/cdn-route/#how-to-set-up-dns).

### Removed: Experimental NFS (Network File System) volume service

We are no longer offering our experimental Network File System (NFS) volume service. We are exploring better ways to offer persistent filesystem volumes, which would enable applications to store their state in a durable local filesystem.

## New faces in the cloud.gov team

We are excited to announce new people joining cloud.gov. Please welcome our newest members of the cloud.gov team!

### Eddie Tejeda, cloud.gov Director

Eddie has fifteen years of experience building technology products for civic institutions. At 18F, he worked on a range of topics, including security training, open data, and served as the Director of [Federalist](https://federalist.18f.gov/). Before joining 18F, he co-founded Civic Insight (acquired in 2015), a data platform used by residents across the country to search and visualize building permits, planning and code enforcement data. 

In 2012, he served as a Code for America Fellow and worked with the city of New Orleans to help residents track the progress of vacant and abandoned homes. He also worked with Cornell University and the Department of Transportation (DOT) to develop Regulation Room, a commenting platform used to increase public participation in the regulatory process. Eddie is engaged in his local community and co-founded OpenOakland, a non-profit that promotes civic engagement, and served as Vice Chair in the City of Oakland's Public Ethics Commission.

### Hillary Jeffrey, cloud.gov Cloud Operations Site Reliability Engineer

Hillary grew up in Minnesota, Britain, and Washington state, thanks to her parents doing a work exchange with IBM. She lived the longest just east of Seattle before she went to college in Indiana at Rose-Hulman Institute of Technology. She is an electrical engineer by degree, but she has spent her career in software and firmware development from assembly to Python (her favorite) and has worked for the Navy, the CFPB, and now 18F. 

Hillary currently lives in northeastern North Carolina with her dog and her husband in a hundred-year-old Craftsman Foursquare that they’re gradually renovating. She’s an avid gardener and beekeeper, although she’s currently between hives.

### Alex Smith, cloud.gov Compliance and Security Lead

Born and raised in Prince Georges County, MD, Alex has a combined Computer Science and Cyber Law background, spending his federal career as a technology architect with NSA, DISA/DOD, and most recently US Marshals where he led the Mobile Devices and Interconnecting Services within the Information Technology Division. He wrote the technical specifications and led the deployment of Project Shield (mentioned [in this public article](https://www.fedscoop.com/marshalling-agile-development-improve-customer-service-u-s-marshals-service/)).

### Jessyka Castillo, cloud.gov Agency Partnerships

Jessyka grew up in Miami, Florida. She went to Florida International University undergrad (Go Panthers!) for Communications and The George Washington University graduate school (Go Colonials!) for Systems Engineering & Management with a concentration in public-private partnerships. Prior to joining TTS, she spent some time in New York City working as a public relations and marketing professional, working for a multicultural marketing agency representing Procter & Gamble clients, managing strategic communication plans for fortune 500 companies, and contributing successful consumer focused product development marketing campaigns for multi-million dollar projects. 

Most recently, she contributed her area of expertise to the public sector, working for HHS on Michelle Obama’s *Let’s Move* campaign and also serving as the Interim Director for The George Washington University’s Upward Bound Program, federally sponsored by the Department of Education. As of September 2017, Jessyka joined GSA’s Emerging Leaders Program (ELP), as a rotational Program Analyst where she gained experience in the fields of innovation and incubator technology, systems and framework engineering, finance, contracting and acquisitions, as well as strategic public-private partnerships as a GSA ELPer. After 6 rotations throughout GSA, she is more than confident that 18F is home for her.

### Ron Williams, cloud.gov Operations Site Reliability Engineer

Ron joins us from the U.S. Department of Agriculture where he was the Director of IT for Communications working on USDA.gov, ChooseMyPlate.gov, and many other public-facing websites. As an open-source advocate, Ron focuses on deploying disruptive technologies within public sector institutions to improve services provided to the general public. Prior to government, Ron architected and developed the Drupal Platform at the University of Colorado Boulder for Housing & Dining Services.

### Mike Lloyd, cloud.gov Platform Operations

Mike is a United States Marine and was recently at Pivotal, where he owned the technical business relationship between Microsoft and Pivotal. He comes from a multinational and multilingual family and is a proud member/supporter of the LGBT community as he generally falls under the B side of things. Currently he’s in Boulder CO, down the street from NIST, NOAA, and NCAR.