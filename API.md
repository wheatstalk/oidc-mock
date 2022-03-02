# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### OidcMockApi <a name="OidcMockApi" id="@wheatstalk/oidc-mock.OidcMockApi"></a>

#### Initializers <a name="Initializers" id="@wheatstalk/oidc-mock.OidcMockApi.Initializer"></a>

```typescript
import { OidcMockApi } from '@wheatstalk/oidc-mock'

new OidcMockApi(scope: Construct, id: string, props: OidcMockApiProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockApi.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockApi.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockApi.Initializer.parameter.props">props</a></code> | <code><a href="#@wheatstalk/oidc-mock.OidcMockApiProps">OidcMockApiProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@wheatstalk/oidc-mock.OidcMockApi.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@wheatstalk/oidc-mock.OidcMockApi.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@wheatstalk/oidc-mock.OidcMockApi.Initializer.parameter.props"></a>

- *Type:* <a href="#@wheatstalk/oidc-mock.OidcMockApiProps">OidcMockApiProps</a>

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
| <code><a href="#@wheatstalk/oidc-mock.OidcMockApi.property.restApi">restApi</a></code> | <code>aws-cdk-lib.aws_apigateway.RestApi</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@wheatstalk/oidc-mock.OidcMockApi.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `restApi`<sup>Required</sup> <a name="restApi" id="@wheatstalk/oidc-mock.OidcMockApi.property.restApi"></a>

```typescript
public readonly restApi: RestApi;
```

- *Type:* aws-cdk-lib.aws_apigateway.RestApi

---


### OidcMockTable <a name="OidcMockTable" id="@wheatstalk/oidc-mock.OidcMockTable"></a>

#### Initializers <a name="Initializers" id="@wheatstalk/oidc-mock.OidcMockTable.Initializer"></a>

```typescript
import { OidcMockTable } from '@wheatstalk/oidc-mock'

new OidcMockTable(scope: Construct, id: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@wheatstalk/oidc-mock.OidcMockTable.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@wheatstalk/oidc-mock.OidcMockTable.Initializer.parameter.id"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.addGlobalSecondaryIndex">addGlobalSecondaryIndex</a></code> | Add a global secondary index of table. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.addLocalSecondaryIndex">addLocalSecondaryIndex</a></code> | Add a local secondary index of table. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.autoScaleGlobalSecondaryIndexReadCapacity">autoScaleGlobalSecondaryIndexReadCapacity</a></code> | Enable read capacity scaling for the given GSI. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.autoScaleGlobalSecondaryIndexWriteCapacity">autoScaleGlobalSecondaryIndexWriteCapacity</a></code> | Enable write capacity scaling for the given GSI. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.autoScaleReadCapacity">autoScaleReadCapacity</a></code> | Enable read capacity scaling for this table. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.autoScaleWriteCapacity">autoScaleWriteCapacity</a></code> | Enable write capacity scaling for this table. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.grant">grant</a></code> | Adds an IAM policy statement associated with this table to an IAM principal's policy. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.grantFullAccess">grantFullAccess</a></code> | Permits all DynamoDB operations ("dynamodb:*") to an IAM principal. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.grantReadData">grantReadData</a></code> | Permits an IAM principal all data read operations from this table: BatchGetItem, GetRecords, GetShardIterator, Query, GetItem, Scan. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.grantReadWriteData">grantReadWriteData</a></code> | Permits an IAM principal to all data read/write operations to this table. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.grantStream">grantStream</a></code> | Adds an IAM policy statement associated with this table's stream to an IAM principal's policy. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.grantStreamRead">grantStreamRead</a></code> | Permits an IAM principal all stream data read operations for this table's stream: DescribeStream, GetRecords, GetShardIterator, ListStreams. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.grantTableListStreams">grantTableListStreams</a></code> | Permits an IAM Principal to list streams attached to current dynamodb table. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.grantWriteData">grantWriteData</a></code> | Permits an IAM principal all data write operations to this table: BatchWriteItem, PutItem, UpdateItem, DeleteItem. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.metric">metric</a></code> | Return the given named metric for this Table. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.metricConditionalCheckFailedRequests">metricConditionalCheckFailedRequests</a></code> | Metric for the conditional check failed requests this table. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.metricConsumedReadCapacityUnits">metricConsumedReadCapacityUnits</a></code> | Metric for the consumed read capacity units this table. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.metricConsumedWriteCapacityUnits">metricConsumedWriteCapacityUnits</a></code> | Metric for the consumed write capacity units this table. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.metricSuccessfulRequestLatency">metricSuccessfulRequestLatency</a></code> | Metric for the successful request latency this table. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.metricSystemErrorsForOperations">metricSystemErrorsForOperations</a></code> | Metric for the system errors this table. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.metricThrottledRequests">metricThrottledRequests</a></code> | How many requests are throttled on this table. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.metricThrottledRequestsForOperation">metricThrottledRequestsForOperation</a></code> | How many requests are throttled on this table, for the given operation. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.metricUserErrors">metricUserErrors</a></code> | Metric for the user errors. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.schema">schema</a></code> | Get schema attributes of table or index. |

---

##### `toString` <a name="toString" id="@wheatstalk/oidc-mock.OidcMockTable.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@wheatstalk/oidc-mock.OidcMockTable.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops being managed by CloudFormation, either because you've removed it from the CDK application or because you've made a change that requires the resource to be replaced.  The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="@wheatstalk/oidc-mock.OidcMockTable.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `addGlobalSecondaryIndex` <a name="addGlobalSecondaryIndex" id="@wheatstalk/oidc-mock.OidcMockTable.addGlobalSecondaryIndex"></a>

```typescript
public addGlobalSecondaryIndex(props: GlobalSecondaryIndexProps): void
```

Add a global secondary index of table.

###### `props`<sup>Required</sup> <a name="props" id="@wheatstalk/oidc-mock.OidcMockTable.addGlobalSecondaryIndex.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_dynamodb.GlobalSecondaryIndexProps

the property of global secondary index.

---

##### `addLocalSecondaryIndex` <a name="addLocalSecondaryIndex" id="@wheatstalk/oidc-mock.OidcMockTable.addLocalSecondaryIndex"></a>

```typescript
public addLocalSecondaryIndex(props: LocalSecondaryIndexProps): void
```

Add a local secondary index of table.

###### `props`<sup>Required</sup> <a name="props" id="@wheatstalk/oidc-mock.OidcMockTable.addLocalSecondaryIndex.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_dynamodb.LocalSecondaryIndexProps

the property of local secondary index.

---

##### `autoScaleGlobalSecondaryIndexReadCapacity` <a name="autoScaleGlobalSecondaryIndexReadCapacity" id="@wheatstalk/oidc-mock.OidcMockTable.autoScaleGlobalSecondaryIndexReadCapacity"></a>

```typescript
public autoScaleGlobalSecondaryIndexReadCapacity(indexName: string, props: EnableScalingProps): IScalableTableAttribute
```

Enable read capacity scaling for the given GSI.

###### `indexName`<sup>Required</sup> <a name="indexName" id="@wheatstalk/oidc-mock.OidcMockTable.autoScaleGlobalSecondaryIndexReadCapacity.parameter.indexName"></a>

- *Type:* string

---

###### `props`<sup>Required</sup> <a name="props" id="@wheatstalk/oidc-mock.OidcMockTable.autoScaleGlobalSecondaryIndexReadCapacity.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_dynamodb.EnableScalingProps

---

##### `autoScaleGlobalSecondaryIndexWriteCapacity` <a name="autoScaleGlobalSecondaryIndexWriteCapacity" id="@wheatstalk/oidc-mock.OidcMockTable.autoScaleGlobalSecondaryIndexWriteCapacity"></a>

```typescript
public autoScaleGlobalSecondaryIndexWriteCapacity(indexName: string, props: EnableScalingProps): IScalableTableAttribute
```

Enable write capacity scaling for the given GSI.

###### `indexName`<sup>Required</sup> <a name="indexName" id="@wheatstalk/oidc-mock.OidcMockTable.autoScaleGlobalSecondaryIndexWriteCapacity.parameter.indexName"></a>

- *Type:* string

---

###### `props`<sup>Required</sup> <a name="props" id="@wheatstalk/oidc-mock.OidcMockTable.autoScaleGlobalSecondaryIndexWriteCapacity.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_dynamodb.EnableScalingProps

---

##### `autoScaleReadCapacity` <a name="autoScaleReadCapacity" id="@wheatstalk/oidc-mock.OidcMockTable.autoScaleReadCapacity"></a>

```typescript
public autoScaleReadCapacity(props: EnableScalingProps): IScalableTableAttribute
```

Enable read capacity scaling for this table.

###### `props`<sup>Required</sup> <a name="props" id="@wheatstalk/oidc-mock.OidcMockTable.autoScaleReadCapacity.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_dynamodb.EnableScalingProps

---

##### `autoScaleWriteCapacity` <a name="autoScaleWriteCapacity" id="@wheatstalk/oidc-mock.OidcMockTable.autoScaleWriteCapacity"></a>

```typescript
public autoScaleWriteCapacity(props: EnableScalingProps): IScalableTableAttribute
```

Enable write capacity scaling for this table.

###### `props`<sup>Required</sup> <a name="props" id="@wheatstalk/oidc-mock.OidcMockTable.autoScaleWriteCapacity.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_dynamodb.EnableScalingProps

---

##### `grant` <a name="grant" id="@wheatstalk/oidc-mock.OidcMockTable.grant"></a>

```typescript
public grant(grantee: IGrantable, actions: string): Grant
```

Adds an IAM policy statement associated with this table to an IAM principal's policy.

If `encryptionKey` is present, appropriate grants to the key needs to be added separately using the `table.encryptionKey.grant*` methods.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@wheatstalk/oidc-mock.OidcMockTable.grant.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal (no-op if undefined).

---

###### `actions`<sup>Required</sup> <a name="actions" id="@wheatstalk/oidc-mock.OidcMockTable.grant.parameter.actions"></a>

- *Type:* string

The set of actions to allow (i.e. "dynamodb:PutItem", "dynamodb:GetItem", ...).

---

##### `grantFullAccess` <a name="grantFullAccess" id="@wheatstalk/oidc-mock.OidcMockTable.grantFullAccess"></a>

```typescript
public grantFullAccess(grantee: IGrantable): Grant
```

Permits all DynamoDB operations ("dynamodb:*") to an IAM principal.

Appropriate grants will also be added to the customer-managed KMS key if one was configured.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@wheatstalk/oidc-mock.OidcMockTable.grantFullAccess.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal to grant access to.

---

##### `grantReadData` <a name="grantReadData" id="@wheatstalk/oidc-mock.OidcMockTable.grantReadData"></a>

```typescript
public grantReadData(grantee: IGrantable): Grant
```

Permits an IAM principal all data read operations from this table: BatchGetItem, GetRecords, GetShardIterator, Query, GetItem, Scan.

Appropriate grants will also be added to the customer-managed KMS key if one was configured.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@wheatstalk/oidc-mock.OidcMockTable.grantReadData.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal to grant access to.

---

##### `grantReadWriteData` <a name="grantReadWriteData" id="@wheatstalk/oidc-mock.OidcMockTable.grantReadWriteData"></a>

```typescript
public grantReadWriteData(grantee: IGrantable): Grant
```

Permits an IAM principal to all data read/write operations to this table.

BatchGetItem, GetRecords, GetShardIterator, Query, GetItem, Scan, BatchWriteItem, PutItem, UpdateItem, DeleteItem  Appropriate grants will also be added to the customer-managed KMS key if one was configured.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@wheatstalk/oidc-mock.OidcMockTable.grantReadWriteData.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal to grant access to.

---

##### `grantStream` <a name="grantStream" id="@wheatstalk/oidc-mock.OidcMockTable.grantStream"></a>

```typescript
public grantStream(grantee: IGrantable, actions: string): Grant
```

Adds an IAM policy statement associated with this table's stream to an IAM principal's policy.

If `encryptionKey` is present, appropriate grants to the key needs to be added separately using the `table.encryptionKey.grant*` methods.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@wheatstalk/oidc-mock.OidcMockTable.grantStream.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal (no-op if undefined).

---

###### `actions`<sup>Required</sup> <a name="actions" id="@wheatstalk/oidc-mock.OidcMockTable.grantStream.parameter.actions"></a>

- *Type:* string

The set of actions to allow (i.e. "dynamodb:DescribeStream", "dynamodb:GetRecords", ...).

---

##### `grantStreamRead` <a name="grantStreamRead" id="@wheatstalk/oidc-mock.OidcMockTable.grantStreamRead"></a>

```typescript
public grantStreamRead(grantee: IGrantable): Grant
```

Permits an IAM principal all stream data read operations for this table's stream: DescribeStream, GetRecords, GetShardIterator, ListStreams.

Appropriate grants will also be added to the customer-managed KMS key if one was configured.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@wheatstalk/oidc-mock.OidcMockTable.grantStreamRead.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal to grant access to.

---

##### `grantTableListStreams` <a name="grantTableListStreams" id="@wheatstalk/oidc-mock.OidcMockTable.grantTableListStreams"></a>

```typescript
public grantTableListStreams(grantee: IGrantable): Grant
```

Permits an IAM Principal to list streams attached to current dynamodb table.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@wheatstalk/oidc-mock.OidcMockTable.grantTableListStreams.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal (no-op if undefined).

---

##### `grantWriteData` <a name="grantWriteData" id="@wheatstalk/oidc-mock.OidcMockTable.grantWriteData"></a>

```typescript
public grantWriteData(grantee: IGrantable): Grant
```

Permits an IAM principal all data write operations to this table: BatchWriteItem, PutItem, UpdateItem, DeleteItem.

Appropriate grants will also be added to the customer-managed KMS key if one was configured.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@wheatstalk/oidc-mock.OidcMockTable.grantWriteData.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

The principal to grant access to.

---

##### `metric` <a name="metric" id="@wheatstalk/oidc-mock.OidcMockTable.metric"></a>

```typescript
public metric(metricName: string, props?: MetricOptions): Metric
```

Return the given named metric for this Table.

By default, the metric will be calculated as a sum over a period of 5 minutes. You can customize this by using the `statistic` and `period` properties.

###### `metricName`<sup>Required</sup> <a name="metricName" id="@wheatstalk/oidc-mock.OidcMockTable.metric.parameter.metricName"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="@wheatstalk/oidc-mock.OidcMockTable.metric.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricConditionalCheckFailedRequests` <a name="metricConditionalCheckFailedRequests" id="@wheatstalk/oidc-mock.OidcMockTable.metricConditionalCheckFailedRequests"></a>

```typescript
public metricConditionalCheckFailedRequests(props?: MetricOptions): Metric
```

Metric for the conditional check failed requests this table.

By default, the metric will be calculated as a sum over a period of 5 minutes. You can customize this by using the `statistic` and `period` properties.

###### `props`<sup>Optional</sup> <a name="props" id="@wheatstalk/oidc-mock.OidcMockTable.metricConditionalCheckFailedRequests.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricConsumedReadCapacityUnits` <a name="metricConsumedReadCapacityUnits" id="@wheatstalk/oidc-mock.OidcMockTable.metricConsumedReadCapacityUnits"></a>

```typescript
public metricConsumedReadCapacityUnits(props?: MetricOptions): Metric
```

Metric for the consumed read capacity units this table.

By default, the metric will be calculated as a sum over a period of 5 minutes. You can customize this by using the `statistic` and `period` properties.

###### `props`<sup>Optional</sup> <a name="props" id="@wheatstalk/oidc-mock.OidcMockTable.metricConsumedReadCapacityUnits.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricConsumedWriteCapacityUnits` <a name="metricConsumedWriteCapacityUnits" id="@wheatstalk/oidc-mock.OidcMockTable.metricConsumedWriteCapacityUnits"></a>

```typescript
public metricConsumedWriteCapacityUnits(props?: MetricOptions): Metric
```

Metric for the consumed write capacity units this table.

By default, the metric will be calculated as a sum over a period of 5 minutes. You can customize this by using the `statistic` and `period` properties.

###### `props`<sup>Optional</sup> <a name="props" id="@wheatstalk/oidc-mock.OidcMockTable.metricConsumedWriteCapacityUnits.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricSuccessfulRequestLatency` <a name="metricSuccessfulRequestLatency" id="@wheatstalk/oidc-mock.OidcMockTable.metricSuccessfulRequestLatency"></a>

```typescript
public metricSuccessfulRequestLatency(props?: MetricOptions): Metric
```

Metric for the successful request latency this table.

By default, the metric will be calculated as an average over a period of 5 minutes. You can customize this by using the `statistic` and `period` properties.

###### `props`<sup>Optional</sup> <a name="props" id="@wheatstalk/oidc-mock.OidcMockTable.metricSuccessfulRequestLatency.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricSystemErrorsForOperations` <a name="metricSystemErrorsForOperations" id="@wheatstalk/oidc-mock.OidcMockTable.metricSystemErrorsForOperations"></a>

```typescript
public metricSystemErrorsForOperations(props?: SystemErrorsForOperationsMetricOptions): IMetric
```

Metric for the system errors this table.

This will sum errors across all possible operations. Note that by default, each individual metric will be calculated as a sum over a period of 5 minutes. You can customize this by using the `statistic` and `period` properties.

###### `props`<sup>Optional</sup> <a name="props" id="@wheatstalk/oidc-mock.OidcMockTable.metricSystemErrorsForOperations.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_dynamodb.SystemErrorsForOperationsMetricOptions

---

##### ~~`metricThrottledRequests`~~ <a name="metricThrottledRequests" id="@wheatstalk/oidc-mock.OidcMockTable.metricThrottledRequests"></a>

```typescript
public metricThrottledRequests(props?: MetricOptions): Metric
```

How many requests are throttled on this table.

Default: sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="@wheatstalk/oidc-mock.OidcMockTable.metricThrottledRequests.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricThrottledRequestsForOperation` <a name="metricThrottledRequestsForOperation" id="@wheatstalk/oidc-mock.OidcMockTable.metricThrottledRequestsForOperation"></a>

```typescript
public metricThrottledRequestsForOperation(operation: string, props?: MetricOptions): Metric
```

How many requests are throttled on this table, for the given operation.

Default: sum over 5 minutes

###### `operation`<sup>Required</sup> <a name="operation" id="@wheatstalk/oidc-mock.OidcMockTable.metricThrottledRequestsForOperation.parameter.operation"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="@wheatstalk/oidc-mock.OidcMockTable.metricThrottledRequestsForOperation.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricUserErrors` <a name="metricUserErrors" id="@wheatstalk/oidc-mock.OidcMockTable.metricUserErrors"></a>

```typescript
public metricUserErrors(props?: MetricOptions): Metric
```

Metric for the user errors.

Note that this metric reports user errors across all the tables in the account and region the table resides in.  By default, the metric will be calculated as a sum over a period of 5 minutes. You can customize this by using the `statistic` and `period` properties.

###### `props`<sup>Optional</sup> <a name="props" id="@wheatstalk/oidc-mock.OidcMockTable.metricUserErrors.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `schema` <a name="schema" id="@wheatstalk/oidc-mock.OidcMockTable.schema"></a>

```typescript
public schema(indexName?: string): SchemaOptions
```

Get schema attributes of table or index.

###### `indexName`<sup>Optional</sup> <a name="indexName" id="@wheatstalk/oidc-mock.OidcMockTable.schema.parameter.indexName"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.fromTableArn">fromTableArn</a></code> | Creates a Table construct that represents an external table via table arn. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.fromTableAttributes">fromTableAttributes</a></code> | Creates a Table construct that represents an external table. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.fromTableName">fromTableName</a></code> | Creates a Table construct that represents an external table via table name. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@wheatstalk/oidc-mock.OidcMockTable.isConstruct"></a>

```typescript
import { OidcMockTable } from '@wheatstalk/oidc-mock'

OidcMockTable.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@wheatstalk/oidc-mock.OidcMockTable.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isResource` <a name="isResource" id="@wheatstalk/oidc-mock.OidcMockTable.isResource"></a>

```typescript
import { OidcMockTable } from '@wheatstalk/oidc-mock'

OidcMockTable.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="@wheatstalk/oidc-mock.OidcMockTable.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `fromTableArn` <a name="fromTableArn" id="@wheatstalk/oidc-mock.OidcMockTable.fromTableArn"></a>

```typescript
import { OidcMockTable } from '@wheatstalk/oidc-mock'

OidcMockTable.fromTableArn(scope: Construct, id: string, tableArn: string)
```

Creates a Table construct that represents an external table via table arn.

###### `scope`<sup>Required</sup> <a name="scope" id="@wheatstalk/oidc-mock.OidcMockTable.fromTableArn.parameter.scope"></a>

- *Type:* constructs.Construct

The parent creating construct (usually `this`).

---

###### `id`<sup>Required</sup> <a name="id" id="@wheatstalk/oidc-mock.OidcMockTable.fromTableArn.parameter.id"></a>

- *Type:* string

The construct's name.

---

###### `tableArn`<sup>Required</sup> <a name="tableArn" id="@wheatstalk/oidc-mock.OidcMockTable.fromTableArn.parameter.tableArn"></a>

- *Type:* string

The table's ARN.

---

##### `fromTableAttributes` <a name="fromTableAttributes" id="@wheatstalk/oidc-mock.OidcMockTable.fromTableAttributes"></a>

```typescript
import { OidcMockTable } from '@wheatstalk/oidc-mock'

OidcMockTable.fromTableAttributes(scope: Construct, id: string, attrs: TableAttributes)
```

Creates a Table construct that represents an external table.

###### `scope`<sup>Required</sup> <a name="scope" id="@wheatstalk/oidc-mock.OidcMockTable.fromTableAttributes.parameter.scope"></a>

- *Type:* constructs.Construct

The parent creating construct (usually `this`).

---

###### `id`<sup>Required</sup> <a name="id" id="@wheatstalk/oidc-mock.OidcMockTable.fromTableAttributes.parameter.id"></a>

- *Type:* string

The construct's name.

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="@wheatstalk/oidc-mock.OidcMockTable.fromTableAttributes.parameter.attrs"></a>

- *Type:* aws-cdk-lib.aws_dynamodb.TableAttributes

A `TableAttributes` object.

---

##### `fromTableName` <a name="fromTableName" id="@wheatstalk/oidc-mock.OidcMockTable.fromTableName"></a>

```typescript
import { OidcMockTable } from '@wheatstalk/oidc-mock'

OidcMockTable.fromTableName(scope: Construct, id: string, tableName: string)
```

Creates a Table construct that represents an external table via table name.

###### `scope`<sup>Required</sup> <a name="scope" id="@wheatstalk/oidc-mock.OidcMockTable.fromTableName.parameter.scope"></a>

- *Type:* constructs.Construct

The parent creating construct (usually `this`).

---

###### `id`<sup>Required</sup> <a name="id" id="@wheatstalk/oidc-mock.OidcMockTable.fromTableName.parameter.id"></a>

- *Type:* string

The construct's name.

---

###### `tableName`<sup>Required</sup> <a name="tableName" id="@wheatstalk/oidc-mock.OidcMockTable.fromTableName.parameter.tableName"></a>

- *Type:* string

The table's name.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.property.tableArn">tableArn</a></code> | <code>string</code> | Arn of the dynamodb table. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.property.tableName">tableName</a></code> | <code>string</code> | Table name of the dynamodb table. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.property.encryptionKey">encryptionKey</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | KMS encryption key, if this table uses a customer-managed encryption key. |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockTable.property.tableStreamArn">tableStreamArn</a></code> | <code>string</code> | ARN of the table's stream, if there is one. |

---

##### `node`<sup>Required</sup> <a name="node" id="@wheatstalk/oidc-mock.OidcMockTable.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@wheatstalk/oidc-mock.OidcMockTable.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK (generally, those created by creating new class instances like Role, Bucket, etc.), this is always the same as the environment of the stack they belong to; however, for imported resources (those obtained from static methods like fromRoleArn, fromBucketName, etc.), that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="@wheatstalk/oidc-mock.OidcMockTable.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `tableArn`<sup>Required</sup> <a name="tableArn" id="@wheatstalk/oidc-mock.OidcMockTable.property.tableArn"></a>

```typescript
public readonly tableArn: string;
```

- *Type:* string

Arn of the dynamodb table.

---

##### `tableName`<sup>Required</sup> <a name="tableName" id="@wheatstalk/oidc-mock.OidcMockTable.property.tableName"></a>

```typescript
public readonly tableName: string;
```

- *Type:* string

Table name of the dynamodb table.

---

##### `encryptionKey`<sup>Optional</sup> <a name="encryptionKey" id="@wheatstalk/oidc-mock.OidcMockTable.property.encryptionKey"></a>

```typescript
public readonly encryptionKey: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

KMS encryption key, if this table uses a customer-managed encryption key.

---

##### `tableStreamArn`<sup>Optional</sup> <a name="tableStreamArn" id="@wheatstalk/oidc-mock.OidcMockTable.property.tableStreamArn"></a>

```typescript
public readonly tableStreamArn: string;
```

- *Type:* string

ARN of the table's stream, if there is one.

---


## Structs <a name="Structs" id="Structs"></a>

### OidcMockApiProps <a name="OidcMockApiProps" id="@wheatstalk/oidc-mock.OidcMockApiProps"></a>

#### Initializer <a name="Initializer" id="@wheatstalk/oidc-mock.OidcMockApiProps.Initializer"></a>

```typescript
import { OidcMockApiProps } from '@wheatstalk/oidc-mock'

const oidcMockApiProps: OidcMockApiProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@wheatstalk/oidc-mock.OidcMockApiProps.property.table">table</a></code> | <code><a href="#@wheatstalk/oidc-mock.OidcMockTable">OidcMockTable</a></code> | *No description.* |

---

##### `table`<sup>Required</sup> <a name="table" id="@wheatstalk/oidc-mock.OidcMockApiProps.property.table"></a>

```typescript
public readonly table: OidcMockTable;
```

- *Type:* <a href="#@wheatstalk/oidc-mock.OidcMockTable">OidcMockTable</a>

---



