+++ 
date = "2018-10-22" 
title = "New S3 plan for sandboxes" 
+++

We are now offering plans for sandboxes that automatically clear your sandbox contents when your sandbox is cleared.  The reason for this change is to provide a more seamless experience.  In the past we had issues with users being notified of a sandbox purge even though the sandbox didn't get actually cleared.  This created confusion for the user.

Consequentially if you intend on storing important files in your sandbox you must implement some type of backup scheme.  

The only two plans available for your sandbox are `basic-sandbox` and `basic-public-sandbox`.  The behavior of these service plans is similar to `basic` and `basic-public` respectively with the only exception being that the buckets are cleared any time `cf delete-service SERVICE_INSTANCE` is ran on these plans.  