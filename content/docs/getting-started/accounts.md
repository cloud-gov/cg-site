---
menu:
  docs:
    parent: getting-started
title: Get access to cloud.gov
weight: -100
---

## To get access to cloud.gov

* **If you're in GSA or EPA:** You automatically have access and can log in using your agency credentials.
* **If you're in FDIC:** Some FDIC staff automatically have access and can log in using agency credentials. If you try to log in and receive a "status message is null" error, contact the FDIC identity team to be added to the cloud.gov access group.
* **If you're in another agency:** If you have a U.S. federal government email address, you can [invite yourself](https://account.fr.cloud.gov/signup). This automatically gives you [a sandbox space]({{< relref "overview/pricing/free-limited-sandbox.md" >}}).
* **Otherwise:** If your team uses cloud.gov and you don't have a federal government email address (such as if you're a contractor), ask a teammate to [invite you]({{< relref "managing-teammates.md" >}}).

## To log into cloud.gov

### Agency single sign-on accounts

If you have a GSA, EPA, or FDIC email address, sign into cloud.gov using your agency credentials. Follow [these instructions to log in on the command line (CLI) and web UI (dashboard)]({{< relref "setup.md" >}}).

### cloud.gov accounts

If you were invited with an email address that isn't part of an agency with single sign-on authentication to cloud.gov, you have a cloud.gov account.

{{% govcloud %}}

Follow [these instructions to log in on the command line (CLI) and web UI (dashboard)]({{< relref "setup.md" >}}). When you log in to cloud.gov via a web browser, select the **cloud.gov** option.

<!--<img src="/img/cloud-gov-idp-button-cropped.png" alt="cloud.gov provider button to login page is highlighted in blue" width="373" height="187" />-->

Your cloud.gov account requires setting up both a password and an authentication application that generates token codes, such as [Google Authenticator](https://support.google.com/accounts/answer/1066447?hl=en) or [Authy](https://www.authy.com/app/mobile). (You can use any authentication application that supports the standard [Time-based One-Time Password algorithm](https://en.wikipedia.org/wiki/Time-based_One-time_Password_Algorithm).) When you log into cloud.gov for the first time, follow the instructions to set this up.

To change your password: if you're logged in, you can [change your password here](https://account.fr.cloud.gov/change-password). If you're logged out and forgot your password, you can [reset your password](https://account.fr.cloud.gov/forgot-password) to log in with a temporary password, then [change your password](https://account.fr.cloud.gov/change-password).

#### If you can't access your token codes

If you lose access to your authentication application (such as if you lose your phone), email [cloud.gov support](/help/) so that we can allow you to set up a new one. We'll follow this process to mitigate the risk of requests from compromised email addresses:

1. Delete the contents of your sandbox space (if you have one).
2. Remove your permissions to any other spaces and orgs.
3. For those spaces and orgs, notify the Space Managers and Org Managers that we've removed your access because of your request to reset your account's authentication application.
4. Reset your account's authentication application.
5. Let you know this is complete, so that you can set up a new authentication application and request access from your Space Managers and Org Managers again. It is their responsibility to verify that this is a legitimate request from you.

{{% /govcloud %}}

{{% eastwest %}}
Your cloud.gov account has a username and password. Follow [these instructions to log in on the command line (CLI) and web UI (dashboard)]({{< relref "setup.md" >}}).

You can [reset your own password](https://login.cloud.gov/forgot_password).
{{% /eastwest %}}

### Deployer accounts

{{% govcloud %}}
If you're using the [deployer account broker]({{< relref "docs/apps/continuous-deployment.md" >}}), you can delete and recreate that account to reset the credentials.
{{% /govcloud %}}

{{% eastwest %}}
For `ORGNAME_deployer` accounts, if you need the password reset, please contact [cloud.gov support](/help/), providing the account name with your request, and a member of the cloud.gov team will provide you with a new password.
{{% /eastwest %}}

## Use your account responsibly

Acceptable uses of cloud.gov include:

* Building and managing government digital services.
* Making and trying test systems to learn about how cloud.gov works.
* Activities contributing to the development of cloud.gov itself.

In order to help us keep cloud.gov secure, we require that you use your account appropriately. When you use cloud.gov, you agree that you'll respect these rules of behavior:

- Conduct only authorized business on the system.
- Maintain the confidentiality of your authentication credentials; a cloud.gov operator should never ask you to reveal them. We recommend using a password manager and strong credentials.
- Log out when you no longer need session access. Never leave your computer unattended while logged into cloud.gov.
- Report all security incidents or suspected incidents (such as improper or suspicious acts) related to cloud.gov systems and networks to [cloud.gov support](/help/).
- Safeguard system resources against waste, loss, abuse, unauthorized use or disclosure, and misappropriation.
- Don't process U.S. classified national security information on the system.
- Don't browse, search or reveal information hosted by cloud.gov except as required to perform your legitimate tasks or assigned duties.
- Don't retrieve information, or in any other way disclose information, for someone who does not have authority to access that information.
- Don't intentionally use a client that makes use of obsolete or insecure encryption algorithms.
- Don't configure your browser to ignore security warnings which may involve your connection with cloud.gov; report warnings that you can't explain to [cloud.gov support](/help/).
- If you believe you've been granted more access than necessary to perform your legitimate tasks or assigned duties, immediately notify [cloud.gov support](/help/).

If you use a cloud.gov account (instead of using an agency single sign-on account), you have an additional rule of behavior:

- Don't share your account with another person or create anonymous or group accounts. Your account is just for you.

Access to systems and networks owned by cloud.gov is governed by, and subject to, all federal laws, including, but not limited to, the Privacy Act, 5 U.S.C. 552a, if the applicable cloud.gov system maintains individual Privacy Act information. Access to cloud.gov systems constitutes consent to the retrieval and disclosure of the information within the scope of your authorized access, subject to the Privacy Act, and applicable state and federal laws.

Please contact [cloud.gov support](/help/) if you have questions about these rules or don't understand them.
