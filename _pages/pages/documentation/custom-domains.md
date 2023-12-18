---
title: Custom Domains
permalink: /pages/documentation/custom-domains/
layout: docs
navigation: pages
sidenav: pages-documentation
---

When you are ready to share your site with the public you can add your own custom domain. Please make sure you have completed all of the requirements in [before you launch]({{site.baseurl}}/pages/documentation/before-you-launch#requirements) before continuing.

If you are migrating an existing site to Pages and wish to minimize downtime, see [minimizing downtime](#minimizing-downtime)

It is possible to add up to 2 custom domains for your site, each one requires the completion of the following 3 steps:

1. [Configure your DNS](#configure-your-dns)
    * [Determine your domain type](#determine-your-domain-type)
    * [Adding an apex domain](#adding-an-apex-domain)
        - [Your DNS provider supports `ALIAS` records](#your-dns-provider-supports-alias-records)
        - [Your DNS provider does **not** support `ALIAS` records](#your-dns-provider-does-not-support-alias-records)
    * [Adding a subdomain](#adding-a-subdomain)
        - [Minimizing downtime](#minimizing-downtime)
    * [CAA records](#caa-records)
2. [Notify Pages](#notify-pages)
3. [Configure your custom domain](#configure-your-custom-domain)

---

## Configure your DNS

For each domain you add to Pages, there are 2 DNS records that you (or your DNS administrators) must create before Pages can serve your site at the chosen domain.

The details differ depending on the type of domain you would like to add.

- [Determine your domain type](#determine-your-domain-type)
- [Adding an apex domain](#adding-an-apex-domain)
- [Adding a subdomain](#adding-a-subdomain)

### Determine your domain type
An "apex" or "2nd level" domain is the "root" of your domain and will contain only one "`.`". A subdomain is any other domain and will contain more than one "`.`".

#### Examples

| apex domains  | subdomains              |
| ------------- | ----------------------- |
| `example.gov` | `www.example.gov`       |
| `18f.gov`     | `accessibility.18f.gov` |

---

### Adding an apex domain

Because Pages does not currently provide static IP addresses, in order for Pages to serve a site at an apex domain your DNS provider must support `ALIAS` records. If they do not, you may require additional help for Pages to be able to serve your site at that domain.

- [Your DNS provider supports `ALIAS` records](#your-dns-provider-supports-alias-records)
- [Your DNS provider does **not** support `ALIAS` records](#your-dns-provider-does-not-support-alias-records)

#### Your DNS provider supports `ALIAS` records

Then you only need to configure the following DNS records, replacing **`example.gov`** with your actual domain:

| type | name | value |
| ---- | ---- | ----- |
| `CNAME` | `_acme-challenge.`**`example.gov`**. | `_acme-challenge.`**`example.gov`**`.external-domains-production.cloud.gov.` |
| `ALIAS` | **`example.gov`**`.` | **`example.gov`**`.external-domains-production.cloud.gov.` |

#### Your DNS provider does **not** support `ALIAS` records
Pages does not currently provide static IP addresses for which an `A` record can be used to direct traffic to your site. In this case you will have to utilize an external server that:
- is available at a static IP
- can redirect traffic from your apex domain to a subdomain (Ex. `example.gov` -> `www.example.gov`)
- includes an SSL certificate for the apex domain that you or your service provider acquires

If your agency or DNS provider has an available service, you (or they) can follow the following steps:

1. Obtain and install an SSL certificate for your apex domain on the "redirect" server
2. Configure the "redirect" server to redirect traffic from your apex domain to a subdomain (`example.gov` -> `www.example.gov`)
3. Configure the following DNS record, replacing **`example.gov`** with your actual domain and **`1.1.1.1`** with the actual IP address of your "redirect" server:

    | type | name | value |
    | ---- | ---- | ----- |
    | `A` | **`example.gov`**`.` | **`1.1.1.1`** |

4. Follow the instructions in [adding a subdomain](#adding-a-subdomain) for the subdomain to which you are redirecting.

---

### Adding a subdomain
Configure the following DNS records, replacing **`sub.example.gov`** with your actual domain:

| type | name | value |
| ---- | ---- | ----- |
| `CNAME` | `_acme-challenge.`**`sub.example.gov`**`.` | `_acme-challenge.`**`sub.example.gov`**`.external-domains-production.cloud.gov.` |
| `CNAME` | **`sub.example.gov`**`.` | **`sub.example.gov`**`.external-domains-production.cloud.gov.` |

#### Minimizing downtime
It may take 5-10 minutes to provision an SSL certificate, so there will be a non-trivial amount of time between when the DNS records are created and when your site is live. To reduce the downtime, you can create the DNS records in two separate steps:
1. Create the `CNAME` record for the `_acme-challenge` subdomain as described above and notify Pages support
2. Pages support will notify you once SSL certificate has been issued
3. Create the `CNAME` record for your subdomain as described above

---

### CAA records

If you aren't already using [CAA records](https://en.wikipedia.org/wiki/DNS_Certification_Authority_Authorization), you don't need to add one to work with Pages. You can check your existing records in DNS.

    $ dig CAA example.gov
    example.gov.           299     IN      CAA     0 issue "certificate-issuer.example.com"

If you are using CAA records, you must have a record for letsencrypt.org. This authorizes Pages to issue a TLS certificate for your domain. The CAA record should have no flags (0) and the `issue` tag. CAA records are "recursive" so they apply to all subdomains, unless overridden. Pages recommends adding a single CAA record for each of your Pages sites.

    site-a.example.gov.           299     IN      CAA     0 issue "letsencrypt.org"
    site-b.example.gov.           299     IN      CAA     0 issue "letsencrypt.org"

---

## Notify Pages
Once your DNS changes are complete, notify Pages support via:
- email: `pages-support@cloud.gov`
- Slack: `#cg-pages`

Someone from the Pages support team will assist you and make the updates to the Pages platform.

---

## Configure your custom domain
Before the platform can launch a custom domain for your site, you will need to configure the domain name and the branch name to prepare the site for the custom domain.

1. In the Pages web application, navigate to the **Custom Domains** page for your site by clicking on the `Custom Domains` link on the lefthand navigation:

2. Click the `Add new domain` button and enter the name of the custom domain into the `Domain Name` input and select the branch name you want to associate in the `Branch Context` input. 

    ![Site Custom Domain]({{ site.baseurl }}/assets/images/pages/custom-domain-create.png)

    *If you do not see the branch name in the `Branch Context` select, go to the **Site Settings** page and enter the branch name in the `Live site` or `Demo site` inputs under `Branch Configurations`.*

    ![Site Settings Branch Configurations]({{ site.baseurl }}/assets/images/pages/pages-site-settings-branch-config.png)

3. The Pages platform will be ready to launch your new custom domain so email the Pages team to complete launch of the custom domain.
