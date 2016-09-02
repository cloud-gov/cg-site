# Automated deployment

Uses [Concourse](http://concourse.ci/). To set up deployment, run the following from the top level of the repository:

```bash
# configuration
ORG=cloud-gov
SPACE=docs
USER=docs-deployer
PASS=...
FLY_TARGET=cloudgov
PIPELINE=deploy-docs

# set up the deployment environment
cf create-space $SPACE -o $ORG
cf create-user $USER $PASS
cf set-space-role $USER $ORG $SPACE SpaceDeveloper

cp ci/credentials.example.yml ci/credentials.yml

# edit the credentials
vim ci/credentials.yml

# deploy the pipeline
fly -t $FLY_TARGET set-pipeline -p $PIPELINE -c ci/pipeline.yml -l ci/credentials.yml
fly -t $FLY_TARGET unpause-pipeline -p $PIPELINE
fly -t $FLY_TARGET trigger-job -j $PIPELINE/deploy-production
```
