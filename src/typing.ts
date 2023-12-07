// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FunctionArgumentsLike = any[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FunctionLike = (...args: any) => any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FunctionLikeWithReturn<R> = (...args: any) => R;
export type FunctionLikeVoid = () => void;
export type FunctionLikeConsumer<T> = (value: T) => void;
export type FunctionLikeProvider<R> = () => R;
export type FunctionLikeTransformer<T, R> = (value: T) => R;

/**
 * A helper type that can be used to do covariance and contravariance value swapping.
 */
type Var<T> = (key: T) => void;

export type Varr<T> = ((key: T) => void) extends ((key: infer I) => void) ? I : never;

/**
 * Convert a union (`|`) into an intersection (`&`).
 */
export type UnionToIntersection<T> = (
  (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T extends any
      ? Var<T>
      : never
  ) extends Var<infer I>
    ? I
    : never
);
