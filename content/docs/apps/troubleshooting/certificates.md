---
title: Troubleshooting TLS/SSL certificates
---

## Invalid name

_placeholder for broken certificate message in Chrome_

There are several issues that can cause a certificate error like this. The most
common error when working with cloud.gov is having an Invalid Name.

### Check the status of the CDN service

First, make sure your CDN service was created successfully.

    $ cf service my-cdn-route

_placeholder for cf service output_

If your CDN service is still provisioning, that is okay. It can take some time
to provision.

In order for the CDN service to provision successfully, you need to also create
a CNAME record in your DNS name server. We'll check that next.


### Check DNS settings and CNAME record

Next, check that your DNS settings for your custom domain. This should be a
CNAME record to the Cloud Front distribution name.

`dig` is a command line tool available on MacOS and Linux for querying DNS names.

    $ dig 18f.gsa.gov

{{< highlight plaintext "linenos=inline,hl_lines=13" >}}
; <<>> DiG 9.10.3-P4-Ubuntu <<>> 18f.gsa.gov
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 39759
;; flags: qr rd ra; QUERY: 1, ANSWER: 5, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4000
;; QUESTION SECTION:
;18f.gsa.gov.                   IN      A

;; ANSWER SECTION:
18f.gsa.gov.            300     IN      CNAME   d42vcigf8s480.cloudfront.net.
d42vcigf8s480.cloudfront.net. 60 IN     A       13.249.44.69
d42vcigf8s480.cloudfront.net. 60 IN     A       13.249.44.98
d42vcigf8s480.cloudfront.net. 60 IN     A       13.249.44.7
d42vcigf8s480.cloudfront.net. 60 IN     A       13.249.44.95

;; Query time: 83 msec
;; SERVER: 127.0.1.1#53(127.0.1.1)
;; WHEN: Thu Jan 31 14:03:12 PST 2019
;; MSG SIZE  rcvd: 146
{{< / highlight >}}

Notice line 13 shows the CNAME record pointing to the Cloud Front distribution.
This should match what your CDN service describes.


### Check the TLS/SSL configuration

You can test your server with [SSL Labs' SSL test](https://www.ssllabs.com/ssltest/). This will give you several hints as to what might be going on.

`openssl` is a command line tool available on MacOS and Linux that can be used to
debug TLS/SSL connections.

    $ echo | openssl s_client -servername 18f.gsa.gov -connect 18f.gsa.gov:443

{{< highlight plaintext "linenos=inline,hl_lines=6" >}}
CONNECTED(00000003)
depth=2 O = Digital Signature Trust Co., CN = DST Root CA X3
verify return:1
depth=1 C = US, O = Let's Encrypt, CN = Let's Encrypt Authority X3
verify return:1
depth=0 CN = 18f.gsa.gov
verify return:1
---
Certificate chain
 0 s:/CN=18f.gsa.gov
   i:/C=US/O=Let's Encrypt/CN=Let's Encrypt Authority X3
 1 s:/C=US/O=Let's Encrypt/CN=Let's Encrypt Authority X3
   i:/O=Digital Signature Trust Co./CN=DST Root CA X3
---
Server certificate
-----BEGIN CERTIFICATE-----
MIIFTzCCBDegAwIBAgISA0ZKMQB43wjmXDKV+4ekgsavMA0GCSqGSIb3DQEBCwUA
MEoxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MSMwIQYDVQQD
ExpMZXQncyBFbmNyeXB0IEF1dGhvcml0eSBYMzAeFw0xODEyMTIxNzMxMDRaFw0x
OTAzMTIxNzMxMDRaMBYxFDASBgNVBAMTCzE4Zi5nc2EuZ292MIIBIjANBgkqhkiG
9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqzcts4OTQ6kjuFZi18a1SC4alYR87K4B6ass
NZAalaVMR75b3r8xHZMRD7LAZbcFv09+2oNEl4VQ7MwaS+9RuV53j9n+lTqfgDCp
q2+ykLw5IV3cTqo7wl7JqxE/D71dWtpvtjD65NxSg3pURnU9USzuC2kExb32JRcK
aomeDd9/WympEioZTxRHgYFpUR0fJu6fxakGmTw5xNXeB4ugpRXK3M6EJKWMRtCX
dZRK0vKTQKfPUrbjSeX+YXq5pzDGLGVNJRVNM4/m5WWRygFSI1g3+zUseU5goss1
AA7XLjM+EuLSChfIe9tYn/UvZO/Zc8EJ9LEaiTnBmGu1Q3ID6QIDAQABo4ICYTCC
Al0wDgYDVR0PAQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcD
AjAMBgNVHRMBAf8EAjAAMB0GA1UdDgQWBBRmSb9OPXz9W8Z7gCp7BXzpLOMbuzAf
BgNVHSMEGDAWgBSoSmpjBH3duubRObemRWXv86jsoTBvBggrBgEFBQcBAQRjMGEw
LgYIKwYBBQUHMAGGImh0dHA6Ly9vY3NwLmludC14My5sZXRzZW5jcnlwdC5vcmcw
LwYIKwYBBQUHMAKGI2h0dHA6Ly9jZXJ0LmludC14My5sZXRzZW5jcnlwdC5vcmcv
MBYGA1UdEQQPMA2CCzE4Zi5nc2EuZ292MEwGA1UdIARFMEMwCAYGZ4EMAQIBMDcG
CysGAQQBgt8TAQEBMCgwJgYIKwYBBQUHAgEWGmh0dHA6Ly9jcHMubGV0c2VuY3J5
cHQub3JnMIIBBQYKKwYBBAHWeQIEAgSB9gSB8wDxAHYAVYHUwhaQNgFK6gubVzxT
8MDkOHhwJQgXL6OqHQcT0wwAAAFno6/F6gAABAMARzBFAiEA8gVMlgH9ASijOGaR
irK5FIc5LjFHZxFckLS79QD1n5oCICic0/5Yw3Kp4kAdi+vGvQvlRr7eon20Opqo
+CfS1yKoAHcAKTxRllTIOWW6qlD8WAfUt2+/WHopctykwwz05UVH9HgAAAFno6/I
JQAABAMASDBGAiEAhQGSLd9dwfRBbLQoIzWIDwla/pwffIHtQkBitWzAq2ACIQCO
gpuA/uIl14UDwqXkESs4Ed1KtiXkxcGvK2Vvb4DPSjANBgkqhkiG9w0BAQsFAAOC
AQEAj6i4/pebu2BnN4o53CCjX+mhu9qrM+zWCDyUvwVxJJtHVm+QW3HNi7Nl4Kch
ZCKCr1RtsRcMbh8y2rbTGjMQK0OWMs/IZcQvmSAyBENKoLXkSv9mGrmd06Ivy1g5
+rtP9C3jWk0sMcPL2A3XRoa0rz8NNgre0sczwx0X65w0sobZIzZGU9LtqU4LyD/+
5LnlLPTR4NqUI4MKOx9yJAH+7sQRaPCfE34h/oa3XsD3g3b+gp+WaD5qaDeNDPta
wEf3Sc16PJ3hQ/lx4eZabi5CgxckCJTiA9kuFLSmjEvVc3nkyVF4cG72ko+J2v6G
baYnWWMzIuyHOkdFkpULPIiuMg==
-----END CERTIFICATE-----
subject=/CN=18f.gsa.gov
issuer=/C=US/O=Let's Encrypt/CN=Let's Encrypt Authority X3
---
No client certificate CA names sent
Peer signing digest: SHA512
Server Temp Key: ECDH, P-256, 256 bits
---
SSL handshake has read 3214 bytes and written 451 bytes
---
New, TLSv1/SSLv3, Cipher is ECDHE-RSA-AES128-GCM-SHA256
Server public key is 2048 bit
Secure Renegotiation IS supported
Compression: NONE
Expansion: NONE
No ALPN negotiated
SSL-Session:
    Protocol  : TLSv1.2
    Cipher    : ECDHE-RSA-AES128-GCM-SHA256
    Session-ID: 923B09A945854EF2940F5D8E6CF246592F231B886E8041D699F6728FE9DB4D43
    Session-ID-ctx:
    Master-Key: 469A5B3082FF727F5044D5E21A9A629E26CADA79DDB7C0B120E0C6A3269617568145F1A15854AEA47153CE36D00D8720
    Key-Arg   : None
    PSK identity: None
    PSK identity hint: None
    SRP username: None
    TLS session ticket lifetime hint: 10800 (seconds)
    TLS session ticket:
    0000 - 1f cd d3 8d 69 b6 5f e8-0e 59 92 ba 19 02 17 c0   ....i._..Y......
    0010 - fc 13 d4 7b 90 14 74 48-b8 59 a3 e4 66 67 b0 fc   ...{..tH.Y..fg..
    0020 - d3 07 ae 06 53 e7 3c 73-f7 b2 60 e7 83 69 06 fe   ....S.<s..`..i..
    0030 - ee 63 d6 65 e9 e6 35 9f-d3 ad ba 76 e3 0a e3 3f   .c.e..5....v...?
    0040 - 2e 60 91 7d d1 fd d5 c0-76 f8 3c 8b ca e0 73 28   .`.}....v.<...s(
    0050 - d9 c1 c9 bf 9e 98 53 f2-fd d7 6a 35 dc 02 f3 17   ......S...j5....
    0060 - c3 f0 73 75 e7 b2 1d 06-01 f3 52 79 a7 fb a4 b0   ..su......Ry....
    0070 - 5b d2 4e 41 e9 07 b6 55-20 f4 d8 27 95 b8 08 2e   [.NA...U ..'....
    0080 - 55 81 00 a9 ed 7a 01 32-3c 2e fb e2 15 14 b6 a8   U....z.2<.......
    0090 - 77 79 34 88 ba 45 90 1f-67 a4 0d 35 39 54 a7 ce   wy4..E..g..59T..
    00a0 - 53 a0 c0 b5 7f 18 90 91-0a 49 0a 14 47 57 36 e2   S........I..GW6.

    Start Time: 1548973152
    Timeout   : 300 (sec)
    Verify return code: 0 (ok)
---
DONE
{{< / highlight >}}

The first few lines are the most important, they show the certificate chain.
The lowest depth (0) should have a common name (CN) that matches your custom
domain.

If instead of seeing your custom domain, you see the Cloud Front distribution
here, it means the CDN service has not yet provisioned a certificate for your
custom domain. Check `cf service` for the current status.

If the CDN service broker has timed out, you may need to delete and re-create
the CDN service.


## Invalid date

The certificate has expired and needs to be re-provisioned. Cloud.gov should
take care of this automatically. If you are seeing this error, please [get in
touch]({{< relref "docs/help.md" >}}#support-for-people-who-use-cloud-gov).
