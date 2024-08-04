import { getUserLocale } from '@/services/locale'
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async () => {
  // Ngôn ngữ website
  // Cái giá trị locale chúng ta có thể lấy từ cookie người dùng chẳn hạn.
  const locale = await getUserLocale()
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  }
})
