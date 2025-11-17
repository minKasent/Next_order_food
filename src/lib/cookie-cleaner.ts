/**
 * Utility để xóa cookies không cần thiết hoặc cookies cũ
 * Giúp tránh lỗi 431 Request Header Fields Too Large
 */

export const clearUnnecessaryCookies = () => {
  if (typeof window === 'undefined') return

  const cookies = document.cookie.split(';')
  
  // Danh sách cookies cần giữ lại
  const keepCookies = ['accessToken', 'refreshToken', 'theme']
  
  cookies.forEach(cookie => {
    const cookieName = cookie.split('=')[0].trim()
    
    // Xóa cookie nếu không nằm trong danh sách giữ lại
    if (!keepCookies.includes(cookieName)) {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    }
  })
}

/**
 * Kiểm tra kích thước cookies
 * @returns Kích thước cookies tính bằng bytes
 */
export const getCookiesSize = (): number => {
  if (typeof window === 'undefined') return 0
  
  const cookies = document.cookie
  return new Blob([cookies]).size
}

/**
 * Cảnh báo nếu cookies quá lớn
 * @param threshold Ngưỡng cảnh báo (bytes), mặc định 4KB
 */
export const warnIfCookiesTooLarge = (threshold: number = 4096) => {
  const size = getCookiesSize()
  
  if (size > threshold) {
    console.warn(
      `⚠️ Cookies quá lớn (${(size / 1024).toFixed(2)}KB). ` +
      `Điều này có thể gây ra lỗi 431. ` +
      `Hãy xóa cookies không cần thiết.`
    )
    return true
  }
  
  return false
}

