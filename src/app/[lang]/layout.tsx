import type { Metadata } from 'next'


import type { I18nLangAsyncProps, I18nLangKeys } from '@/i18n'
// import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
import { Footer, LastUpdated, Layout, LocaleSwitch, Navbar } from 'nextra-theme-docs'
import { Banner, Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { CustomFooter } from '@/components/CustomFooter'
import { useServerLocale } from '@/hooks'
import ThemeToggle from '@/widgets/theme-toggle'

import { getDictionary } from '../_dictionaries/get-dictionary'
import { ThemeProvider } from './_components/ThemeProvider'
import './styles/index.css'

export const metadata = {
  // Define your metadata here
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
  metadataBase: new URL('https://nextjs-nextra-starter-green.vercel.app'),
  icons: '/img/favicon.svg',
} satisfies Metadata

const repo = 'https://github.com/pdsuwwz/nextjs-nextra-starter'

const CustomBanner = async ({ lang }: I18nLangAsyncProps) => {
  const { t } = await useServerLocale(lang)
  return (
    <Banner
      storageKey="starter-banner"
    >
      <div className="flex justify-center items-center gap-1">
        { t('banner.title') }
        {' '}
        <a
          className="max-sm:hidden text-warning hover:underline"
          target="_blank"
          href={repo}
        >
          { t('banner.more') }
        </a>
      </div>
    </Banner>
  )
}


const CustomNavbar = async ({ lang }: I18nLangAsyncProps) => {
  const { t } = await useServerLocale(lang)
  return (
    <Navbar
      logo={(
        <span>{ t('systemTitle') }</span>
      )}
      logoLink={`/${lang}`}
      projectLink={repo}
    >
      <>
        <LocaleSwitch />
        <ThemeToggle className="max-md:hidden" />
      </>

    </Navbar>
  )
}


// interface Props {
//   children: ReactNode
//   params: Promise<{ lang: I18nLangKeys }>
// }

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const getterParams = await params

  const { lang } = getterParams as { lang: I18nLangKeys }

  const dictionary = await getDictionary(lang)
  const pageMap = await getPageMap(lang)

  const title = 'My Nextra Starter'
  const description = 'A Starter template with Next.js, Nextra'

  const { t } = await useServerLocale(lang)

  return (
    <html
      // Not required, but good for SEO
      lang={lang}
      // Required to be set
      // dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      dir="ltr"
      suppressHydrationWarning
    >
      <Head
      // ... Your additional head options
      >
        {/* <title>{asPath !== '/' ? `${normalizePagesResult.title} - ${title}` : title}</title> */}
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <link rel="canonical" href={repo} />
      </Head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="starter-theme-provider"
          disableTransitionOnChange
        >
          <Layout
            copyPageButton={false}
            banner={
              <CustomBanner lang={lang} />
            }
            navbar={
              <CustomNavbar lang={lang} />
            }
            lastUpdated={(
              <LastUpdated>
                { t('lastUpdated') }
              </LastUpdated>
            )}
            editLink={null}
            docsRepositoryBase="https://github.com/pdsuwwz/nextjs-nextra-starter"
            footer={(
              <Footer className="bg-background py-5!">
                <CustomFooter />
              </Footer>
            )}
            search={(
              <Search
                placeholder={t('search.placeholder')}
                emptyResult={t('search.noResults')}
                errorText={t('search.errorText')}
                loading={t('search.loading')}
              />
            )}
            i18n={[
              { locale: 'en', name: 'English' },
              { locale: 'ru', name: 'Русский' },
              { locale: 'kk', name: 'Қазақша' },
            ]}
            toc={{
              backToTop: t('backToTop'),
              title: t('pageTitle'),
            }}
            sidebar={{
              toggleButton: false,
            }}
            pageMap={pageMap}
            feedback={{ content: '' }}
          // ... Your additional layout options
          >
            {children}
          </Layout>
        </ThemeProvider>
      </body>
      {/* <GoogleAnalytics gaId="G-VCR6017LB8" /> */}
    </html>
  )
}
