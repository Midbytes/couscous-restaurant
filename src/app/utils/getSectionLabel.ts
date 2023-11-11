import { Locales } from "../../../i18n.config";
import { NAV_ITEM } from "../constant/navItem";

export const getSectionLabel = (id: string, lang: Locales) =>
  NAV_ITEM.find((item) => item.href.includes(id))?.label[lang];
