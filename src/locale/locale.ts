import { Locale } from '../interfaces/locale'
import { IIndexable } from '../interfaces/utils'
import English from './en-us'
import VietNam from './vi-vn'

const localeMap: IIndexable = {
  'en-us': English,
  'vi-vn': VietNam
}

export default function getLocale(locale: string | 'en-us'): Locale {
  return localeMap[locale]
}
