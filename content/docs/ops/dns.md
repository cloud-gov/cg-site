---
menu:
  docs:
    parent: operations
title: DNS settings for cloud.gov
---

The [`18F/dns` repository][repo-18f/dns] contains the [`cloud.gov.tf` Terraform
configuration][repo-18f/dns#cloud.gov.tf] which automatically updates AWS. The
configuration file leverages resources of type `aws_route53_record`. To learn
more about Terraform configuration continue on below, or [read the documentation
on Terraform's documentation site][docs-terraform#resources].

[docs-terraform#resources]: https://www.terraform.io/docs/configuration/resources.html "Terraform - Docs - Configuration - Resources"
[repo-18f/dns]: https://www.github.com/18F/dns "Github 18F/dns"
[repo-18f/dns#cloud.gov.tf]: https://github.com/18F/dns/blob/master/terraform/cloud.gov.tf "Terraform configuration file for cloud.gov"

## Examples of records

The `cloud.gov.tf` Terraform configuration file supports the following record
types:

- A
- AAAA
- CNAME
- MX
- TXT

For more information about about the available records, [please read the Amazon
Route 53 documentation site][docs-aws#route53].

[docs-aws#route53]: https://aws.amazon.com/route53/faqs/#which_dns_records_are_supported "AWS Route53 Records Supported Types"

### A/AAAA (alias record) example

> Alias records work like a CNAME record in that you can map one DNS name
> (example.com) to another `target` DNS name (elb1234.elb.amazonaws.com). They
> differ from a CNAME record in that they are not visible to resolvers.
> Resolvers only see the A record and the resulting IP address of the target
> record.

```terraform
resource "aws_route53_record" "cloud_gov_<DOMAIN_NAME_UNDERSCORED>_a" {
  zone_id = "${aws_route53_zone.cloud_gov_zone.zone_id}"
  name = "<DOMAIN_NAME>."
  type = "A"
  alias {
    name = "<CANONICAL_DOMAIN_NAME>"
    zone_id = "<ZONE_ID>"
    evaluate_target_health = false
  }
}
```

### CNAME (canonical name record) example

```terraform
resource "aws_route53_record" "cloud_gov_<DOMAIN_NAME_ALIAS_UNDERSCORED>_cname" {
  zone_id = "${aws_route53_zone.cloud_gov_zone.zone_id}"
  name = "<DOMAIN_NAME_ALIAS>."
  type = "CNAME"
  ttl = 60
  records = ["<CANONICAL_DOMAIN_NAME>."]
}
```

### MX (mail exchanger record) example

```terraform
resource "aws_route53_record" "cloud_gov_<DOMAIN_NAME_UNDERSCORED>_mx" {
  zone_id = "${aws_route53_zone.cloud_gov_zone.zone_id}"
  name = "<DOMAIN_NAME>."
  type = "MX"
  ttl = 300
  records = ["<PRIORITY> <MAIL_HOST_1>", "<PRIORITY> <MAIL_HOST_2>"]
}
```

### TXT (text record) example

```terraform
resource "aws_route53_record" "cloud_gov_<DOMAIN_NAME_UNDERSCORED>_txt" {
  zone_id = "${aws_route53_zone.cloud_gov_zone.zone_id}"
  name = "<DOMAIN_NAME>."
  type = "TXT"
  ttl = 300
  record = ["<key=VALUE>"]
}
```

#### A note about Terraform syntax

The configuration files uses the Terraform syntax. To read more about Terraform
syntax, [please read the documentation on Terraform's documentation site][docs-terraform#syntax].

[docs-terraform#syntax]: https://www.terraform.io/docs/configuration/syntax.html "Terraform - Docs - Configuration - Syntax"

## Submit a Pull Request

To update a DNS record, submit a pull request to the `18F/dns` repository with
your changes. Either branches or forks are okay.

Pull requests will be reviewed and merged by a member of the infrastructure team
or members of the cloud.gov team.
