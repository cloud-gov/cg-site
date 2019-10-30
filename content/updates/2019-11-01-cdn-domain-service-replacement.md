+++
date = "2019-11-01"
title = "Replacement of CDN and Custom Domain Service"
+++

We're announcing today the new **name** service broker, providing the new **name** and **name** services, replacing the existing CDN Service and Custom Domain Service, respectively. 
Due to upstream deprecations, we're forced to deprecate the existing services outside of our normal deprecation policy. Beginning today, the existing CDN Service and Custom Domain service
will no longer be able to create new instances. Existing instances will continue working for the time being, but we encourage migrating to the new services below as soon as possible.

## Migrating Custom Domain instances

Migrating instances of the Custom Domain Service is as simple as creating the new instance, updating your DNS, and deleting the old service.

Example: I currently have the domain www.example.gov on my org, with an existing Custom Domain instance named `existing-custom-domain`:

```
$ cf services
Getting services in org example / space example as me@example.gov...

name                            service                       plan             bound apps             last operation     broker                   upgrade available
existing-custom-domain          custom-domain                 custom-domain                           create succeeded   domains-broker
```

The first step is to create a new instance, we'll call it `new-custom-domain` (more detailed instructions available [here]())

```
$ cf create-service brokername custom-domain new-custom-domain -c '{ "domains": ["www.example.gov"]}'
Creating service instance new-custom-domain in org example / space example as me@example.gov
OK

Create in progress. Use 'cf services' or 'cf service new-custom-domain' to check operation status.
$ cf service new-custom-domain
Showing info of service new-custom-domain in org example / space example as me@example.gov
name:             new-custom--domain
service:          custom-domain
tags:
plan:             custom-domain
description:      Custom domains and TLS certificates with automatic renewal
documentation:    https://cloud.gov/docs/services/custom-domains/
dashboard:
service broker:   domains-broker

Last Operation
Status: create in progress
Message: Provisioning in progress; CNAME or ALIAS domain(s) www.example.gov to this-is-a-sample-domain.example.com or create TXT record(s):
name: _acme-challenge.www.example.gov., value: THISISASAMPLEVALUE, ttl: 120
```

To accomplish this without downtime, follow the intructions using TXT records rather than CNAME/ALIAS records. **Using CNAME/ALIAS records will result in some downtime for your domain.**

Work with your DNS provider to create the TXT record. In this case, we need to create a TXT record for _acme-challenge.www.example.gov. with value THISISASAMPLEVALUE and TTL of 120. 
Once you've created the record, first confirm that you can resolve the record yourself:

```
$ nslookup -query=TXT _acme-challenge.www.example.gov 1.1.1.1  # we're using 1.1.1.1 to be sure we aren't querying internal records. Use any public DNS server here.
Server:		1.1.1.1
Address:	1.1.1.1#53

Non-authoritative answer:
_acme-challenge.www.example.gov	text = "THISISASAMPLEVALUE"

Authoritative answers can be found from:

```
 
Once the record is available, check the service status:

```
$ cf service new-custom-domain
Showing info of service new-custom-domain in org cloud-gov / space services as ben.berry@gsa.gov...

name:             new-custom-domain
service:          custom-domain
tags:
plan:             custom-domain
description:      Custom domains and TLS certificates with automatic renewal
documentation:    https://cloud.gov/docs/services/custom-domains/
dashboard:
service broker:   domains-broker

Showing status of last operation from service new-custom-domain...

status:    create succeeded
message:   Service instance provisioned; domain(s) www.example.cloud.gov
started:   2019-10-30T20:50:22Z
updated:   2019-10-30T20:50:35Z

There are no bound apps for this service.

Upgrades are not supported by this broker.

```

When the status shows as create succeeded, update the CNAME or ALIAS records as indicated in the previous message, then verify them:

```
# if you used CNAME:
$ nslookup www.example.gov 1.1.1.1
Server:		1.1.1.1
Address:	1.1.1.1#53

Non-authoritative answer:
www.example.gov	canonical name = this-is-a-sample-domain.example.com
Name:	this-is-a-sample-domain.example.com
Address: 1.2.3.4

# if you used an ALIAS, the output will not reference this-is-a-sample-domain.example.com 
# check that the same IP address is shown for www.example.gov and this-is-a-sample-domain.example.com
$ nslookup www.example.gov 1.1.1.1
Server:		1.1.1.1
Address:	1.1.1.1#53

Non-authoratative answer:
Name:	www.example.gov 
Address: 1.2.3.4
$ nslookup this-is-a-sample-domain.example.com 1.1.1.1
Server:		1.1.1.1
Address:	1.1.1.1#53

Non-authoratative answer:
Name:	this-is-a-sample-domain.example.com
Address: 1.2.3.4
```

Once your DNS records are updated, test your website. When you've confirmed your site is still working as expected, delete the old service:

```
$ cf delete-service old-domain-service
Really delte the service old-domain-service?> y
Deleting service old-domain-service in org example / space example as me@example.gov

```

Test your site one last time, just to be sure, then you're done. 

## Migrating CDN Service instances

Because of limitations imposed by AWS, migrating CDN service instances without downtime requires some extra steps. Detailed instructions follow, but at a high level:
1. create a temporary Custom Domain instance
1. delete the existing CDN instance
1. create the new CDN instance
1. delete the temporary Custom Domain instance

While using the temporary Custom Domain instance, your site will still function, but it will not be using the caching CDN. Depending on your application that could have effects
varying from increased page load times for users (due to lack of edge locations) to increased load on your application (due to lack of caching). Make sure you understand the implcations
for your specific application before proceeding, and take necessary precautions.

For this scenario, we have an existing instance of the CDN Service, called `old-cdn-service`, serving the domain www.example.gov, as shown below:

```
$ cf service old-cdn-service
Showing info of service old-cdn-service in org example / space example as me@example.gov...

name:             old-cdn-service
service:          cdn-route
tags:
plan:             cdn-route
description:      Custom domains, CDN caching, and TLS certificates with automatic renewal
documentation:    https://cloud.gov/docs/services/cdn-route/
dashboard:
service broker:   cdn-broker

Showing status of last operation from service old-cdn-service...

status:    create succeeded
message:   Service instance provisioned [www.example.gov => example.fr.cloud.gov]; CDN domain example.cloudfront.net
started:   2018-04-26T15:11:07Z
updated:   2018-04-26T15:34:05Z

There are no bound apps for this service.

Upgrades are not supported by this broker.

```

The first step is to create the temporary Custom Domain Service instance. We'll call it `temp-custom-domain` in this example:

```
$ cf create-service brokername custom-domain temp-custom-domain -c '{ "domains": ["www.example.gov"]}'
Creating service instance temp-custom-domain in org example / space example as me@example.gov
OK

Create in progress. Use 'cf services' or 'cf service temp-custom-domain' to check operation status.
$ cf service temp-custom-domain
Showing info of service new-custom-domain in org example / space example as me@example.gov
name:             temp-custom--domain
service:          custom-domain
tags:
plan:             custom-domain
description:      Custom domains and TLS certificates with automatic renewal
documentation:    https://cloud.gov/docs/services/custom-domains/
dashboard:
service broker:   domains-broker

Last Operation
Status: create in progress
Message: Provisioning in progress; CNAME or ALIAS domain(s) www.example.gov to this-is-a-sample-domain.example.com or create TXT record(s):
name: _acme-challenge.www.example.gov., value: THISISASAMPLEVALUE, ttl: 120
```

Update your DNS as explained in the command output. To accomplish this without downtime, follow the intructions using TXT records rather than CNAME/ALIAS records. **Using CNAME/ALIAS records will result in some downtime for your domain.**

Work with your DNS provider to create the TXT record. In this case, we need to create a TXT record for _acme-challenge.www.example.gov. with value THISISASAMPLEVALUE and TTL of 120. 
Once you've created the record, first confirm that you can resolve the record yourself:

```
$ nslookup -query=TXT _acme-challenge.www.example.gov 1.1.1.1  # we're using 1.1.1.1 to be sure we aren't querying internal records. Use any public DNS server here.
Server:		1.1.1.1
Address:	1.1.1.1#53

Non-authoritative answer:
_acme-challenge.www.example.gov	text = "THISISASAMPLEVALUE"

Authoritative answers can be found from:

```

Once the record is available, check the service status:

```
$ cf service temp-custom-domain
Showing info of service temp-custom-domain in org cloud-gov / space services as ben.berry@gsa.gov...

name:             temp-custom-domain
service:          custom-domain
tags:
plan:             custom-domain
description:      Custom domains and TLS certificates with automatic renewal
documentation:    https://cloud.gov/docs/services/custom-domains/
dashboard:
service broker:   domains-broker

Showing status of last operation from service new-custom-domain...

status:    create succeeded
message:   Service instance provisioned; domain(s) www.example.cloud.gov
started:   2019-10-30T20:50:22Z
updated:   2019-10-30T20:50:35Z

There are no bound apps for this service.

Upgrades are not supported by this broker.

```

When the status shows as create succeeded, update the CNAME or ALIAS records as indicated in the previous message, then verify them:

```
# if you used CNAME:
$ nslookup www.example.gov 1.1.1.1
Server:		1.1.1.1
Address:	1.1.1.1#53

Non-authoritative answer:
www.example.gov	canonical name = this-is-a-sample-domain.example.com
Name:	this-is-a-sample-domain.example.com
Address: 1.2.3.4

# if you used an ALIAS, the output will not reference this-is-a-sample-domain.example.com 
# check that the same IP address is shown for www.example.gov and this-is-a-sample-domain.example.com
$ nslookup www.example.gov 1.1.1.1
Server:		1.1.1.1
Address:	1.1.1.1#53

Non-authoratative answer:
Name:	www.example.gov 
Address: 1.2.3.4
$ nslookup this-is-a-sample-domain.example.com 1.1.1.1
Server:		1.1.1.1
Address:	1.1.1.1#53

Non-authoratative answer:
Name:	this-is-a-sample-domain.example.com
Address: 1.2.3.4
```

Once your DNS records are updated, test your website. When you've confirmed your site is still working as expected, delete the old service:

```
$ cf delete-service old-cdn-service
Really delte the service old-cdn-service?> y
Deleting service old-cdn-service in org example / space example as me@example.gov

```

The delete will take place asychronously, and may take up to an hour. 
Once the delete is complete, create a your new CDN service instance:

```
$ cf create-service cdn-service cdn-service new-cdn-service -c '{"domains": ["www.example.gov"]}'
Creating service instance new-cdn-service in org example / space example as me@example.gov
OK

Create in progress. Use 'cf services' or 'cf service new-cdn-service' to check operation status.
```

Get the DNS instructions:

```
$ cf service new-cdn-service
Showing info of service new-cdn-service in org example / space example as me@example.gov
name:             new-cdn-service
service:          cdn-service
tags:
plan:             cdn-service
description:      Custom domains and TLS certificates with automatic renewal
documentation:    https://cloud.gov/docs/services/custom-domains/
dashboard:
service broker:   cdn-service-broker

Last Operation
Status: create in progress
Message: Provisioning in progress; CNAME or ALIAS domain(s) www.example.gov to example2.cloudfront.net or create TXT record(s):
name: _acme-challenge.www.example.gov., value: THISISASAMPLEVALUE, ttl: 120
```

Update your DNS records as indicated above. Again, use the TXT record instructions to eliminate downtime. Using the CNAME instructions will result in downtime for your application.

Work with your DNS provider to create the TXT record. In this case, we need to create a TXT record for _acme-challenge.www.example.gov. with value THISISASAMPLEVALUE and TTL of 120. 
Once you've created the record, first confirm that you can resolve the record yourself:

```
$ nslookup -query=TXT _acme-challenge.www.example.gov 1.1.1.1  # we're using 1.1.1.1 to be sure we aren't querying internal records. Use any public DNS server here.
Server:		1.1.1.1
Address:	1.1.1.1#53

Non-authoritative answer:
_acme-challenge.www.example.gov	text = "THISISASAMPLEVALUE"

Authoritative answers can be found from:

```

Once the record is available, check the service status:

```
$ cf service new-cdn-service
Showing info of service new-cdn-service in org cloud-gov / space services as ben.berry@gsa.gov...

name:             new-cdn-service
service:          cdn-service
tags:
plan:             cdn-service
description:      Custom domains and TLS certificates with automatic renewal
documentation:    https://cloud.gov/docs/services/custom-domains/
dashboard:
service broker:   cdn-service

Showing status of last operation from service new-custom-domain...

status:    create succeeded
message:   Service instance provisioned [www.example.gov => example.fr.cloud.gov]; CDN domain example.cloudfront.net
started:   2019-10-30T20:50:22Z
updated:   2019-10-30T20:50:35Z

There are no bound apps for this service.

Upgrades are not supported by this broker.

```

When the status shows as create succeeded, update the CNAME or ALIAS records as indicated in the previous message, then verify them:

```
# if you used CNAME:
$ nslookup www.example.gov 1.1.1.1
Server:		1.1.1.1
Address:	1.1.1.1#53

Non-authoritative answer:
www.example.gov	canonical name =  example2.cloudfront.net
Name:	 example2.cloudfront.net
Address: 1.2.3.4

# if you used an ALIAS, the output will not reference this-is-a-sample-domain.example.com 
# check that the same IP address is shown for www.example.gov and this-is-a-sample-domain.example.com
$ nslookup www.example.gov 1.1.1.1
Server:		1.1.1.1
Address:	1.1.1.1#53

Non-authoratative answer:
Name:	www.example.gov 
Address: 1.2.3.4
$ nslookup  example2.cloudfront.net 1.1.1.1
Server:		1.1.1.1
Address:	1.1.1.1#53

Non-authoratative answer:
Name:	 example2.cloudfront.net
Address: 1.2.3.4
```
