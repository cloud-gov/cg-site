---
parent: services
layout: docs
sidenav: true
title: Application AutoScaler
name: "app-autoscaler"
description: "Cloud Foundry App-AutoScaler: scale number of application instances based on metrics"
status: "Beta"
---

We are pleased to introduce App-AutoScaler to the platform. [Cloud.gov](https://www.cloud.gov/) has always made it easy to handle increased traffic by scaling your application memory or instances with a single command. With App-Autoscaler, responding to changes in traffic and resource usage is now even easier.

App-AutoScaler adjusts the number of application instances automatically based on metrics like memory used, throughput, and response time. You can also set up a schedule to scale your application instance count at preset times. 

Set a Scaling Policy for the application based on built-in dynamic or custom metrics and App-AutoScaler will scale the number of application instances within the boundary of your organization's memory quota.


## Pricing

$5000/annually, memory quotas are still enforced. More information can be found on the [pricing page]({{ site.baseurl }}{% link _pages/pricing.md %}).

## Plans

Service Name | Plan Name | Description | 
------------ | --------- | ----------- | 
`app-autoscaler` | `autoscaler-free-plan` | Automatically increase or decrease the number of application instances based on a policy you define. | 

If your organization does not have access to the `app-autoscaler` service in the Cloud Foundry Marketplace (`cf marketplace`), please contact [inquiries@cloud.gov]({{ site.inquiries_email }}) to arrange for a modification to your inter-agency agreement.


## Scalable Metric Types

The following are the built-in metrics that you can use to scale the number of application instances. A metric's values are averaged over all the instances of the application.

Metric Type | Unit of Measure | Description |
----------- | --------------- | ----------- |
`memoryused` | MB | The absolute value of the used memory of the application
`memoryutil` | Percentage | The percentage of used memory compared to the total memory allocated (organization memory quota).  For example, if the memory usage of the application is 100MB and memory quota is 200MB, the value of "memoryutil" is 50%.
`cpu` | Percentage | cpu usage of the application
`cpuutil` | Percentage | Experimental and not enabled currently
`disk` | MB | The absolute value of the used ephemeral disk by the application
`diskutil` | Percentage | The percentage of ephemeral disk used by application instances
`responsetime` | "ms" (milliseconds) | The average amount of time the application takes to respond to a request in a given time period
`throughput` | "rps" (requests per second) | The total number of the processed requests in a given time period
custom | User Provided | You can define your own metric name and emit the metric to App-AutoScaler to trigger dynamic scaling. More on this is below.


## Basic Usage

Let's assume there is an application which needs to be scaled up to two application instances if the disk utilization goes above 60% and scale back down if goes below that value. Using the App-Autoscaler only requires a few steps to use:

 - Push an app
 - Create a Service Instance of App-AutoScaler
 - Create Scaling Policy JSON
 - Bind the Service Instance to the application and provide the Scaling Policy JSON

```bash
# Push a copy of the application
cf push my_app

# Create a service instance of app-autoscaler called "my-autoscaler-service-instance"
cf create-service app-autoscaler autoscaler-free-plan my-autoscaler-service-instance -b autoscaler 

# Bind the service instance to the application and specify the Scaling Policy
cf bind-service my_app my-autoscaler-service-instance -c '{"instance_min_count":1,"instance_max_count":2,"scaling_rules":[{"metric_type":"diskutil","breach_duration_secs":60,"threshold":60,"operator":">=","cool_down_secs":60,"adjustment":"+1"},{"metric_type":"diskutil","breach_duration_secs":60,"threshold":30,"operator":"<","cool_down_secs":60,"adjustment":"-1"}]}'
```

App-AutoScaler will monitor the application at ~40s intervals and scale the application instances based on the Scaling Policy defined.

## Creating a Scaling Policy

The Scaling Policy defines the rules of how, why and when to scale application instances in JSON format.  Using the example from the previous section, a more human readable format would be:


```JSON
{
    "instance_min_count":1,        
    "instance_max_count":2,
    "scaling_rules":
    [
        {
            "metric_type":"diskutil",
            "threshold":60,
            "operator":">=",
            "adjustment":"+1",
            "breach_duration_secs":60,
            "cool_down_secs":60
        },
        {
            "metric_type":"diskutil",
            "threshold":30,
            "operator":"<",
            "adjustment":"-1",
            "breach_duration_secs":60,
            "cool_down_secs":60
        }
    ]
}
```

The top level keys used to define a Scaling Policy are:

 - `instance_min_count` - The minimum number of application instances that can be scaled down to. This integer value cannot be less than 1. This key/value is required.
 - `instance_max_count` - The maximum number of application instances that can be scaled up to.  This integer value has no upper boundary but cannot be greater than the organization quota for memory allows for at the time of scaling.  This key/value is required.
 - `scaling_rules` - This is an array of Scaling Rules, at least one block is required:
   - `metric_type` - One of "Scalable Metric Types" like `cpu` or `memoryused`
   - `threshold` - The boundary when metric value exceeds is considered as a breach, always an integer value.
   - `operator` - `>`, `<`, `>=`, `<=`
   - `adjustment` - Describes how the number of application instances will be changed.  Support regex format `^[-+][1-9]+[0-9]*[%]?$`, i.e. +5 means adding 5 instances, -50% means shrinking to the half of current size.  
   - `breach_duration_secs` - The time duration (integer value in seconds) to fire a scaling event if it keeps breaching. Spikes above the `threshold` that are for less than `breach_duration_secs` are thus ignored.
   - `cool_down_secs` - The time duration (integer value in seconds) to wait before the next scaling kicks in.   


## Recurring and Specific Schedules

There is a fourth optional top level Scaling Policy key called `Schedules`:

 - App-AutoScaler uses schedules to overwrite the default instance limits for specific time periods and is primarily used to prepare enough instances for peak hours.
 - During these time periods all dynamic scaling rules are still in effect.
 - You can define recurring schedules, or specific schedules which are executed only once.
 - In addition to overriding the default instance limit of `instance_min_count` and `instance_max_count`, you can also define an `initial_min_instance_count` in the schedule.



### Recurring Schedule

| Name                                 | Type                | Required| Description                                                                             |
|:-------------------------------------|---------------------|---------|-----------------------------------------------------------------------------------------|
| start_date                           | String,"yyyy-mm-dd" | false   | the start date of the schedule. Must be a future time.                                  |
| end_date                             | String,"yyyy-mm-dd" | false   | the end date of the schedule. Must be a future time.                                    |
| start_time                           | String,"hh:mm"      | true    | the start time of the schedule                                                          |
| end_time                             | String,"hh:mm"      | true    | the end time of the schedule                                                            |
| days_of_week / days_of_month         | Array<int>          | false   | recurring days of a week or month. Use [1,2,..,7] or [1,2,...,31] to define it          |
| instance_min_count                   | int                 | true    | minimum number of instance count for this schedule                                      |
| instance_max_count                   | int                 | true    | maximum number of instance count for this schedule                                      |
| initial_min_instance_count           | int                 | false   | the initial minimal number of instance count for this schedule                          |

### Specific Date

| Name                                 | Type                       | Required| Description                                                                |
|:-------------------------------------|----------------------------|---------|----------------------------------------------------------------------------|
| start_date_time                      | String,"yyyy-mm-ddThh:mm"  | true    | the start time of the schedule. Must be a future time                      |
| end_date_time                        | String,"yyyy-mm-ddThh:mm"  | true    | the end time of the schedule. Must be a future time                        |
| instance_min_count                   | int                        | true    | minimum number of instance count for this schedule                         |
| instance_max_count                   | int                        | true    | maximum number of instance count for this schedule                         |
| initial_min_instance_count           | int                        | false   | the initial minimal number of instance count for this schedule             |



The above JSON key/value pair information is sourced from: https://github.com/cloudfoundry/app-autoscaler-release/blob/main/docs/policy.md#schedules

### Specific Schedule Example

The Scaling Policy below has been manipulated to be artificially low to result in the application scaling to 4 application instances during a 30 minute window:

```JSON
{
  "instance_min_count": 1,
  "instance_max_count": 4,
  "scaling_rules":
  [
   {
    "metric_type": "memoryused",
    "breach_duration_secs": 60,
    "threshold": 0,
    "operator": ">",
    "cool_down_secs": 60,
    "adjustment": "+1"
   }   
  ],
  "schedules": {
    "timezone": "America/New_York",
    "specific_date": [
      {
        "start_date_time": "2024-04-23T16:30",
        "end_date_time": "2024-04-23T17:00",
        "instance_min_count": 1,
        "instance_max_count": 4,
        "initial_min_instance_count": 2
      }
    ]
  }
}
```

An additional complex example of combining Scaling Rules, and both types of Schedules (recurring and specific) can be found at [https://github.com/cloudfoundry/app-autoscaler-release/blob/main/docs/assets/fullpolicy.json](https://github.com/cloudfoundry/app-autoscaler-release/blob/main/docs/assets/fullpolicy.json).

### Scheduling Constraint

If one schedule overlaps another, the one which **starts** first will be guaranteed, while the later one is completely ignored. For example:

    - Schedule #1:  --------sssssssssss----------------------------
    - Schedule #2:  ---------------ssssssssssssss-----------------
    - Schedule #3:  --------------------------sssssssss------------

    With the above definition, schedule #1 and #3 will be applied, while schedule #2 is ignored.

## Custom Metrics

### What are custom metrics?

You can define your own metric name and emit that metric to App-AutoScaler to trigger dynamic scaling. 

To scale with a custom metric, the application needs to emit its own metric to App-AutoScaler's MetricsForwarder URL. Since the metric is sent from the application to App-AutoScaler, an App-AutoScaler specific service instance credential is required to authorize the access.  



{% mermaid_diagram id-prefix="Figure-2.-custom-metrics-data-flow" %}
graph LR
    subgraph App-AutoScaler
        E[MetricsForwarder]
    end

    subgraph CF
        C[My App] -->|POST to /v1/apps/app_guid/metrics| E[MetricsForwarder]
    end
{% endmermaid_diagram %}

An example Scaling Policy using a custom metric is:

```
{
  "instance_min_count": 1,
  "instance_max_count": 5,
  "scaling_rules": [
    {
      "metric_type": "my_custom_metric",
      "threshold": 100,
      "operator": ">",
      "adjustment": "+1"
    }
  ]
}
```

When naming a custom metric, only alphabet letters, numbers and "_" are allowed. A metric name is limited to 100 characters.


### Configuring Application Security Groups 

In order to use custom metrics, the Application Security Group which is bound to a Cloud Foundry space and organization must allow for public egress. Cloud.gov provides a [predefined application security group named `public_networks_egress`](https://cloud.gov/docs/management/space-egress/) which can be used to allow egress from the application running on Cloud Foundry back to App-AutoScaler. 

This command can be run to configure egress:

```bash
cf bind-security-group public_networks_egress my_org --space my_space
```

If only built-in dynamic metrics are being used (ie: `cpu`, `memoryused`, `disk`), Application Security Groups do not need to be configured.  This is only required for the usage of custom metrics.

### Finding and Using App-AutoScaler specific service instance credentials

When a service instance of App-AutoScaler is bound to an application, the username and password credentials along with App-AutoScaler URL are injected into `VCAP_SERVICES `directly and can be viewed by running:

```bash
cf curl "/v3/apps/$(cf app --guid my_app/env)" | jq -r '.system_env_json.VCAP_SERVICES.["app-autoscaler"][0].credentials.custom_metrics' 
```

This will emit output similar to:

```JSON
{
  "username": "8537b15d-aaaa-1234-56cb-bf269173edb9",
  "password": "31269d3e-bbbb-3456-7384-5067aea2b0d1",
  "url": "https://app-autoscalermetrics.fr.cloud.gov",
  "mtls_url": "https://app-autoscaler-metricsforwarder-mtls.fr.cloud.gov"
}
```

The app_guid will also be needed:

```bash
cf app --guid my_app

c3a1b301-2072-41a9-8d04-92a47e290210
```

The application will need to use the username, password and url to emit a metric to App-AutoScaler in the format:

```bash
curl -u "$username:$password" \
"https://$url/v1/apps/$app_guid/metrics" \
-X POST \
-H "Content-Type: application/json" \
--data @- <<END;
{
"instance_index": 0,
"metrics": [{
"name": $metric_name,
"value": ,
"unit": ""
}]
}
END
```

An example of doing this manually is:

```bash
cf ssh my_app

curl -u "8537b15d-aaaa-1234-56cb-bf269173edb9:31269d3e-bbbb-3456-7384-5067aea2b0d1" \
"https://app-autoscalermetrics.fr.cloud.gov/v1/apps/c3a1b301-2072-41a9-8d04-92a47e290210/metrics" \
-X POST \
-H "Content-Type: application/json" \
--data @- <<END;
{
"instance_index": 0,
"metrics": [{
"name": "my_custom_metric",
"value": 142,
"unit": "oranges"
}]
}
END
```

Once the application sends the metric value (142) to App-AutoScaler's MetricsForwarder URL, the application will be scaled to two application instances since `"threshold": 100` as defined in the Scaling Policy for `my_custom_metric`.

## Using CF CLI Autoscaler Plugin

To gain more insight and view the audit trail of scaling the number of application instances up and down, there is a CF plugin which can be installed:

```
cf install-plugin -r CF-Community app-autoscaler-plugin
cf autoscaling-api https://app-autoscaler.fr.cloud.gov
```

Once the plugin is installed you can view the scaling history of an application by running:

```
cf autoscaling-history my_app

Retrieving scaling event history for app my_app...
Scaling Type            Status          Instance Changes        Time                            Action                                                          Error     
dynamic                 succeeded       2->1                    2024-04-20T15:38:09-04:00       -1 instance(s) because cpu <= 10percentage for 60 seconds            
dynamic                 succeeded       1->2                    2024-04-20T15:36:09-04:00       +1 instance(s) because cpu > 11percentage for 60 seconds 
dynamic                 succeeded       2->1                    2024-04-20T13:48:09-04:00       -1 instance(s) because cpu <= 10percentage for 60 seconds            
dynamic                 succeeded       3->2                    2024-04-20T13:46:09-04:00       -1 instance(s) because cpu <= 10percentage for 60 seconds            
dynamic                 succeeded       4->3                    2024-04-20T13:44:09-04:00       -1 instance(s) because cpu <= 10percentage for 60 seconds            
dynamic                 succeeded       6->4                    2024-04-20T13:42:09-04:00       -2 instance(s) because limited by max instances 4                    
```

To see the CPU metrics for which the scaling up and down was decided upon, run:

```
cf autoscaling-metrics my_app cpu

Retrieving aggregated cpu metrics for app my_app...
Metrics Name            Value                   Timestamp     
cpu                     1percentage             2024-04-20T14:02:48-04:00     
cpu                     1percentage             2024-04-20T14:02:08-04:00     
cpu                     1percentage             2024-04-20T14:01:28-04:00     
cpu                     1percentage             2024-04-20T14:00:48-04:00   
...
```

To see the current policy used for the service instance, run:

```
cf autoscaling-policy my_app

Retrieving policy for app my_app...
{
        "instance_min_count": 1,
        "instance_max_count": 4,
        "scaling_rules": [
                {
                        "metric_type": "cpu",
                        "breach_duration_secs": 60,
                        "threshold": 10,
                        "operator": "<=",
                        "cool_down_secs": 60,
                        "adjustment": "-1"
                },
                {
                        "metric_type": "cpu",
                        "breach_duration_secs": 60,
                        "threshold": 50,
                        "operator": ">",
                        "cool_down_secs": 60,
                        "adjustment": "+1"
                }
        ]
}
```

A complete list of all of the commands the plugin supports, along with instructions to compile the plugin from source can be found at [https://github.com/cloudfoundry/app-autoscaler-cli-plugin/blob/main/README.md](https://github.com/cloudfoundry/app-autoscaler-cli-plugin/blob/main/README.md).


## Updating a Scaling Policy 

### Attach a new policy using App-AutoScaler Plugin

Create or update autoscaling policy for your application with:
```
	 cf aasp <app_name> <policy_file_name>
```

### Detach policy using App-AutoScaler Plugin

Remove autoscaling policy to disable App-AutoScaler with:
```
	 cf dasp <app_name>
```

### View policy using App-AutoScaler Plugin

To retrieve the current Scaling Policy:
```
	 cf asp <app_name>
```

### Updating policy without the App-AutoScaler Plugin

To update an existing Scaling Policy used by a service instance bound to an application:

 - Unbind the service instance from the app:

   ```bash
   cf unbind-service my_app my-autoscaler-service-instance
   ```

 - Bind the service instance to the application with the new Scaling Policy JSON file:

   ```bash
   cf bind-service my_app my-autoscaler-service-instance -c new-scaling-policy-file.json
   ```

 - If using custom metrics, restage the application so the new autoscaler credentials are imported to the application:

   ```bash
   cf restage my_app
   ```

## Quota Enforcement

App-AutoScaler cannot scale the number of application instances past what the organization's memory quota definition is set to.

For example, if the memory quota is set to 5GB and an application has five 1GB application instances, a sixth application instance cannot be added with the `cf scale -i 6 my_app` command or an App-Autoscaler Scaling Policy with `"instance_max_count": 6,` defined.  The Cloud Foundry API will enforce organization quota limits regardless of the client requesting the additional resources.

To query your application's scaling events to look for quota issues, use the command below:


```
cf autoscaling-history my_app

Retrieving scaling event history for app my_app...
Scaling Type            Status          Instance Changes        Time                            Action                                                  Error     
dynamic                 failed                                  2024-05-07T14:37:34-04:00       +1 instance(s) because cpu < 50% for 60 seconds         failed to set app instances: failed scaling app 'c3a1b301-2072-41a9-8d04-92a47e290210' to 6: failed POST-ing cf.Process: POST request failed: cf api Error url='', resourceId='': ['CF-UnprocessableEntity' code: 10008, Detail: 'memory quota_exceeded']     
dynamic                 failed                                  2024-05-07T14:36:34-04:00       +1 instance(s) because cpu < 50% for 60 seconds         failed to set app instances: failed scaling app 'c3a1b301-2072-41a9-8d04-92a47e290210' to 6: failed POST-ing cf.Process: POST request failed: cf api Error url='', resourceId='': ['CF-UnprocessableEntity' code: 10008, Detail: 'memory quota_exceeded']     
```

The error `memory quota_exceeded` is also seen when manually scaling the application:

```
cf scale -i 6 my_app

Scaling app my_app in org my_org / space my_space as johnqpublic...

memory quota_exceeded
FAILED
```

Contact [inquiries@cloud.gov]({{ site.inquiries_email }}) to purchase additional organization quota memory or [support@cloud.gov]({{ site.support_email }}) to reduce the memory resources consumed by the applications.



## Are you ready to use App-AutoScaler?  

Contact [inquiries@cloud.gov]({{ site.inquiries_email }}) to add this feature!

