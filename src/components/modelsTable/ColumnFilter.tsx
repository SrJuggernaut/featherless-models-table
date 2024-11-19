import ComboBox from '@/components/ui/ComboBox'
import { Input } from '@/components/ui/input'
import { ModelItem } from '@/types/featherless'
import { Column } from '@tanstack/react-table'
import { X } from 'lucide-react'
import { FC } from 'react'
import { Button } from '../ui/button'

export type ColumnFilterProps = {
  column: Column<ModelItem>
}

const ColumnFilter: FC<ColumnFilterProps> = ({ column }) => {
  if (column.getCanFilter()) {
    switch (column.id as keyof ModelItem) {
      case 'status':
      case 'owned_by':
      case 'health':
      case 'model_class':{
        const autoCompleteSuggestions = Array.from(column.getFacetedUniqueValues().keys()).sort().slice(0, 5000)
        const currentValue = column.getFilterValue() as string || ''
        return (
          <div className="flex">
            <ComboBox
              value={currentValue}
              onChange={(value) => column.setFilterValue(value)}
              options={autoCompleteSuggestions.map((value) => ({ value, label: value }))}
              placeholder={column.columnDef.header as string}
            />
            {currentValue !== '' && (
              <Button
                variant="outline"
                size="icon"
                className="aspect-square"
                onClick={() => column.setFilterValue(undefined)}
                type="button"
              >
                <X size="1em" />
              </Button>
            )}
          </div>
        )
      }
      case 'total_reviews':
      case 'avg_rating':{
        const [min, max] = column.getFacetedMinMaxValues() ?? [0, 1]
        const currentMin = (column.getFilterValue() as [number, number] || [min, max])[0]
        const currentMax = (column.getFilterValue() as [number, number] || [min, max])[1]
        return (
          <div className="flex">
            <Input
              value={(column.getFilterValue() as number[] || [min, max])[0]}
              onChange={(event) => {
                const newMinValue = Number(event.target.value)
                if (newMinValue >= currentMax || isNaN(newMinValue) || newMinValue < min) {
                  column.setFilterValue([currentMin, currentMax])
                  return
                }
                column.setFilterValue([newMinValue, currentMax])
              }}
            />
            <Input
              value={(column.getFilterValue() as number[] || [min, max])[1]}
              onChange={(event) => {
                const newMaxValue = Number(event.target.value)
                if (newMaxValue <= currentMin || isNaN(newMaxValue) || newMaxValue > max) {
                  column.setFilterValue([currentMin, currentMax])
                  return
                }
                column.setFilterValue([currentMin, newMaxValue])
              }}
            />
          </div>
        )
      }
      default:
        return (
          <Input
            value={column.getFilterValue() as string}
            onChange={(event) => {
              column.setFilterValue(event.target.value)
            }}
          />
        )
    }
  }
  return null
}

export default ColumnFilter
