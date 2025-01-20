import { ReactNode } from "react"
import { createIntl, createIntlCache } from "@formatjs/intl"
import {
  FormatXMLElementFn,
  PrimitiveType,
} from "intl-messageformat/src/formatters"
import flattenObject from "@/utils/flatten-object/flattenObject"
import { Flatten } from "@/types/general.types"
import * as messages from "@/messages"

const locale = process.env.NEXT_PUBLIC_LANG

const cache = createIntlCache()

const localeMessages = messages[locale]

const intl = createIntl(
  {
    locale: locale,
    messages: flattenObject(localeMessages),
  },
  cache
)

export type TranslationMessage = Flatten<typeof localeMessages>

const translate = (
  message: TranslationMessage,
  values?: Record<
    string,
    PrimitiveType | FormatXMLElementFn<string, string | ReactNode>
  >
) => {
  return intl.formatMessage(
    { id: message },
    values as Record<string, PrimitiveType | FormatXMLElementFn<string, string>>
  )
}

export default translate
