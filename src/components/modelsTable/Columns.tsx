'use client'
import { Badge } from '@/components/ui/badge'
import { ModelItem } from '@/types/featherless'
import { formatDate } from '@/utilities/date'
import { ColumnDef } from '@tanstack/react-table'
import { Copy, Feather } from 'lucide-react'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

const columns: ColumnDef<ModelItem>[] = [
  { accessorKey: 'actions', cell: (props) => (
    <div className="grid grid-flow-col gap-1">
      <Button
        size="icon"
        asChild
      >
        <a target="_blank" href={`https://featherless.ai/models/${props.row.original.id}`}><Feather size="1em" /></a>
      </Button>
      <Button
        size="icon"
        asChild
      >
        <a target="_blank" href={`https://huggingface.co/${props.row.original.id}`} className="text-xs p-2">🤗</a>
      </Button>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              onClick={() => navigator.clipboard.writeText(props.row.original.id)}
            >
              <Copy size="1em" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy ID to clipboard</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

    </div>
  ), enableColumnFilter: false, enableSorting: false, enableHiding: false },
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'owned_by', header: 'Owner' },
  { accessorKey: 'model_class', header: 'Class' },
  { accessorKey: 'favorites', header: 'Favorites' },
  { accessorKey: 'downloads', header: 'Downloads' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'health', header: 'Health' },
  { accessorKey: 'avg_rating', header: 'Rating', cell: (props) => { return <p className="text-center">{props.getValue() as number}</p> } },
  { accessorKey: 'total_reviews', header: 'Reviews', cell: (props) => { return <p className="text-center">{props.getValue() as number}</p> } },
  { accessorKey: 'acc_tags', header: 'Tags', cell: (props) => { return (props.getValue() as string[] ?? []).map((tag) => <Badge key={tag}>{tag}</Badge>) } },
  { accessorKey: 'is_gated', header: 'Gated', cell: (props) => { return <p className="text-center">{props.getValue() as boolean | undefined ? 'Yes' : 'No'}</p> } },
  { accessorKey: 'created_at', header: 'Created', sortingFn: (rowA, rowB, columnId) => { return new Date(rowA.getValue(columnId) as string).getTime() - new Date(rowB.getValue(columnId) as string).getTime() }, cell: (props) => formatDate(new Date(props.getValue() as string)) },
  { accessorKey: 'updated_at', header: 'Modified', sortingFn: (rowA, rowB, columnId) => { return new Date(rowA.getValue(columnId) as string).getTime() - new Date(rowB.getValue(columnId) as string).getTime() }, cell: (props) => formatDate(new Date(props.getValue() as string)) }
]

export default columns
