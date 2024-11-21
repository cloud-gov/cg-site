---
layout: post
date: November 18th 2024
title: "Announcing Cloud.gov Logging system update"
excerpt: The Cloud.gov is upgrading the current application logging system in Dec 2024, and decommissioning the old system. 
---


# Cloud.gov customer notice: Major upgrade of application logging system in December

Cloud.gov is upgrading the current application logging system, <https://logs.fr.cloud.gov>, with a more capable and performant system in December 2024. We're excited by the new capabilities this logging system affords, and we're confident our customers will appreciate the improved performance and new features.

The significance of the update requires a cutover from the current system to the new one that will take place on the following timeline:

* **December 3**: The new system will be generally available at [https://logs-beta.fr.cloud.gov](https://log-beta.fr.cloud.gov).
* **December 10**: The current logging system will be renamed to <https://logs-deprecated.fr.cloud.gov>, and new system will be available at <https://logs.fr.cloud.gov>
* **January 7, 2025**: The deprecated logging system will be decommissioned.

## Improvements and differences

The current logging system is based on a branch of the [Elastic ELK stack ](https://www.elastic.co/elastic-stack/)that has not seen new features for several years. Our updated system is based on [OpenSearch](https://opensearch.org/docs/latest/about/), a fork of the ELK stack, so much of the user interface should be familiar. Improvements and differences include:

* Twelve months of live access to system logs
  * The current system only has access to 6 months
  * Meets M-21-31 requirements for live logging access
* Better tenant isolation: The updated system uses OpenSearch Organizations and a new authorization system to improve multitenancy. The new architecture resolves a variety of errors for customers.
* Better performance, better security, and better upgrade paths
* New: Logs for brokered RDS database instances are now available
* New: JSON log parsing. JSON logs are now ingested using the [flat_object field type in OpenSearch](https://opensearch.org/docs/latest/field-types/supported-field-types/flat-object/). [The flat_object field type allows for searching nested fields of a JSON object using dot notation](https://opensearch.org/docs/latest/field-types/supported-field-types/flat-object/#using-flat-object) but does not require the overhead of custom fields in the index, which is more performant and prevents custom logs from being dropped because of index field limits.
* Coming Soon:
  * Support for alerting, and routing alerts to external systems

## Actions you may need to take

**No action is needed** to ensure that your logs will be available: All log entries emitted by your containers and applications will be available in the new system. Any integrations you have with external logging services remain the same.

**Select tenancy**: When you log in, you will be required to select which tenant (Cloud.gov organization) you want to work in. Any visualizations and dashboards you create will only be visible to other people with access to the same tenant and underlying organization in Cloud.gov

We recommend you take the following actions:

* **Migrate saved searches and dashboards**: While all the log entries are being migrated for you, you will need to migrate customizations you have made. We will provide documentation next week.
* **Update bookmarks**: Saved bookmarks that work with the old system will not work with the new system. You will need to update your bookmarks, as we'll detail in our transition documentation.
* **Take a tour:** If you can, try out the new system in December while you can compare functionality to the old system. Consider attending the Cloud.gov Logs workshop the week of December 9.
* **Ask for help**: Report any undocumented issues you encounter, or questions you may have, to <support@cloud.gov>.

## Support we're providing during this transition

* **Documentation**: We are completing our review of updated documentation and will be publishing them in the coming days. Links to the documentation will be in upcoming emails and [Cloud.gov News](http://cloud.gov/news). 
* **Workshop**: We are preparing a Cloud.gov Logs workshop for December 10 to cover what's new, what's changed, and how to use the system effectively. We'll provide registration information in future updates.
* **[Known Issues](https://github.com/cloud-gov/product/issues/3217)**: We are publicly tracking reported customer-visible issues. Check [here](https://github.com/cloud-gov/product/issues/3217) first if you encounter any potential bugs.
* **Regular communication**: We will be sending weekly emails on this transition through the end of the calendar year. 
* **Additional support:** We have additional staff ready in December to respond to logging-related support requests

## Deprecation notice

The [Cloud.gov deprecation policy](http://cloud.gov) calls for a longer transition period between services than we're employing here, unless continuing that service poses risks to the platform. Since the current logging system uses components that are reaching EOL, continued operation poses security and compliance risks, and we are moving to decommission the service by January 10, 2025.