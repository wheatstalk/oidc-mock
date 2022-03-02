# OIDC Mock

A CDK construct that sets up an OIDC Identity Provider REST API for integration testing.

## Features
* Passwordless Authorization Code Flow
* Unrestricted `redirect_uri`
* Convention-based `client_id` / `client_secret`
* PKCE verification for `S256` and `plain`
* Authorization code grant
* Client credentials grant
* Username grant
* Refresh token grant

## Scopes

| Scope            | Description                   |
|------------------|-------------------------------|
| `openid`         | Enable OIDC and provide a JWT |
| `offline_access` | Enable provide refresh tokens |

## Usage

```ts
import { App, Stack, CfnOutput } from 'aws-cdk-lib';
import { OidcMockApi, OidcMockTable } from '@wheatstalk/oidc-mock';

const app = new App();
const stack = new Stack(app, 'integ-oidc-mock');

const mockApi = new OidcMockApi(stack, 'OidcMockApi');

new CfnOutput(stack, 'OidcMockApiUrl', {
  value: mockApi.openidConfigurationUrl,
});

app.synth();
```

## Mock endpoint addresses

| Path                                | Description                                      |
|-------------------------------------|--------------------------------------------------|
| `/auth`                             | Authorization endpoint                           |
| `/token`                            | Token endpoint                                   |
| `/userinfo`                         | User info endpoint (planned)                     |
| `/.well-known/openid-configuration` | OpenID auto-configuration endpoint               |
| `/.well-known/jwks.json`            | JWKS endpoint (crypto signature keyset for JWTs) |