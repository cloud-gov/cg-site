+++
date = "2017-08-08"
title = "Announcement: cloud.gov accounts will migrate to OMB MAX"
+++

cloud.gov is migrating all users with native cloud.gov accounts (not users with an agency single sign on provider) to use OMB MAX for authentication to the platform. This page is a guide to what will change and how you can prepare for this transition.

## What’s changing?

Right now, there are two ways to log in to cloud.gov: either you use your agency’s credentials or a cloud.gov account. This change only affects users who have a cloud.gov account.

<img src="/img/login-old.png" alt="the current cloud.gov login screen" width="624" height="622" />

In September 2017, we will switch users with a cloud.gov account to use an OMB MAX account to log in to cloud.gov. We’re making this change both to increase the compliance of cloud.gov with federal standards and law and to make managing your account easier for you and your agency.

## What is OMB MAX?

OMB MAX is a governmentwide collaboration platform with an authentication system agencies can use to log in to other shared services. MAX.gov also enables using a PIV/CAC card to log in to web services.

Though we currently use multi-factor authentication for all cloud.gov accounts, switching to MAX accounts enables agencies which require PIV/CAC cards for login to use cloud.gov more easily. MAX also makes it easier for agencies to meet their own compliance requirements for users of cloud.gov by implementing single sign-on with agency services. For most users, this will provide a better user experience by not having a separate login and second factor to keep track of for cloud.gov.

## What does this mean for me?

If you already use your agency’s single sign-on (SSO) to log in to cloud.gov: there is nothing further you need to do. Currently agencies using SSO are EPA, GSA, and FDIC. These customers will continue to log in as usual.

**If you use a cloud.gov account and already have a MAX account**, double check that you can log in successfully to MAX and have a Secure+ SMS 2-factor device paired with your account.

**If you use a cloud.gov account to log in and don’t have a MAX account,** you need to create one. Once we switch, you’ll be required to use that account to login to cloud.gov and all associated services.

Create a MAX account by going to login.max.gov and clicking the green Register Now button in the top right corner or your agency’s logo. Make sure to add a 2-factor device to your account. The rest of this page has more detailed instructions for creating accounts if you need them.

### Log in to cloud.gov with MAX

Once you have an account, go to [*https://login.fr.cloud.gov*](https://login.fr.cloud.gov) and click on MAX.gov. This will take you to the MAX login page.

<img src="/img/login-max.png" width="358" height="358" />

**If you see your agency’s logo**, click it to sign in.

<img src="/img/login-federated.png" alt="the MAX login screen with federated login options highlighted" width="624" height="574" />

**If you don’t see your agency’s logo** and have a PIV/CAC card and a working reader, use your PIV/CAC card to login.

<img src="/img/login-pivcac.png" alt="the MAX login screen with the PIV/CAC login method highlighted" width="624" height="574" />

**If you don’t see your agency’s logo and don’t have a working card reader,** login with your MAX.gov user ID and password. Make sure to check “Use MAX Secure+ SMS 2-Factor” when you login.

<img src="/img/login-userid.png" alt="the MAX login screen with the user ID and password login method highlighted" width="624" height="574" />

### What about contractors?

Contractors with a federal agency email address (.gov or .mil) should be able to self-register just like federal employees. If there are contractors or others on your team without a government email address, you’ll need to [*contact OMB MAX directly*](https://max.gov/maxportal/home.action) to get accounts for them.

## Prepare for the switch

We’re currently testing MAX login on our staging environment. In September 2017, we plan to switch all cloud.gov accounts to MAX.

**Create a MAX account and make sure you have a 2-factor device paired with it.**

You can create your account anytime and it only takes a few minutes. We encourage you to create your account now so you’re prepared well in advance of the migration. Once we make the switch, login with your MAX account and your account, apps, spaces, and orgs should appear as normal.

When we switch in September you won’t be able to login with your cloud.gov account. If you don’t make a MAX account before then, your apps, orgs, and spaces will not go away but you won’t be able to login to either the dashboard or the CLI. Once you create a MAX account, you’ll regain access.

To summarize, here’s a breakdown of what you need to do to successfully transition:

**If** **your agency has integrated SSO with cloud.gov:**

You’re all set!

**If your agency logo is on the MAX login screen:**

Click the logo and make sure you can log in to MAX with your agency credentials.

**If you already have a MAX account:**

1. Make sure you can log in to MAX with your credentials.
1. Add a 2-factor device if you haven’t done so already.

**If you don’t already have a MAX account:**

1. Create a MAX account and register with your PIV/CAC card if you have a card reader.
1. Add a 2-factor device.
1. Make sure you can log in to MAX.

**If you’re a contractor without a federal email address**

1. Ask your agency sponsor to contact OMB MAX about getting you an account
1. Follow any direction from your agency sponsor
1. Make sure you can log in to MAX

We appreciate your patience and cooperation as we work to implement MAX authentication with cloud.gov.
