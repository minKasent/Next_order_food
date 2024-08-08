'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Locale, locales } from '@/config'
import { useLocale, useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { usePathname, useRouter } from '@/navigation'
import SearchParamsLoader, {
  useSearchParamsLoader
} from '@/components/search-params-loader'

export default function SwitchLanguage() {
  const t = useTranslations('SwitchLanguage')
  const { searchParams, setSearchParams } = useSearchParamsLoader()
  const locale = useLocale()
  const pathname = usePathname()
  const params = useParams()
  const router = useRouter()
  return (
    <>
      <SearchParamsLoader onParamsReceived={setSearchParams} />
      <Select
        value={locale}
        onValueChange={(value) => {
          const locale = params.locale as Locale
          const newPathname = pathname.replace(`/${locale}`, `/${value}`)
          const fullUrl = `${newPathname}?${searchParams?.toString()}`
          router.replace(fullUrl)
          router.refresh()
        }}
      >
        <SelectTrigger className='w-[140px]'>
          <SelectValue placeholder={t('title')} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {locales.map((locale) => (
              <SelectItem value={locale} key={locale}>
                {t(locale)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}
