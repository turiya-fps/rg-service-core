/**
 * A function that will take the given {@link parameter} and generate "route parameter" syntax.
 *
 * @example `{name}`
 * @example `:name`
 */
export type PathParameterSyntaxFunction<T extends string> = (parameter: T) => string;

/**
 * A function that can be invoked with {@link PathParameterSyntaxFunction} to generate a specific route syntax.
 */
export type PathGeneratorFunction = (syntax: PathParameterSyntaxFunction<string>) => string;

/**
 * A function that can be used to construct a route syntax with path parameter names of type {@link T}.
 */
export type PathBuilderFunction<T extends Record<string, unknown>> = (variable: PathParameterSyntaxFunction<string & keyof T>) => string;

/**
 * A definition of a route containing its http method and its syntax agnostic route.
 */
export type RouteDefinition<M extends string> = {
  readonly method: M;
  readonly path: PathGeneratorFunction;
};

/**
 * A define a route.
 *
 * This functions a way to bind the explicit route types to string literals.
 * Whilst making the syntax agnostic so we can make use of it across deployment and local server.
 */
export const router = <M extends string, T extends Record<string, unknown>>(method: M, builder: PathBuilderFunction<T>): RouteDefinition<M> => {
  return {
    method,
    path: (syntax: PathParameterSyntaxFunction<string>): string => builder(syntax),
  };
};

/**
 * A {@link PathParameterSyntaxFunction} compatible with API Gateway route syntax.
 */
export const lambda: PathParameterSyntaxFunction<string> = (parameter: string): string => `{${parameter}}`;

/**
 * A {@link PathParameterSyntaxFunction} compatible with express route syntax.
 */
export const express: PathParameterSyntaxFunction<string> = (parameter: string): string => `:${parameter}`;
