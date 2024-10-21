'use client'
import { Badge } from '@/components/ui/badge'
import { ModelItem } from '@/types/featherless'
import { formatDate } from '@/utilities/date'
import { ColumnDef } from '@tanstack/react-table'
import ActionsCell from '../ActionsCell'

const columns: ColumnDef<ModelItem>[] = [
  { accessorKey: 'actions', cell: (props) => <ActionsCell id={props.row.original.id} />, enableColumnFilter: false, enableSorting: false, enableHiding: false },
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
