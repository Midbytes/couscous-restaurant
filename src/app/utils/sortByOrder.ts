export function sortByOrder<T>(arrayToOrder: T[], order: T[]): T[] {
  return arrayToOrder
    .sort((a: T, b: T) => {
      return order.indexOf(a) - order.indexOf(b);
    })
    .filter((section: T) => order.indexOf(section) > -1)
    .concat(arrayToOrder.filter((section: T) => order.indexOf(section) == -1));
}
