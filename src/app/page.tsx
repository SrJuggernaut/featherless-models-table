import ModelsTable from '@/components/ModelsTable'
import { ApiResponse } from '@/types/featherless'
import { FC } from 'react'

const AN_HOUR_IN_SECONDS = 60 * 60

const getData = async (): Promise<ApiResponse & { date: string }> => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const data = await require('@/data.json')
    // Last data was fetched 9 september 2024
    return {
      ...data,
      date: new Date('2024-09-09').toISOString()
    }
  }
  const res = await fetch('https://api.featherless.ai/feather/models?page=1&perPage=9999', {
    next: {
      revalidate: AN_HOUR_IN_SECONDS
    }
  })
  return { ...await res.json(), date: new Date(res.headers.get('last-modified') as string).toISOString() }
}

const page: FC = async () => {
  const { items, date } = await getData()
  return (
    <div className="container mx-auto py-10">
      <ModelsTable data={items} />
      <p>Data last updated: <strong>{new Date(date).toISOString()}</strong></p>
    </div>
  )
}

export default page
