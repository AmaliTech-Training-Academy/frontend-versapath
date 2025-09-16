import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";

interface MultipleSelectChipProps {
  defaultTags: string[];
  value?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  label?: string;
  addNewAllowed?: boolean;
}

export function MultipleSelectChip({
  defaultTags,
  value = [],
  onChange,
  placeholder = "Select tags",
  label = "Tags",
  addNewAllowed = true,
}: Readonly<MultipleSelectChipProps>) {
  const [open, setOpen] = React.useState(false);
  const [names, setNames] = React.useState<string[]>(defaultTags);
  const [search, setSearch] = React.useState("");

  const toggleValue = (tagValue: string) => {
    const newSelected = value.includes(tagValue)
      ? value.filter((v) => v !== tagValue)
      : [...value, tagValue];

    onChange?.(newSelected);
  };

  const addNewValue = () => {
    if (search.trim() && !names.includes(search)) {
      const newTag = search.trim();
      setNames((prev) => [...prev, newTag]);
      const newSelected = [...value, newTag];
      onChange?.(newSelected);
      setSearch("");
      setOpen(false);
    }
  };

  return (
    <div className="w-full max-w-xl space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="bg-background">
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full grid grid-cols-[1fr_auto] justify-between shadow-xs min-h-[42px] h-auto py-2 px-3 flex-wrap border border-gray-stroke-weak hover:text-gray-text-strong hover:bg-base-light-white",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            )}
          >
            {value.length > 0 ? (
              <div className="flex flex-wrap gap-1 w-full text-left">
                {value.map((val) => (
                  <Badge
                    key={val}
                    className="py-1 px-3 font-light text-xs bg-gray-text-strong/5 rounded-full border border-gray-stroke-weak"
                  >
                    {val}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground/90 text-start">
                {placeholder}
              </p>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 self-center" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[350px] p-0 border-none tabs_scrollbar">
          <Command className="bg-base-light-white p-1 border-none tabs_scrollbar">
            <CommandInput
              placeholder={
                addNewAllowed ? "Search or type to add..." : "Type to search..."
              }
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              {addNewAllowed && search && !names.includes(search) && (
                <CommandItem onSelect={addNewValue}>
                  <Plus className="mr-2 h-4 w-4" /> Add "{search}"
                </CommandItem>
              )}
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {names.map((name) => (
                  <CommandItem key={name} onSelect={() => toggleValue(name)}>
                    <Checkbox
                      checked={value.includes(name)}
                      className="dark:data-[state=checked]:text-base-light-white data-[state=checked]:text-base-light-white bg-base-light-white mr-2"
                    />
                    {name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
