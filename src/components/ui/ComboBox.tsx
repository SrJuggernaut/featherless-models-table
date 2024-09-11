'use client'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { ChevronsUpDown } from 'lucide-react'
import { FC, useState } from 'react'
import { Button } from './button'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

export interface ComboBoxProps {
  value: string
  onChange: (value: string) => void
  options: { label: string, value?: string }[]
  placeholder?: string
}

const ComboBox: FC<ComboBoxProps> = ({ value, onChange, options, placeholder }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-max justify-between"
          >
            {
              value
                ? options.find((option) => option.value === value)?.label
                : placeholder
                  ? placeholder
                  : 'Select an option'
            }
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search option..." />
            <CommandList>
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup>
                {options.map((option, index) => (
                  <CommandItem
                    key={`option-${index}-${option.value}`}
                    value={option.value}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? '' : currentValue)
                      setOpen(false)
                    }}
                  >
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default ComboBox
