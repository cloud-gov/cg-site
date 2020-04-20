--- 
layout: post
date: "2018-05-21" 
title: "New custom domain service" 
redirect_from:
  - /updates/2018-05-21-new-custom-domain-service/
---

For custom domain support, cloud.gov provides a [CDN service]({{ site.baseurl }}/docs/services/cdn-route) that uses AWS CloudFront. AWS CloudFront is outside the AWS FedRAMP P-ATO boundary, so we’ve updated the CDN service documentation to [explain the compliance impact of using this service more clearly]({{ site.baseurl }}/docs/services/cdn-route#before-you-use-this-service).

cloud.gov now also provides a [custom domain service]({{ site.baseurl }}/docs/services/custom-domains) without CloudFront. You can use the CDN service or custom domain service according to your technical and compliance needs. If you’re using the CDN service and you need to switch to the custom domain service, [follow the instructions on the custom domain page]({{ site.baseurl }}/docs/services/custom-domains).
