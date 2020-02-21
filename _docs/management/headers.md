---
parent: management
layout: docs
sidenav: true
redirect_from: 
    - /docs/apps/headers/
title: Security-related HTTP headers
---

By default, cloud.gov sets several security-related HTTP headers if your application does not:

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
```

These headers reflect some of the main recommendations of the [OWASP Secure Headers Project](https://www.owasp.org/index.php/OWASP_Secure_Headers_Project#tab=Headers). Many web application security scanners (commonly implemented to help fulfill [RA-5](https://nvd.nist.gov/800-53/Rev4/control/RA-5)) identify lack of these headers as a potential vulnerability, so cloud.gov sets them by default to support your application's security and security compliance.

To override any of these headers, you can set them to a different value in your application. To omit the `X-Frame-Options header` entirely, you can set its value to `ALLOWALL`. [Details on the behavior of HTTP headers.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
