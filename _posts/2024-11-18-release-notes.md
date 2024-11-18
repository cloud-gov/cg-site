---
layout: post
date: November 18th 2024
title: "November 18th Cloud.gov Release Notes"
excerpt: The Cloud.gov team is working on providing release notes so everyone can see new features and updates.
---

# Release Notes

## Developer-Impacting Changes

The audience for this section is developers who maintain applications on cloud.gov and may need to respond to stack or buildpack changes.

### AWS S3 FIPS-enabled endpoints

As part of Cloud.gov's ongoing efforts to expand the use of FIPS 140-3 validated cryptography,
our [S3 Bucket broker](https://cloud.gov/docs/services/s3/) now populates service credentials
with only the FIPS-validated S3 endpoints.

Prior to October 29, 2024, the S3 credentials included both the `fips_endpoint`
and the `endpoint` values. Now both keys have the same values, e.g.

```
      "credentials": {
        "access_key_id": "REDACTED"}
        "additional_buckets": [],
        "bucket": "cg-redacted",
        "endpoint": "s3-fips.us-gov-west-1.amazonaws.com",
        "fips_endpoint": "s3-fips.us-gov-west-1.amazonaws.com",
        "region": "us-gov-west-1",
		...
```

This change shouldn't break any applications UNLESS you were using HTTP (instead of HTTPS)
to initiate a connection to the S3 endpoint. The non-FIPS endpoint provided
a redirect to HTTPS, the FIPS endpoint does not. This could result in application
errors. Updating code to `enableSSL` or use an HTTPS protocol should resolve the issue.
