import { Button } from '@/components/ui/button'
import { Copy, Feather } from 'lucide-react'
import { FC } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

export interface ActionsCellProps {
  id: string
}
const ActionsCell: FC<ActionsCellProps> = ({ id }) => {
  return (
    <div className="grid grid-flow-col gap-1">
      <Button
        size="icon"
        asChild
      >
        <a target="_blank" href={`https://featherless.ai/models/${id}`}><Feather size="1em" /></a>
      </Button>
      <Button
        size="icon"
        asChild
      >
        <a target="_blank" href={`https://huggingface.co/${id}`} className="text-xs p-2">🤗</a>
      </Button>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              onClick={() => navigator.clipboard.writeText(id)}
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
  )
}

export default ActionsCell
