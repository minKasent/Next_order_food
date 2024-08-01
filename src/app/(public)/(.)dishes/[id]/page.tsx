import dishApiRequest from '@/apiRequests/dish'
import { formatCurrency, wrapServerApi } from '@/lib/utils'
import Image from 'next/image'

export default async function DishPage({
  params: { id }
}: {
  params: {
    id: string
  }
}) {
  const data = await wrapServerApi(() => dishApiRequest.getDish(Number(id)))

  const dish = data?.payload?.data
  if (!dish)
    return (
      <div>
        <h1 className='text-2xl lg:text-3xl font-semibold'>
          Món ăn không tồn tại
        </h1>
      </div>
    )
  return (
    <div className='space-y-4'>
      <h1 className='text-2xl lg:text-3xl font-semibold'>{dish.name}</h1>
      <div className='font-semibold'>Giá: {formatCurrency(dish.price)}</div>
      <p>{dish.description}</p>
    </div>
  )
}
