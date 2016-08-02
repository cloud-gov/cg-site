---
menu:
  main:
    parent: operations
title: Continuous Monitoring Plan
---

## Continuous Monitoring Plan

The cloud.gov continuous monitoring plan and strategy is based on the [FedRAMP continuous monitoring strategy guide](https://www.fedramp.gov/files/2015/03/FedRAMP-Continuous-Monitoring-Strategy-Guide-v2.0-3.docx).

## Roles and Responsibilities

The cloud.gov team is responsible for executing the continuous monitoring plan and enabling communication between all the different parties during the monitoring phases.

#### Authorizing Official
Authorizing Officials and their teams ("AOs") serve as the focal point for coordination of continuous monitoring activities for CSPs.  CSPs must coordinate with their AOs to send security control artifacts at various points in time.  The AOs monitor both the Plan of Action & Milestones (POA&M) and any major significant changes and reporting artifacts (such as vulnerability scan reports) associated with the CSP service offering.  AOs use this information so that risk-based decisions can be made about ongoing authorization.  Agency customers must perform the following tasks in support of CSP continuous monitoring:

- Notify CSP if the agency becomes aware of an incident that a CSP has not yet reported
- Provide a primary and secondary POC for CSPs and US-CERT as described in agency and CSP Incident Response Plans
- Notify US-CERT when a CSP reports an incident
- Work with CSPs to resolve incidents; provide coordination with US-CERT if necessary
- Notify FedRAMP ISSO of CSP incident activity
- Monitor security controls that are agency responsibilities.  

During incident response, both CSPs and leveraging agencies are responsible for coordinating incident handling activities together, and with US-CERT.  The team based approach to incident handling ensures that all parties are informed and enables incidents to be closed as quickly as possible.  

#### FedRAMP PMO
The FedRAMP Program Management Office (PMO) acts as the liaison for the Joint Authorization Board for ensuring that CSPs with a JAB P-ATO strictly adhere to their established Continuous Monitoring Plan.  The JAB and FedRAMP PMO only perform Continuous Monitoring activities for those CSPs that have a JAB P-ATO.

#### Department of homeland security (DHS)
The FedRAMP Policy Memo released by OMB defines the DHS FedRAMP responsibilities to include:

- Assisting government-wide and agency-specific efforts to provide adequate, risk-based and cost-effective cybersecurity
- Coordinating cybersecurity operations and incident response and providing appropriate assistance
- Developing continuous monitoring standards for ongoing cybersecurity of Federal information systems to include real-time monitoring and continuously verified operating configurations
- Developing guidance on agency implementation of the Trusted Internet Connection (TIC) program for cloud services.  

The FedRAMP PMO works with DHS to incorporate DHS’s guidance into the FedRAMP program guidance and documents.  

#### Third Party Assessment Organization (3PAO)
Third Party Assessment Organizations (3PAO) are responsible for independently verifying and validating the control implementation and test results for CSPs in the continuous monitoring phase of the FedRAMP process.  Specifically, 3PAOs are responsible for:

- Assessing a defined subset of the security controls annually.  
- Submitting the assessment report to the ISSO one year after the CSP’s authorization date and each year thereafter.
- Performing announced penetration testing.
- Perform annual scans of web applications, databases, and operating systems.
- Assessing changed controls on an ad hoc basis as requested by the AOs for any changes made to the system by the CSP.

In order to be effective in this role, 3PAOs are responsible for ensuring that the chain of custody is maintained for any 3PAO authored documentation.  3PAOs must also be able to vouch for the veracity and integrity of data provided by the CSP for inclusion in 3PAO authored documentation.  As an example:

-	If scans are performed by the CSP, the 3PAO must either be on site and observe the CSP performing the scans or be able to monitor or verify the results of the scans through other means documented and approved by the AO.
- Documentation provided to the CSP must be placed in a format that either the CSP cannot alter or that allows the 3PAO to verify the integrity of the document.


## Continuous Monitoring process

In order to maintain operational visibility, cloud.gov continuous monitoring program provides reports to the AOs at least monthly. These deliverables include:

- Condition of previous assessment
- Weakness identified since the last assessment
- Known or suspected testing/continuous monitoring failure
- Control implementation that has changed since last assessment
- Newly discovered vulnerability, zero-day attack, or exploit
- Recommendation of Authorizing Official or Organization


#### Change control

cloud.gov is a dynamic system and it is in a constant state of change. Configuration management and change control processes help maintain a secure baseline configuration of the cloud.gov architecture.  Routine day-to-day changes are managed through the cloud.gov change management process described in their Configuration Management Plan.

cloud.gov notifies the AO with a minimum of 30 days before implementing any planned major significant changes. The notification includes a Security Impact Analysis Form.

#### Incident Response

All cloud.gov incident response must be handled according to the cloud.gov [IR guide](https://docs.cloud.gov/ops/security-ir/).

## Important Attachments to the Continuous Monitoring guide

- [IR guide](https://docs.cloud.gov/ops/security-ir/)
- Vulnerability Scanning Sample
- Plans of Action & Milestones
- [Information Security Policies](https://github.com/18F/compliance-docs/)
- [Configuration Management Plan](https://docs.cloud.gov/ops/configuration-management/)
- [Contingency Plan](https://docs.cloud.gov/ops/contingency-plan/)
- [System Security Plan](https://compliance.cloud.gov/)
