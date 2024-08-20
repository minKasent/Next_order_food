import LoginForm from '@/app/[locale]/(public)/(auth)/login/login-form'
import { Locale } from '@/config'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const t = await getTranslations({ locale, namespace: 'Login' })

  return {
    title: t('title'),
    description: t('description')
  }
}

export default function Login({
  params: { locale }
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <LoginForm />
    </div>
  )
}
