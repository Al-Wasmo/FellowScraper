import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


export function DropDownMenu({options, defaultOption, onSelectOption, ...props}) {
  onSelectOption = onSelectOption ?? function()  {};
  defaultOption = defaultOption ?? "";

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultOption);



  return (
    <Popover   open={open} onOpenChange={setOpen}    >
      <PopoverTrigger  asChild>
        <Button 
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        {...props}
>
          {value
            ? options.find((option) => option.value === value)?.label
            : "Find by what"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search options..." className="h-9" />
          <CommandList>
            <CommandEmpty>Nope :(</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onSelectOption(currentValue);
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
