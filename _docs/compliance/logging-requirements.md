---
parent: compliance
layout: docs
sidenav: true
title: M-21-31 compliance
---

This document outlines how our platform enables cloud.gov customers to comply with logging requirements specified by [OMB Memorandum M-21-31](https://bidenwhitehouse.archives.gov/wp-content/uploads/2021/08/M-21-31-Improving-the-Federal-Governments-Investigative-and-Remediation-Capabilities-Related-to-Cybersecurity-Incidents.pdf). If you have any questions about this document, please contact [support@cloud.gov](mailto:support@cloud.gov).

## EL1 Compliance

### Basic Logging Categories

- Cloud.gov currently retains logs in "active" storage (using OpenSearch) for 12 months (to facilitate frequent use and ease of access), and 18 months in cold storage (using S3).

### Minimum Logging Data

Cloud.gov ensures that platform component and application logs contain the minimum required data where possible. Customers are responsible for logging any custom HTTP headers at the application level.

### Time Standard

- Timestamps are currently applied to all logs.
- Cloud.gov met FedRAMP requirements to use NIST time servers, and will adopt [Amazon Time Sync](https://aws.amazon.com/about-aws/whats-new/2017/11/introducing-the-amazon-time-sync-service/) pending FedRAMP approval to use time based on Stratum 1 GPS-based sources.

### Event Forwarding

- All logs are currently forwarded by default to a centralized ELK Stack (Elasticsearch, Logstash, and Kibana), as well as S3, and all data is encrypted in transit.
- Any customer can use a ["log drain"](https://cloud.gov/docs/deployment/logs/#how-to-automatically-copy-your-logs-elsewhere) to forward their logs to their agency services.

### Protecting and Validating Log Information

- Event logging is in place for all active system components, and internal alerts are in place for any logging disruptions.
- Cloud Foundry permissions are in place to keep ELK log viewing to authorized roles.
- Access to cold storage in S3 is limited to "platform operators" only, based on AWS IAM permissions
- Log files are protected from unauthorized modifications based on current authentication mechanisms.
- Logs are streamed continuously both to ELK for live viewing and S3 for cold storage.
- Cloud.gov will implement Elasticsearch [index lifecycle policies](https://www.elastic.co/guide/en/elasticsearch/reference/current/index-lifecycle-management.html) to make data indices read-only once they [rollover](https://www.elastic.co/guide/en/elasticsearch/reference/current/index-rollover.html).

### Passive DNS

Slated for implementation in 2023 pending availability of OS support and other infrastructure.

### Cybersecurity Infrastructure Security Agency (CISA) and Federal Bureau of Investigations (FBI) Access Requirements

Cloud.gov use of S3 for customer logs and AWS CloudWatch for platform logs provides a standard set of tools for log sharing with CISA and law enforcement agencies.

### Basic Centralized Access

- Cloud.gov customers can set up a ["Log Drain"](https://cloud.gov/docs/deployment/logs/#how-to-automatically-copy-your-logs-elsewhere) which lets customers stream logs to their agency log centralization service.
- Cloud.gov is leveraging GSA log centralization services and will provide guidance for GSA customers as that matures.

## EL2 Compliance

To be outlined at a later date.

## EL3 Compliance

To be outlined at a later date.
