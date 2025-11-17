import { useEffect } from 'react'
import { warnIfCookiesTooLarge, clearUnnecessaryCookies } from '@/lib/cookie-cleaner'

/**
 * Hook để theo dõi và quản lý cookies
 * Tự động xóa cookies không cần thiết nếu vượt ngưỡng
 * 
 * @param options Cấu hình options
 * @param options.autoClear Tự động xóa cookies không cần thiết nếu true
 * @param options.threshold Ngưỡng cảnh báo (bytes), mặc định 4KB
 */
export const useCookieMonitor = (options?: {
  autoClear?: boolean
  threshold?: number
}) => {
  const { autoClear = false, threshold = 4096 } = options || {}

  useEffect(() => {
    // Kiểm tra kích thước cookies
    const isTooLarge = warnIfCookiesTooLarge(threshold)
    
    // Tự động xóa nếu được bật
    if (isTooLarge && autoClear) {
      console.log('🧹 Đang xóa cookies không cần thiết...')
      clearUnnecessaryCookies()
    }
  }, [autoClear, threshold])
}

