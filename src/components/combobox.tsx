'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { DropdownOption } from '@/types/dropdown-option.type';

type ComboBoxProps = {
  value?: string;
  placeholderForUnselected?: string;
  placeholderForSearch?: string;
  placeholderForNotFound?: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
};

export function Combobox(props: ComboBoxProps) {
  const {
    value: valueFromProps = '',
    options,
    onChange,
    placeholderForSearch = 'Search...',
    placeholderForUnselected = 'Select an option',
    placeholderForNotFound = 'No option found.',
  } = props;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(valueFromProps);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholderForUnselected}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholderForSearch} />
          <CommandEmpty>{placeholderForNotFound}</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.id}
                value={option.value}
                onSelect={() => {
                  /**
                   * If the option is already selected, then deselect it.
                   */
                  const newValue = option.value === value ? '' : option.value;
                  setValue(newValue);
                  onChange(newValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === option.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
