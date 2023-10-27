/* Reordering graphQL request sections, new sections that are not inside 
  the order array are placed at the end of the orderedSections array */
export function sortByOrder<T>(arrayToOrder: T[], order: T[]): T[] {
  return arrayToOrder
    .sort((a: T, b: T) => {
      return order.indexOf(a) - order.indexOf(b);
    })
    .filter((section: T) => order.indexOf(section) > -1)
    .concat(arrayToOrder.filter((section: T) => order.indexOf(section) == -1));
}
