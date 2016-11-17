---
menu:
  docs:
    parent: advanced
title: Moving apps between spaces
---

If you have an app that exists in one org/space but you need to move it to another:

1. Deploy the new application instance using the appropriate steps on the [cloning]({{< relref "docs/apps/cloning.md" >}}) page.
    * Make sure to run `cf target -o <NEW_ORG> -s <NEW_SPACE>` before running `cf push`.
    * If you keep the app name the same, you may need to use a different `host` to avoid route conflicts.
1. Go back to the old space.

    ```bash
    cf target -o <OLD_ORG> -s <OLD_SPACE>
    ```

1. If you are changing orgs, remove the [domain](https://docs.cloudfoundry.org/devguide/deploy-apps/routes-domains.html#delete-private-domain)/[route](https://docs.cloudfoundry.org/devguide/deploy-apps/routes-domains.html#delete-route).

    ```bash
    cf delete-domain <DOMAIN>
    # or
    cf delete-route <SHARED_DOMAIN> -n <HOST>
    ```

1. Go back to the new space.

    ```bash
    cf target -o <NEW_ORG> -s <NEW_SPACE>
    ```

1. If you changed orgs and are using a Domain, [re-create it]({{< relref "docs/apps/custom-domains.md" >}}).

    ```bash
    cf create-domain <DOMAIN>
    ```

1. Map the domain/route.

    ```bash
    cf map-route <APP_NAME> <DELEGATED_DOMAIN>
    # or
    cf map-route <APP_NAME> <SHARED_DOMAIN> -n <HOST>
    ```

1. Delete the old app.

    ```bash
    cf target -o <OLD_ORG> -s <OLD_SPACE>
    cf delete <APP_NAME>
    ```
