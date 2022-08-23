---
parent: compliance
layout: docs
sidenav: true
title: Logging Requirements
---

How our system meets logging requirements specified by M-21-31.

## EL1 Requirements

### Basic Logging Categories

cloud.gov will retain logs for a minimum of 12 months in `Active Storage` (to facilitate frequent use and ease of access) and 18 months in `Cold Storage`.

### Minimum Logging Data

cloud.gov ensures that platform component and application logs contain the minimum required data where possible.

### Time Standard

Timestamps are applied to all logs, and cloud.gov will apply updates to conform to ISO 8601 and RFC 339 standards. cloud.gov will implement [Amazon Time Sync](https://aws.amazon.com/about-aws/whats-new/2017/11/introducing-the-amazon-time-sync-service/), which uses a series of satellite-connected and atomic reference clocks to deliver current time readings.

### Event Forwarding

All logs are currently forwarded to a centralized ELK Stack (Elasticsearch, Logstash, and Kibana), and all data is encrypted in transit.

### Protecting and Validating Log Information

Event logging is in place for all active system components. Traps will be put in place to monitor these data streams for disruption.

Only individuals with the correct permissions may access, view, or modify log files.

The cloud.gov team will regularly review the views and usage of log files.

Log files are protected from unauthorized modifications. (Need more detail)

All logs are backed up to a centralized ELK service.

cloud.gov implements AIDE to check and alert on log file changes.

### Passive DNS

[describe how we handle this requirement or what steps we will be taking]

### Cybersecurity Infrastructure Security Agency (CISA) and Federal Bureau of Investigations (FBI) Access Requirements

[describe how we handle this requirement or what steps we will be taking]

### Logging Orchestration, Automation, and Response – Planning

cloud.gov will create a plan on how to best implment Security, Orchestration, Automation, and Response (SOAR) capabilities.

### User Behavior Monitoring – Planning

cloud.gov will create a plan on how to best implement user behavior analytics capabilities in our environment. This will be used to identify potentially malicious or malicious activity.

### Basic Centralized Access

cloud.gov logs will be centrally aggregated at a component-level to an Enterprise Log Manager (ELM).

## EL2 Requirements

To be outlined at a later date.

## EL3 Requirements

To be outlined at a later date.