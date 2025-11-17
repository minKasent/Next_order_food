'use client'

import { useEffect } from 'react'

/**
 * Component để sửa lỗi hydration mismatch do browser extensions gây ra
 * Loại bỏ các thuộc tính không mong muốn như bis_skin_checked
 */
export default function HydrationFixer() {
  useEffect(() => {
    // Hàm để loại bỏ các thuộc tính không mong muốn
    const removeUnwantedAttributes = () => {
      // Danh sách các thuộc tính cần loại bỏ (thường do browser extensions thêm vào)
      const unwantedAttributes = [
        'bis_skin_checked',
        // Có thể thêm các thuộc tính khác nếu cần
      ]

      // Duyệt qua tất cả elements và loại bỏ thuộc tính không mong muốn
      const allElements = document.querySelectorAll('*')
      allElements.forEach((element) => {
        unwantedAttributes.forEach((attr) => {
          if (element.hasAttribute(attr)) {
            element.removeAttribute(attr)
          }
        })
      })
    }

    // Thực hiện ngay lập tức
    removeUnwantedAttributes()

    // Sử dụng MutationObserver để theo dõi các thay đổi DOM trong tương lai
    const observer = new MutationObserver((mutations) => {
      let shouldClean = false

      mutations.forEach((mutation) => {
        // Kiểm tra nếu có attributes mới được thêm vào
        if (mutation.type === 'attributes' && mutation.attributeName) {
          if (mutation.attributeName.startsWith('bis_') ||
              mutation.attributeName.includes('skin_checked')) {
            shouldClean = true
          }
        }
        // Kiểm tra nếu có elements mới được thêm vào
        else if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          shouldClean = true
        }
      })

      if (shouldClean) {
        // Debounce để tránh gọi quá nhiều lần
        setTimeout(removeUnwantedAttributes, 0)
      }
    })

    // Bắt đầu quan sát
    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ['bis_skin_checked'] // Chỉ theo dõi thuộc tính cụ thể này
    })

    // Cleanup
    return () => {
      observer.disconnect()
    }
  }, [])

  // Component này không render gì cả
  return null
}
