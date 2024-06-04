'use client'

import { useEffect } from 'react'
import envConfig from '../config'

export default function ClientComponent() {
  useEffect(() => {
    console.log(envConfig)
  }, [])
  return <div>ClientComponent</div>
}
