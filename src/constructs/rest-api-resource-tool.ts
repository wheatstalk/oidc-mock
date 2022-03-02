import { aws_lambda } from 'aws-cdk-lib';
import * as aws_apigateway from 'aws-cdk-lib/aws-apigateway';

export class RestApiResourceTool {
  private readonly routes: Record<string, aws_apigateway.IResource> = {};

  constructor(private readonly baseRoute: aws_apigateway.IResource) {
  }

  route(route: string): aws_apigateway.IResource {
    if (!this.routes[route]) {
      this.createRoute(route);
    }

    return this.routes[route];
  }

  lambda(route: string, method: string, options: { readonly lambda: aws_lambda.IFunction } & aws_apigateway.MethodOptions) {
    const resource = this.route(route);
    resource.addMethod(method, new aws_apigateway.LambdaIntegration(options.lambda), options);
    return resource;
  }

  private createRoute(route: string) {
    const parts = route.split('/');
    let currentRoute = this.baseRoute;

    for (let partIndex = 0; partIndex < parts.length; partIndex++) {
      const routeSlice = parts.slice(0, partIndex + 1).join('/');

      if (!this.routes[routeSlice]) {
        this.routes[routeSlice] = currentRoute.addResource(parts[partIndex]);
      }

      currentRoute = this.routes[routeSlice];
    }
  }
}