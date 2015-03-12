## Creating a user in Cloud Foundry

1. Get random password: `openssl rand -base64 15`
1. Create user: `cf create-user user@domain.com PASSWORD`
1. Assign user to space:
```
cf set-space-role user@domain.com ORG SPACE SpaceManager
cf set-space-role user@domain.com ORG SPACE SpaceDeveloper
```

For more information on space and org roles: http://docs.cloudfoundry.org/concepts/roles.html#roles
