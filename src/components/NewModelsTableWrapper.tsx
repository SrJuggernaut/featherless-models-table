import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { NewModelItem } from '@/types/featherless'
import { formatDate } from '@/utilities/date'
import { useEffect, useState } from 'react'
import NewModelsTable from './NewModelsTable'

const getData = async (apiKey?: string) => {
  const res = await fetch(`https://api.featherless.ai/v1/models${apiKey !== undefined ? '?available_on_current_plan=true' : ''}`, {
    headers: {
      Authorization: apiKey !== undefined ? `Bearer ${apiKey}` : ''
    }
  })
  return await res.json()
}

const NewModelsTableWrapper = () => {
  const [items, setItems] = useState<NewModelItem[]>([])
  const [date, setDate] = useState<string>('01-01-1970 00:00:00')
  const [apiKey, setApiKey] = useState<string>('')
  const [onlyAvailable, setOnlyAvailable] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const items = localStorage.getItem('newModels') !== null ? localStorage.getItem('newModels') : '[]'
      const date = localStorage.getItem('newModelsDate') !== null ? localStorage.getItem('newModelsDate') : '01-01-1970 00:00:00'
      const onlyAvailable = localStorage.getItem('onlyAvailable') !== null ? localStorage.getItem('onlyAvailable') === 'true' : false
      const apiKey = localStorage.getItem('apiKey') !== null ? localStorage.getItem('apiKey') || '' : ''
      if (items && date) {
        setItems(JSON.parse(items))
        setDate(date)
        setOnlyAvailable(onlyAvailable)
        setApiKey(apiKey)
      }
    }
  }, [])

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between   rounded-md border mb-4">
        <div
          className="p-2"
        >
          Last updated: <strong>{formatDate(new Date(date))}</strong>
        </div>
        <div
          className="flex items-center border-y md:border-y-0 md:border-x px-4 py-2 gap-2"
        >
          <Label
            id="onlyAvailableLabel"
            htmlFor="onlyAvailable"
            className="inline-flex text-sm w-max flex-0"
          >
            <span className="w-max pr-2">
              Only available
            </span>
            <Switch
              id="onlyAvailable"
              checked={apiKey !== '' ? onlyAvailable : false}
              disabled={apiKey === ''}
              onCheckedChange={(checked) => {
                if (typeof window !== 'undefined') {
                  localStorage.setItem('onlyAvailable', checked ? 'true' : 'false')
                  setOnlyAvailable(checked)
                }
              }}
              aria-labelledby="onlyAvailableLabel"
            />
          </Label>
          <Label htmlFor="apiKey" className="inline-flex flex-1 text-sm items-center w-max">
            <span className="w-max pr-2">
              API key
            </span>
            <Input
              id="apiKey"
              onChange={(e) => {
                if (typeof window !== 'undefined') {
                  localStorage.setItem('apiKey', e.target.value)
                }
                setApiKey(e.target.value)
              }}
              value={apiKey}
              type="password"
              className={`w-full${apiKey === '' ? ' border-red-500' : ' border-green-500'}`}
              placeholder="API key"
            />
          </Label>
        </div>
        <div
          className="flex justify-end p-2"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={async () => {
                    const { data } = await getData(onlyAvailable !== undefined && apiKey !== '' ? apiKey : undefined)
                    const date = new Date().toISOString()
                    if (typeof window !== 'undefined') {
                      localStorage.setItem('newModels', JSON.stringify(data))
                      localStorage.setItem('newModelsDate', date)
                      setItems(data)
                      setDate(date)
                    }
                  }}
                  type="button"
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
      </div>
      <NewModelsTable items={items} />
    </>
  )
}

export default NewModelsTableWrapper
