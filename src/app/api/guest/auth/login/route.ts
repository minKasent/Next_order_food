import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { HttpError } from '@/lib/http'
import { GuestLoginBodyType } from '@/schemaValidations/guest.schema'
import guestApiRequest from '@/apiRequests/guest'

export async function POST(request: Request) {
  const body = (await request.json()) as GuestLoginBodyType
  const cookieStore = await cookies()
  try {
    const { payload } = await guestApiRequest.sLogin(body)
    const { accessToken, refreshToken } = payload.data
    const decodedAccessToken = jwt.decode(accessToken) as { exp: number }
    const decodedRefreshToken = jwt.decode(refreshToken) as { exp: number }
    const isProduction = process.env.NODE_ENV === 'production'
    const isHttps = process.env.NEXT_PUBLIC_URL?.startsWith('https')
    cookieStore.set('accessToken', accessToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: isProduction && isHttps,
      expires: decodedAccessToken.exp * 1000
    })
    cookieStore.set('refreshToken', refreshToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: isProduction && isHttps,
      expires: decodedRefreshToken.exp * 1000
    })
    return Response.json(payload)
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status
      })
    } else {
      return Response.json(
        {
          message: 'Có lỗi xảy ra'
        },
        {
          status: 500
        }
      )
    }
  }
}
