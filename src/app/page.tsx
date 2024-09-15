import ModelsTable from '@/components/ModelsTable'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ApiResponse, ModelItem } from '@/types/featherless'
import { formatDate } from '@/utilities/date'
import { FC, useEffect, useState } from 'react'

export const revalidate = 3600 // 1 hour

const getData = async (): Promise<ApiResponse> => {
  const res = await fetch('https://api.featherless.ai/feather/models?page=1&perPage=9999', {})
  return await res.json()
}

const HomePage: FC = () => {
  const [items, setItems] = useState<ModelItem[]>([])
  const [date, setDate] = useState<string>('01-01-1970 00:00:00')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const items = localStorage.getItem('items') !== null ? localStorage.getItem('items') : '[]'
      const date = localStorage.getItem('date') !== null ? localStorage.getItem('date') : '01-01-1970 00:00:00'
      if (items && date) {
        setItems(JSON.parse(items))
        setDate(date)
      }
    }
  }, [])

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center rounded-md border mb-4 p-2">
        <div>Last updated: <strong>{formatDate(new Date(date))}</strong></div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={async () => {
                const { items } = await getData()
                const date = new Date().toISOString()
                if (typeof window !== 'undefined') {
                  localStorage.setItem('items', JSON.stringify(items))
                  localStorage.setItem('date', date)
                  setItems(items)
                  setDate(date)
                }
                console.log(items)
              }}
              >
                Refresh
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>This updates the list of models and the last update date. Due to the amount of data being updated, it is recommended not to do this frequently.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <ModelsTable data={items} />

    </div>
  )
}

export default HomePage
