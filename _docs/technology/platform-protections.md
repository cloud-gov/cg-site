---
parent: technology
layout: docs
sidenav: true
title: Protections against malicious activity
weight: 30
---

Applications and services on the internet experience frequent attacks, probes, and other malicious traffic. Threat actors making malicious requests may aim to exploit vulnerabilities, to compromise infrastructure, or to deny service to legitimate users.

As a multi-tenant platform, cloud.gov experiences a wide range of malicious activity and frequent attacks. To ensure your application remains online and unaffected, we continuously enhance our defenses. Cloud.gov employs multiple layers of protection to safeguard against different types of attacks.

## Blocking known malicious patterns

All inbound traffic to cloud.gov is protected by a comprehensive set of [web application firewall (WAF) rules](https://aws.amazon.com/waf/). These rules, which include both managed and custom rule sets, block traffic that matches malicious patterns.

Managed rule sets provided by AWS offer protection against:

- [Cross-site scripting (XSS)](https://owasp.org/www-community/attacks/xss/)
- Requests for invalid paths or extensions
- Requests from known or suspected malicious IP ranges
- Known Java exploits

Our custom rule set additionally blocks:

- Traffic attempting to exploit [Log4j vulnerabilities](https://www.cisa.gov/news-events/news/apache-log4j-vulnerability-guidance)
- Traffic from [fuzzing](https://owasp.org/www-community/Fuzzing)) or probing tools identified in logs
- Traffic matching [path traversal attack patterns](https://owasp.org/www-community/attacks/Path_Traversal)

## Protections against traffic surges

Cloud.gov occasionally encounters significant spikes, either due to [DDoS](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/) or large scale probing. To mitigate the impact of such surges, we enforce rate limits on requests with a [CHALLENGE action][challenge action].

### Vulnerability scans & CHALLENGE responses

Some site scanning or penetration testing tools may incorrectly flag responses that include an `aws-waf-token` cookie as a security vulnerability. This is a false positive and not indicative of a real vulnerability.

The [CHALLENGE action](https://docs.aws.amazon.com/waf/latest/APIReference/API_ChallengeAction.html) responds to web requests with an interstitial page, allowing legitimate browsers to proceed while blocking requests from most bots. Successfully passing the CHALLENGE results in an [aws-waf-token cookie](https://docs.aws.amazon.com/waf/latest/developerguide/waf-tokens-details.html), which stores the timestamp of the client’s last successful response. The presence of this cookie is evidence of our platform’s protective measures.

Since AWS handles the CHALLENGE response for requests exceeding the rate-limit threshold before reaching your application, these responses may not align with your normal application behavior. For example, CHALLENGE responses may not:

- Redirect HTTP requests to HTTPS
- Include headers normally returned by your application

### AWS CloudFront & CDNs

Cloud.gov offers [Amazon CloudFront as a CDN]({{ site.baseurl }}{% link _docs/services/external-domain-service.md %}) to enhance protection against traffic surges.  CloudFront can cache requests, reducing the load on your application.

CloudFront CDNs managed by Cloud.gov receive additional protections:

- Rate limiting of requests with a [CHALLENGE action][challenge action]
- [Shield Advanced Protection, which auto-detects and auto-mitigates attacks at layer 3, layer 4, and layer 7](https://docs.aws.amazon.com/waf/latest/developerguide/ddos-overview.html)

## Reporting impact on legitimate traffic

If you suspect that your traffic is being improperly affected by these protections, please contact us at [support@cloud.gov]({{ site.support_email }}).

---

### Page information

- Last modified on: {% last_modified_at %}

[challenge action]: https://docs.aws.amazon.com/waf/latest/developerguide/waf-captcha-and-challenge.html
