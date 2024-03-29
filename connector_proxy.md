# Connector Proxy

## Overview

A `Connector Proxy` provides discoverable endpoints that are designed for use by `Service Tasks` in BPMN diagrams which are authored and executed by `spiff-arena`. These endpoints provide a means to configure integrations to external systems. Some examples include talking to `BambooHR`, `Coin Gecko`, `Xero` - or even a PostgreSQL database managed outside of `spiff-arena`.

## Discoverability

The discoverability of the services provided by a Connector Proxy are driven from the following endpoints:

| Endpoint | Use |
|----|----|
| /v1/commands | Lists all commands that the proxy provides, along with their parameters |
| /v1/auths | Lists all authentications that the proxy provides |

When a `Service Task` is added to a BPMN diagram in `spiff-arena` the `/v1/commands` endpoint is used to populate a dropdown list of all available commands. Once a command is selected from the list the diagram author is then allowed to configure each paramter that needs to be provided to make the call. An example `/v1/commands` response that would be used to configure a `Service Task` that makes an http get request:

```
{
  "id": "http/GetRequest",
  "parameters": [
    {
      "id": "url",
      "type": "str",
      "required": true
    },
    {
      "id": "headers",
      "type": "any",
      "required": false
    },
    {
      "id": "params",
      "type": "any",
      "required": false
    },
    {
      "id": "basic_auth_username",
      "type": "str",
      "required": false
    },
    {
      "id": "basic_auth_password",
      "type": "str",
      "required": false
    }
  ]
}
```

In this example only a string `url` needs to be provided. The params `headesrs` and `params` are marked as `any` due to the limitation that only scalar types are described at this point. This would be a nice TODO for a future version.

When logged in to `spiff-arena` with the appropriate permissions the `/v1/auths` endpoint is used to show a table of all systems that the application can authenticate with. For example a Connector Proxy could return an `auths` response such as:

```
[{"id": "xero/OAuth", "parameters": []}]
```

This indicates that it can authenticate with `Xero` using `OAuth`.

## Execution

When a `Service Task` is executed by the back-end of `spiff-arena` an http post request is done to the `/v1/do` endpoint providing the `id` of the command along with a `json` payload containing all the evaluated parameters that were configured by the BPMN diagram author. The response from the Connector Proxy is then put into the workflow using the configured (or defaulted) response variable.

## High Level Design Theory and Some History

From the outset the high level design goals of the Connector Proxy, in no particular order, were:

1. Separate dependencies from `spiff-arena`
2. Separate client specific integration/logic from `spiff-arena`
3. Provide a uniform way for BPMN diagram authors to configure communication to external systems
4. Provide a back door by which required logic, that was outside the pervue of pure workflow execution, could be performed
5. Allow for such logic to be implemented by those not intimately familiar with BPMN
6. Allow for communication with pre-existing apis/sdks that may not be written in Python

From these design goals a quick and dirty implementation was pushed that made each `connector` a separate "project" that was integrated into the larger connector proxy via local packages. All connectors were written in Python and things generally worked well for a single implementation. The downside was all the logic to form the generic  `/v1/{auths,commands}` and perform `/v1/do/` was tightly coupled in the implementation. Creating a second Connector Proxy would mean starting from scratch (or more likely copy/pasting). At this point `at danfunk ` created `spiffworkflow-proxy` which factored out the discovery and routing logic into a reusable blueprint. Once this refactor was available several Connector Proxy implemenations emerged.

## Current Integration

At time of writing `spiff-arena` can be configured to communicate with any Connector Proxy by providing its url when the application starts. Practically speaking this means either the demo proxy or a client specific connector proxy. To date this configuration parameter has worked very well. The front-end supports configuring connectors and the back-end makes the calls.

## The Type Ahead Can of Worms

A recent requirement called for allowing `User Task` forms to be configured with a widget to allow type ahead auto-completion.





