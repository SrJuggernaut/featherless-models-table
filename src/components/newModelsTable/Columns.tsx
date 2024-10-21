import { NewModelItem } from '@/types/featherless'
import { formatDate } from '@/utilities/date'
import { ColumnDef } from '@tanstack/react-table'
import ActionsCell from '../ActionsCell'

const columns: ColumnDef<NewModelItem>[] = [
  { accessorKey: 'actions', cell: (props) => <ActionsCell id={props.row.original.id} />, enableColumnFilter: false, enableSorting: false, enableHiding: false },
  { accessorKey: 'id', header: 'ID', enableSorting: false },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'created', header: 'Created', enableColumnFilter: false, cell: (props) => formatDate(new Date(parseInt(props.getValue() as string) * 1000)) },
  { accessorKey: 'model_class', header: 'Class' },
  { accessorKey: 'context_length', header: 'Context Length' },
  { accessorKey: 'max_completion_tokens', header: 'Max Completion Tokens' },
  { accessorKey: 'is_gated', header: 'Gated' }

]

export default columns
