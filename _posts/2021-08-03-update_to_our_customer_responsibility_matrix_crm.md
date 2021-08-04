---
layout: post
title: Update to our Customer Responsibility Matrix (CRM)
date: August 3, 2021
excerpt: Today's update to our Control Implementation Summary (CIS) + Customer
  Responsibility Matrix (CRM) clarifies some language and inhertiance status for
  controls.
---
The **[Control Implementation Summary (CIS) + Customer Responsibility Matrix (CRM) + Control-by-Control Inheritance (.xlsx)](https://cloud.gov/resources/cloud.gov-CIS-Worksheet.xlsx)** is a summary of each Low and Moderate security control and whether it is handled by cloud.gov, shared responsibility, or customer responsibility. It includes guidance on which controls a customer system can fully or partially inherit from cloud.gov.

 We've made some recent changes to this document that we wanted to summarize for platform users, and those interested in implementing a solution on the platform. 

### Recent changes to CRM

* Added another page listing Low-impact controls, which provides color-coded conditional formatting to the CRM

### Updates to controls

* AC-02(5) Corrected inheritance to “No” was “Partial”, for inactivity logout
* AU-04: Corrected inheritance to Yes, was Partial, for logging capacity
* CA-08: Corrected inheritance to No, was Partial, for penetration tests
* CP-06: Clarified to use “service-level objectives” instead of SLAs
* CP-07: Clarified to use “service-level objectives” instead of SLAs
* IA-02: Corrected inheritance to “No”, was “Partial” for local access
* IA-05 (02): Corrected inheritance to “Partial” as cloud.gov can use PKI for agency authentication. Was “No”
* IA-05 (04): Corrected inheritance to “Partial” as the cloud.gov IdP enforces password strength
* IA-05 (06): Corrected inheritance to “Partial” as the cloud.gov IdP protects authenticators
* SC-08: Corrected typo so it reads “HTTPS” (not “HTTS”)
* SC-13: Corrected to refer to “encryption,” (not “credentials”)
* SC-17: Corrected inheritance from “No” to “Partial” for obtaining certs from approved provider
* SC-19: Corrected inheritance to “Yes” from “No” since cloud.gov does not support VOIP
* SI-04 (05): Note regarding alert routing for A/V detection

### Using this document

You can read more on how to start the ATO process with cloud.gov at [our FedRAMP Authorized page](https://cloud.gov/docs/overview/fedramp-tracker/).
