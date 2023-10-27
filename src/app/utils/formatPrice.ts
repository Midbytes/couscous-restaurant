// if price is an integer, add ",-" if decimal, replace dot with comma
export function formatPrice(price: number): string {
  return price % 1 !== 0
    ? `${price.toString().replace(".", ",")}`
    : `${price},-`;
}
