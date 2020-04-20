--- 
layout: post
date: "2018-10-22" 
title: "New S3 plan for sandboxes" 
redirect_from:
  - /updates/2018-10-22-s3-sandbox-plan/
---

In the past, we've had issues with users being notified of a sandbox purge even though the sandbox didn't actually get cleared. So in order to provide a more seamless experience, cloud.gov now offers S3 service plans for sandboxes that automatically clear your S3 contents whenever your sandbox is cleared. 

As a result, if you intend on storing important files in your sandbox, **you must implement some type of backup scheme**.  

The two plans available for your sandbox are `basic-sandbox` and `basic-public-sandbox`. The behavior of these service plans is the same as `basic` and `basic-public` respectively, with the only exception being that the buckets are cleared any time `cf delete-service SERVICE_INSTANCE` is run on these plans.  
