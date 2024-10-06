"use client";

import * as React from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FilterStatus } from "@/lib/model";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const statuses = [
  {
    label: "all",
    value: FilterStatus.ALL,
  },
  {
    label: "completed",
    value: FilterStatus.COMPLETED,
  },
  {
    label: "incomplete",
    value: FilterStatus.INCOMPLETE,
  },
];

export default function Filter() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleFilter(status: string) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1"); //reset to initial page to avoid bugs
    params.set("status", status.toString());
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] flex justify-end"
        >
          {value
            ? `Status: ${
                statuses.find((status) => status.value.toString() === value)
                  ?.label
              }`
            : "Status: all"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {statuses.map((status) => (
                <CommandItem
                  key={status.value}
                  value={status.value.toString()}
                  onSelect={(currentValue: string) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    handleFilter(currentValue);
                  }}
                >
                  {status.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
