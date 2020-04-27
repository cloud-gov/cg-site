---
title: Code samples
parent: getting-started
layout: docs
sidenav: true
---

##  Java app   

#### Learn how to deploy a Java web application in your sandbox. 

##### Install the CloudFoundry command line interface (CLI)

Since cloud.gov is based on the open-source Cloud Foundry project, it uses the Cloud Foundry CLI. Download and install the CLI for your system:

* [Windows (64-bit)](https://cli.run.pivotal.io/stable?release=windows64&source=github)
* [Mac (64-bit)](https://cli.run.pivotal.io/stable?release=macosx64&source=github)
* [All Downloads](https://github.com/cloudfoundry/cli#downloads)

Test your install with following command:

`cf help`

#### Deploy the sample app

Now that you have your account and the CLI installed, let’s deploy a Java web application by downloading the application code, connecting to cloud.gov, and “pushing” the application.

##### Download the application code from 18F's GitHub repository

If you have Git installed:

`git clone https://github.com/18F/cf-sample-app-spring`

`cd cf-sample-app-spring`

If you don’t have Git installed, download [`master.zip`](https://github.com/18F/cf-sample-app-spring/archive/master.zip) from the repository, unzip `master.zip`, then:

`cd cf-sample-app-spring-master`

##### Connect to cloud.gov

`cf login -a https://api.fr.cloud.gov --sso`

Complete the login in your browser at [https://login.fr.cloud.gov/passcode](https://login.fr.cloud.gov/passcode). You’ll get a one-time passcode, which you then paste into your terminal.

##### Push the application

`cf push`

The `push` command will upload your sample app, prepare it for cloud.gov, then after a couple minutes tell you what URL to visit in your browser. Look for the `routes:` line, as in this example output:

`cf push`

```
Using manifest file ...

Creating app cf-spring in org / space
OK
...[snip]...
requested state:   started
**routes:          flask-example-fluent-okapi.app.cloud.gov**
last uploaded:     Tue 05 Mar 13:40:39 PST 2019
stack:             cflinuxfs3
buildpacks:        python

state     since #0   running   2017-12-02 12:53:29 PM
```

##### View your application

Use your browser to visit the `routes:` from the push command (in the above example, https://flask-example-fluent-okapi.app.cloud.gov). Your browser should display something like this:

{% asset cf-spring-sample-app.png alt="Cloud Foundry sample application" %}

Congratulations! You now have a running webapp built on the [Java Spring framework.](https://spring.io)

##### Exploring other cloud.gov features

Visit the dashboard — [https://dashboard.fr.cloud.gov/](https://dashboard.fr.cloud.gov/) — to see your options for managing your application via your browser.

View your application logs with `cf logs --recent` or with the web-based logviewer at [https://logs.fr.cloud.gov](https://logs.fr.cloud.gov)

If you’re done, you can delete your app by running `cf delete <APPNAME>` (it’s up to you whether to keep it running for more experiments or delete it).

##  Other languages   

### Try a simple "Hello world" app in .Net Core, PHP, Python, R, Ruby, NodeJS or Clojure in your sandbox. 

#### Install the CloudFoundry command line interface (CLI)

Since cloud.gov is based on the open-source Cloud Foundry project, it uses the Cloud Foundry CLI. Download and install the CLI for your system:

*   [Windows (64-bit)](https://cli.run.pivotal.io/stable?release=windows64&source=github)
*   [Mac (64-bit)](https://cli.run.pivotal.io/stable?release=macosx64&source=github)
*   [All Downloads](https://github.com/cloudfoundry/cli#downloads)

Test your install with following command:

`cf help`

#### Deploy a Hello World app

Now that you have your account and the CLI installed, let’s download the "Hello World" samples, choose one, connect to cloud.gov and "push" the application code.

##### Download the Hello World code examples from 18F's GitHub repository

If you have Git installed:

```
git clone https://github.com/18F/cf-hello-worlds
cd cf-hello-worlds
```

If you don’t have Git installed, download [`master.zip`](https://github.com/18F/cf-hello-worlds/archive/master.zip) from the repository, unzip `master.zip`, then:

`cd cf-hello-worlds-master`

##### Choose a framework

There are subdirectories for a number of different language + framework combinations. Choose an <example>, then

`cd <example>`

E.g., `cd python-flask`

Regardless of the framework you choose, the remaining steps are all the same.

##### Connect to cloud.gov

`cf login -a https://api.fr.cloud.gov --sso`

Complete the login in your browser at [https://login.fr.cloud.gov/passcode](https://login.fr.cloud.gov/passcode). You’ll get a one-time passcode, which you then paste into your terminal.

##### Push the application

`cf push`

The `push` command will upload your sample app, prepare it for cloud.gov, then after a couple minutes tell you what URL to visit in your browser. Look for the `routes:` line, as in this example output:

`cf push`

```
Using manifest file ...

Creating app dotnet-core in org / space
OK
...[snip]...
requested state:   started
**routes:          flask-example-fluent-okapi.app.cloud.gov**
last uploaded:     Tue 05 Mar 13:40:39 PST 2019
stack:             cflinuxfs3
buildpacks:        python

     state     since
#0   running   2017-12-02 12:53:29 PM
```

##### View your application

Use your browser to visit the `routes:` from the push command (in the above example, https://flask-example-fluent-okapi.app.cloud.gov). It should just display `Hello World from` and the name of your programming language example.

Congratulations! You now have a running web app built on the language and framework of your choice.

##### Exploring other cloud.gov features

Visit the dashboard — [https://dashboard.fr.cloud.gov/](https://dashboard.fr.cloud.gov/) — to see your options for managing your application via your browser.

View your application logs with `cf logs --recent` or with the web-based logviewer at [https://logs.fr.cloud.gov](https://logs.fr.cloud.gov)

If you’re done, you can delete your app by running `cf delete <APPNAME>` (it’s up to you whether to keep it running for more experiments or delete it).

### Additional resources

If you've run into any issues with these tutorials, please [Contact support at cloud.gov](mailto:support@cloud.gov). We're happy to help.

Did we miss a tip or useful resource that you think we should add? [Submit a suggestion on GitHub](https://github.com/18F/cg-site/issues/new) or [send us an email](mailto:inquiries@cloud.gov?subject=%5BSuggestion%5D%20&body=%0A%0A%0A%0ARefcode:%20quickstart).

#### Additional sample applications

*   [Drupal example](https://github.com/18F/cf-ex-drupal8/)
*   [WordPress example](https://github.com/18F/cf-ex-wordpress)
*   [Cloud Foundry community collection of sample applications](https://github.com/cloudfoundry-samples)
*   [SpringMusic: Java + any of MySQL, Oracle, Postgres or Redis](https://github.com/cloudfoundry-samples/spring-music)

#### Join the communities

*   [The public DevOps channel on 18F's Slack (sign up at chat.18f.gov).](https://chat.18f.gov/)
*   [Cloud Foundry communities (Slack, newsletters, mail lists)](https://www.cloudfoundry.org/community/)

Want more?
----------

Upgrade to a paid package to get full access to the platform and permanent spaces for hosting longer term demos and web applications in production. Email us at [inquiries@cloud.gov]({{site.inquiries_email}}) to learn more about what cloud.gov can do.