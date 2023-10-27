// Fix title formatting and make plural

export function fixTitleFormat(title: string): string {
  return title.replace(/_/, " ") + "s";
}
