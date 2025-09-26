import * as React from "react";
import { ChevronsUpDown, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
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
  onSearch?: (query: string) => Promise<{
    results: string[];
    resultIds?: { name: string; id: string }[];
  }>;
  searchPlaceholder?: string;
  onNewInput?: (newInputs: string[]) => void;
}

export function MultipleSelectChip({
  defaultTags,
  value = [],
  onChange,
  placeholder = "Select tags",
  label = "Tags",
  addNewAllowed = true,
  onSearch,
  searchPlaceholder,
  onNewInput,
}: Readonly<MultipleSelectChipProps>) {
  const [open, setOpen] = React.useState(false);
  const [names, setNames] = React.useState<string[]>(defaultTags);
  const [search, setSearch] = React.useState("");
  const [apiResults, setApiResults] = React.useState<string[]>([]);
  const [apiResultsMapping, setApiResultsMapping] = React.useState<
    Record<string, string>
  >({});
  const [isSearching, setIsSearching] = React.useState(false);
  const [newApiSelections, setNewApiSelections] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!onSearch || !search.trim()) {
      setApiResults([]);
      setApiResultsMapping({});
      setIsSearching(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsSearching(true);
      try {
        const searchResult = await onSearch(search);
        if (typeof searchResult === "object" && "results" in searchResult) {
          setApiResults(searchResult.results);
          if (searchResult.resultIds) {
            const mapping: Record<string, string> = {};
            searchResult.resultIds.forEach((item) => {
              mapping[item.name] = item.id;
            });
            setApiResultsMapping(mapping);
          }
        } else {
          setApiResults(searchResult as string[]);
        }
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search, onSearch]);

  const allAvailableOptions = React.useMemo(() => {
    const combined = [...names, ...apiResults];
    return Array.from(new Set(combined));
  }, [names, apiResults]);
  const filteredOptions = React.useMemo(() => {
    if (!search.trim()) return allAvailableOptions;
    return allAvailableOptions.filter((option) =>
      option.toLowerCase().includes(search.toLowerCase())
    );
  }, [allAvailableOptions, search]);
  const handleApiSelection = (tagValue: string, isSelected: boolean) => {
    const isFromApiResults =
      apiResults.includes(tagValue) && !names.includes(tagValue);
    const apiResultId = apiResultsMapping[tagValue];

    if (!isFromApiResults || !apiResultId) return;

    if (isSelected) {
      const updatedNewSelections = [...newApiSelections, apiResultId];
      setNewApiSelections(updatedNewSelections);
      onNewInput?.(updatedNewSelections);
    } else {
      const updatedNewSelections = newApiSelections.filter(
        (id) => id !== apiResultId
      );
      setNewApiSelections(updatedNewSelections);
      onNewInput?.(updatedNewSelections);
    }
  };
  const toggleValue = (tagValue: string) => {
    const isCurrentlySelected = value.includes(tagValue);
    const newSelected = isCurrentlySelected
      ? value.filter((v) => v !== tagValue)
      : [...value, tagValue];
    handleApiSelection(tagValue, !isCurrentlySelected);

    onChange?.(newSelected);
  };

  const addNewValue = () => {
    if (search.trim() && !allAvailableOptions.includes(search)) {
      const newTag = search.trim();
      setNames((prev) => [...prev, newTag]);
      const newSelected = [...value, newTag];
      onChange?.(newSelected);
      setSearch("");
      setOpen(false);
    }
  };
  const getInputPlaceholder = () => {
    if (searchPlaceholder) return searchPlaceholder;
    if (onSearch && addNewAllowed) return "Search API or type to add...";
    if (onSearch) return "Search API...";
    return addNewAllowed ? "Search or type to add..." : "Type to search...";
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
          <Command
            className="bg-base-light-white p-1 border-none tabs_scrollbar"
            key={apiResults.join(",")}
          >
            <CommandInput
              placeholder={getInputPlaceholder()}
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              {isSearching && (
                <CommandItem disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </CommandItem>
              )}

              {addNewAllowed &&
                search &&
                !allAvailableOptions.includes(search) && (
                  <CommandItem onSelect={addNewValue}>
                    <Plus className="mr-2 h-4 w-4" /> Add "{search}"
                  </CommandItem>
                )}

              {!isSearching &&
                filteredOptions.length === 0 &&
                search.trim() && <CommandEmpty>No results found.</CommandEmpty>}

              {!isSearching && filteredOptions.length > 0 && (
                <>
                  {filteredOptions.map((name) => (
                    <CommandItem key={name} onSelect={() => toggleValue(name)}>
                      <Checkbox
                        checked={value.includes(name)}
                        className="dark:data-[state=checked]:text-base-light-white data-[state=checked]:text-base-light-white bg-base-light-white mr-2"
                      />
                      {name}
                    </CommandItem>
                  ))}
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
