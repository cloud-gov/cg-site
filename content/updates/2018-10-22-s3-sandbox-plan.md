+++ 
date = "2018-10-22" 
title = "New S3 plan for sandboxes" 
+++

We are now offering S3 service plans for sandboxes that automatically clear your S3 contents when your sandbox is cleared.  The reason for this change is to provide a more seamless experience.  In the past we had issues with users being notified of a sandbox purge even though the sandbox didn't get actually cleared.  

Consequentially if you intend on storing important files in your sandbox you must implement some type of backup scheme.  

The only two plans available for your sandbox are `basic-sandbox` and `basic-public-sandbox`.  The behavior of these service plans is the same as `basic` and `basic-public` respectively with the only exception being that the buckets are cleared any time `cf delete-service SERVICE_INSTANCE` is ran on these plans.  