export function isArraysHasEqualElem<T extends { [key: string]: any }>(
  arr1: T[],
  arr2: T[],
  key?: keyof T
) {
  return arr1.some((item) =>
    arr2.some((el) => (key ? item[key] === el[key] : item === el))
  );
}
