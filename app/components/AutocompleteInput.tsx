import * as React from "react"
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function AutocompleteInput({ onSelect }: { onSelect: (value: string) => void }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const commonQuestions = [
    "How do I improve soil fertility?",
    "What are the best practices for pest control?",
    "How can I increase crop yield?",
    "What crops are suitable for Uganda's climate?",
    "How do I start a small-scale farm?",
    "What are sustainable farming techniques?",
    "How do I manage water resources efficiently?",
    "What are the signs of plant diseases?",
    "How do I choose the right fertilizer?",
    "What are the best harvesting techniques?",
  ]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border-[#2C5F2D] text-[#5E503F] hover:bg-[#F4F1DE] hover:text-[#2C5F2D]"
        >
          {value ? value : "Ask anything about farming..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search farming questions..." className="text-[#5E503F]" />
          <CommandEmpty className="text-[#5E503F]">No question found.</CommandEmpty>
          <CommandGroup>
            {commonQuestions && commonQuestions.map((question) => (
              <CommandItem
                key={question}
                onSelect={() => {
                  setValue(question)
                  onSelect(question)
                  setOpen(false)
                }}
                className="text-[#5E503F] hover:bg-[#F4F1DE] hover:text-[#2C5F2D]"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === question ? "opacity-100" : "opacity-0"
                  )}
                />
                {question}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

