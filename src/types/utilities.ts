/* eslint-disable @typescript-eslint/no-explicit-any */

export type TODO = any;

export type ExplicitAny = any;

type UnionKeys<T> = T extends T ? keyof T : never;
type StrictUnionHelper<T, TAll> = T extends ExplicitAny
  ? T & Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, undefined>>
  : never;

export type StrictUnion<T> = StrictUnionHelper<T, T>;
