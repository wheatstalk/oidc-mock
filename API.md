# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### OidcMockApi <a name="OidcMockApi" id="@wheatstalk/oidc-mock.OidcMockApi"></a>

Creates a mock OIDC Identity Provider.

#### Initializers <a name="Initializers" id="@wheatstalk/oidc-mock.OidcMockApi.Initializer"></a>

```typescript
import { OidcMockApi } from '@wheatstalk/oidc-mock'

new OidcMockApi(scope: Construct, id: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockApi.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockApi.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@wheatstalk/oidc-mock.OidcMockApi.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@wheatstalk/oidc-mock.OidcMockApi.Initializer.parameter.id"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockApi.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@wheatstalk/oidc-mock.OidcMockApi.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockApi.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@wheatstalk/oidc-mock.OidcMockApi.isConstruct"></a>

```typescript
import { OidcMockApi } from '@wheatstalk/oidc-mock'

OidcMockApi.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@wheatstalk/oidc-mock.OidcMockApi.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockApi.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockApi.property.authUrl">authUrl</a></code> | <code>string</code> | The URL for the auth endpoint. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockApi.property.jwksUrl">jwksUrl</a></code> | <code>string</code> | The URL for the jwks endpoint. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockApi.property.openidConfigurationUrl">openidConfigurationUrl</a></code> | <code>string</code> | The full URL to access the openid-configuration endpoint. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockApi.property.restApi">restApi</a></code> | <code>aws-cdk-lib.aws_apigateway.RestApi</code> | The REST API. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockApi.property.tokenUrl">tokenUrl</a></code> | <code>string</code> | The URL for the token endpoint. |

---

##### `node`<sup>Required</sup> <a name="node" id="@wheatstalk/oidc-mock.OidcMockApi.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `authUrl`<sup>Required</sup> <a name="authUrl" id="@wheatstalk/oidc-mock.OidcMockApi.property.authUrl"></a>

```typescript
public readonly authUrl: string;
```

- *Type:* string

The URL for the auth endpoint.

---

##### `jwksUrl`<sup>Required</sup> <a name="jwksUrl" id="@wheatstalk/oidc-mock.OidcMockApi.property.jwksUrl"></a>

```typescript
public readonly jwksUrl: string;
```

- *Type:* string

The URL for the jwks endpoint.

---

##### `openidConfigurationUrl`<sup>Required</sup> <a name="openidConfigurationUrl" id="@wheatstalk/oidc-mock.OidcMockApi.property.openidConfigurationUrl"></a>

```typescript
public readonly openidConfigurationUrl: string;
```

- *Type:* string

The full URL to access the openid-configuration endpoint.

---

##### `restApi`<sup>Required</sup> <a name="restApi" id="@wheatstalk/oidc-mock.OidcMockApi.property.restApi"></a>

```typescript
public readonly restApi: RestApi;
```

- *Type:* aws-cdk-lib.aws_apigateway.RestApi

The REST API.

---

##### `tokenUrl`<sup>Required</sup> <a name="tokenUrl" id="@wheatstalk/oidc-mock.OidcMockApi.property.tokenUrl"></a>

```typescript
public readonly tokenUrl: string;
```

- *Type:* string

The URL for the token endpoint.

---





