# OIDC Mock

Want to test OIDC authorization code flow during local development, but don't
want to spin up a local Keycloak, set up an Auth0, or Cognito IdP? Then this
prototype OIDC mock service is for you.

Features:

* Publicly hosted
* Open for anyone to use
* Supports authorization code flow
* No login screen
* No restrictions on redirect uri, so use localhost or whatever you want
* Does not authenticate client credentials, so you can commit dummy credentials if you use this in an integration test.

## Mock endpoint addresses

| Description             | Link                                                             |
|-------------------------|------------------------------------------------------------------|
| OIDC Discovery Endpoint | https://oidc-mock.wheatstalk.ca/.well-known/openid-configuration |
| JWKS endpoint           | https://oidc-mock.wheatstalk.ca/.well-known/jwks.json            |
| Authorize Endpoint      | https://oidc-mock.wheatstalk.ca/auth                             |
| Token Endpoint          | https://oidc-mock.wheatstalk.ca/token                            |

## Want to play with it?

Auth0's OpenID Connect works with this endpoint.

* Visit https://openidconnect.net
* Under configuration, enter the mock's OIDC Discovery Endpoint (above)
* Click "Use Discovery Document"
* Save and start following their wizard

## Code

Please excuse the mess that is this code. This is an early protoype, but the
code quality will improve with time.