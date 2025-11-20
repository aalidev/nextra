import type { AllLocales } from '@/i18n'
import 'server-only'

// We enumerate all dictionaries here for better linting and TypeScript support
// We also get the default import for cleaner types
const dictionaries = {
  en: () => import('@/i18n/en'),
  kk: () => import('@/i18n/kk'),
  ru: () => import('@/i18n/ru'),
} as const satisfies Record<string, () => Promise<{ default: AllLocales }>>

export const getDictionary = async (
  locale: keyof typeof dictionaries,
): Promise<AllLocales> => (await dictionaries[locale]()).default
