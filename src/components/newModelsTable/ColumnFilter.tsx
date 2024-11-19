import { NewModelItem } from '@/types/featherless'
import { Column } from '@tanstack/react-table'
import { X } from 'lucide-react'
import { FC } from 'react'
import ComboBox from '../ui/ComboBox'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export type ColumnFilterProps = {
  column: Column<NewModelItem>
}

const ColumnFilter: FC<ColumnFilterProps> = ({ column }) => {
  if (column.getCanFilter()) {
    switch (column.id as keyof NewModelItem) {
      case 'max_completion_tokens':
      case 'context_length':
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
