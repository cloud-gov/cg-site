---
menu:
  main:
    parent: deployment
title: Updating Cloud Foundry
---

Note: Grab something to eat and drink, this might take a while and an update shouldn't be left unattended.

1. SSH to jumpbox
1. Go into the CF release folder `cd ~/workspace/releases/cf-release`
1. Pull all the recent changes for that project `git pull`
1. Upload the releases you want to upgrade to. Do **not** skip releases if you want to go from 200 to 203 do the ones in between too. `bosh upload release releases/cf-201.yml`
1. Edit the `cf-deployment.yml` file in `~/workspace/deployments/18f/cf/` and update the `cf` version
1. Run `./generate`  in `~/workspace/deployments/18f/cf/`
1. Set the deployemnt target and deploy `bosh deployment manifest.yml && bosh deploy`
1. Follow the prompts carefully
