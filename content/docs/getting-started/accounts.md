---
menu:
  docs:
    parent: getting-started
title: Accounts
weight: -100
---

## To get access to cloud.gov

* **If you're in GSA or EPA:** You automatically have access and can log in.
* **If you're in FDIC:** Some FDIC staff automatically have access and can log in. If you get an error, contact the FDIC identity team to be added to the cloud.gov access group.
* **If you're outside GSA/EPA/FDIC and your team already uses cloud.gov:** Ask a teammate to [invite you]({{< relref "managing-teammates.md" >}}).
* **Otherwise:** If you have a U.S. federal email address and would like to try cloud.gov, you can [get access to a sandbox space]({{< relref "overview/pricing/free-limited-sandbox.md" >}}).

## To log into cloud.gov

### Agency single sign-on accounts

If you have a GSA, EPA, or FDIC email address, sign into cloud.gov using your agency credentials. Follow [these instructions to log in on the command line (CLI) and web UI (dashboard)]({{< relref "setup.md" >}}).

### cloud.gov accounts

If you were invited with an email address that isn't part of an agency with single sign-on authentication to cloud.gov, you have a cloud.gov account.

{{% govcloud %}}

Follow [these instructions to log in on the command line (CLI) and web UI (dashboard)]({{< relref "setup.md" >}}). When you log in to cloud.gov via a web browser, select the **cloud.gov** option.

<!--<img src="/img/cloud-gov-idp-button-cropped.png" alt="cloud.gov provider button to login page is highlighted in blue" width="373" height="187" />-->

Your cloud.gov account requires multi-factor authentication. To log into the system, you need two "factors" -- something you know (your password) and something you have on your person (your smartphone).

In order to perform multi-factor authentication, you need an authentication application that generates time-based one-time passcodes, such as [Google Authenticator](https://support.google.com/accounts/answer/1066447?hl=en) or [Authy](https://www.authy.com/app/mobile). Download the app on your mobile device. When you log into cloud.gov for the first time, follow the instructions to store the `cloud.gov` key in your application.
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
