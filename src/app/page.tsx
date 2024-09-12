import ModelsTable from '@/components/ModelsTable'
import { ApiResponse } from '@/types/featherless'
import { formatDate } from '@/utilities/date'
import { FC } from 'react'

export const revalidate = 3600 // 1 hour

const getData = async (): Promise<ApiResponse & { lastUpdated: string, date: string }> => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const data = await require('@/data.json')
    // Last data was fetched 9 september 2024
    return {
      ...data,
      date: new Date('2024-09-09').toISOString(),
      lastUpdated: new Date('2024-09-09').toISOString()
    }
  }
  const res = await fetch('https://api.featherless.ai/feather/models?page=1&perPage=9999', {
    next: {
      revalidate: 60
    }
  })
  return { ...await res.json(), lastUpdated: new Date(res.headers.get('last-modified') as string).toISOString(), date: new Date(res.headers.get('date') as string) }
}

const page: FC = async () => {
  const { items, date, lastUpdated } = await getData()
  return (
    <div className="container mx-auto py-10">
      <ModelsTable data={items} />
      <p>Last time fetched: <strong>{formatDate(new Date(date))}</strong> | Last updated: <strong>{formatDate(new Date(lastUpdated))}</strong></p>
    </div>
  )
}

export default page
