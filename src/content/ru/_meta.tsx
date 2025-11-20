import type { MetaRecord } from 'nextra'

export default {
  index: {
    type: 'page',
    display: 'hidden',
    theme: {
      copyPage: false,
      timestamp: false,
      layout: 'full',
      toc: false,
    },
  },
  docs: {
    title: 'Документации',
    type: 'page',
    theme: {
      copyPage: false,
      navbar: true,
      toc: true,
    },
  },

} satisfies MetaRecord
