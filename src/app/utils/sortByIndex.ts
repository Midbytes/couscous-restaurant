export function sortByIndex<T, U extends keyof T>(items: T[], index: U): T[] {
  return items.sort((a, b) =>
    a[index] && b[index] ? (a[index] >= b[index] ? 1 : -1) : 0
  );
}
