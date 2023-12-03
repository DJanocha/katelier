function objHasKey<T extends object>(obj: T, key: PropertyKey): key is keyof T {
  return key in obj;
}
export function objectKeys<O extends object>(obj: O): (keyof O)[] {
  return Object.keys(obj).filter((key) => objHasKey(obj, key)) as (keyof O)[];
}
