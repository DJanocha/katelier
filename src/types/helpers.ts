export type TypedOmit<TObj, TKey extends keyof TObj> = Omit<TObj, TKey>;
export type Prettify<T> = {
  [K in keyof T]: T[K];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};

export type DeepPrettify<T> = {
  [K in keyof T]: T[K] extends object
    ? DeepPrettify<T[K]>
    : T extends object
    ? Prettify<T[K]>
    : T[K];
};
