import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { ChangePasswordV2BodyType } from '@/schemaValidations/account.schema'
import accountApiRequest from '@/apiRequests/account'

export async function PUT(request: Request) {
  const cookieStore = await cookies()
  const body = (await request.json()) as ChangePasswordV2BodyType
  const accessToken = cookieStore.get('accessToken')?.value
  if (!accessToken) {
    return Response.json(
      {
        message: 'Không tìm thấy accessToken'
      },
      {
        status: 401
      }
    )
  }
  try {
    const { payload } = await accountApiRequest.sChangePasswordV2(
      accessToken,
      body
    )

    const decodedAccessToken = jwt.decode(payload.data.accessToken) as {
      exp: number
    }
    const decodedRefreshToken = jwt.decode(payload.data.refreshToken) as {
      exp: number
    }
    const isProduction = process.env.NODE_ENV === 'production'
    const isHttps = process.env.NEXT_PUBLIC_URL?.startsWith('https')
    cookieStore.set('accessToken', payload.data.accessToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: isProduction && isHttps,
      expires: decodedAccessToken.exp * 1000
    })
    cookieStore.set('refreshToken', payload.data.refreshToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: isProduction && isHttps,
      expires: decodedRefreshToken.exp * 1000
    })
    return Response.json(payload)
  } catch (error: any) {
    console.log(error)
    return Response.json(
      {
        message: error.message ?? 'Có lỗi xảy ra'
      },
      {
        status: error.status ?? 500
      }
    )
  }
}
