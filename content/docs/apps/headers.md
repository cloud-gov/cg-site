---
menu:
  docs:
    parent: apps
title: Security headers
weight: 100
---

By default, cloud.gov sets several security-related HTTP headers if your application does not:

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-Xss-Protection: 1; mode=block
Strict-Transport-Security max-age=31536000
```

To override any of these headers, you can set them to a different value in your application. For details on the behavior of HTTP headers, see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers.
