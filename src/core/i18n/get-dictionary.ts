import en from './dictionaries/en.json';
import ar from './dictionaries/ar.json';

const dictionaries = {
  en,
  ar,
};

export type Locale = keyof typeof dictionaries;
export type Dictionary = typeof en;

export const getDictionary = (locale: Locale): Dictionary => {
  return dictionaries[locale] ?? dictionaries.en;
};
