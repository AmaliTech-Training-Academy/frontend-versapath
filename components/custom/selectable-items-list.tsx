"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SheetClose } from "@/components/ui/sheet";
import { Loader, PlayCircle } from "lucide-react";
import { useEffect, useState, FC, useRef } from "react";
import { toast } from "sonner";
import { mutate } from "swr";

export interface SelectableItem {
  id: string;
  name: string;
  estimatedHours?: number;
  [key: string]: unknown;
}

export interface SelectableItemsListProps {
  items: SelectableItem[];
  selectedItemIds: string[];
  loading: boolean;
  error?: string | null;
  parentId: string;
  itemType: string; // "lessons", "skills", "tracks"
  itemTypeSingular: string; // "lesson", "skill", "track"
  onUpdate: (params: {
    existingIds: string[];
    selectedIds: string[];
    parentId: string;
  }) => Promise<{ success: boolean; message?: string; errors?: string[] }>;
  mutateKey: string; // SWR cache key to mutate after update
  searchPlaceholder?: string;
  showEstimatedHours?: boolean;
}

export const SelectableItemsList: FC<SelectableItemsListProps> = ({
  items,
  selectedItemIds,
  loading,
  error,
  parentId,
  itemType,
  itemTypeSingular,
  onUpdate,
  mutateKey,
  searchPlaceholder = "Search by name",
  showEstimatedHours = true,
}) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [originalItems, setOriginalItems] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const closeFormRef = useRef<HTMLButtonElement>(null);

  const handleItemCheck = (itemId: string, checked: boolean) => {
    setCheckedItems((prev) =>
      checked
        ? [...new Set([...prev, itemId])]
        : prev.filter((id) => id !== itemId)
    );
  };

  const handleUpdate = async () => {
    setIsSubmitting(true);

    try {
      const response = await onUpdate({
        existingIds: originalItems,
        selectedIds: checkedItems,
        parentId,
      });

      if (!response.success) {
        toast.error(
          response.errors?.[0] ||
            response.message ||
            `Failed to update ${itemType}. Please try again`
        );
        return;
      }

      toast.success(response.message || `${itemType} updated successfully`);
      closeFormRef.current?.click();
      setOriginalItems([...checkedItems]);

      mutate((key: string) => key.startsWith(mutateKey));
    } catch (error) {
      console.error(`Error updating ${itemType}:`, error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (selectedItemIds) {
      setCheckedItems([...new Set(selectedItemIds)]);
      setOriginalItems([...new Set(selectedItemIds)]);
    }
  }, [selectedItemIds]);

  const hasChanges = () => {
    if (originalItems.length !== checkedItems.length) return true;
    return !originalItems.every((id) => checkedItems.includes(id));
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getChangesText = () => {
    const toAdd = checkedItems.filter((id) => !originalItems.includes(id));
    const toRemove = originalItems.filter((id) => !checkedItems.includes(id));

    const parts = [];
    if (toAdd.length > 0) parts.push(`+${toAdd.length} to add`);
    if (toRemove.length > 0) parts.push(`-${toRemove.length} to remove`);

    return parts.join(", ");
  };

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center min-h-[100px]">
          <Loader strokeWidth={1.5} className="animate-spin" size={28} />
          <span className="px-2 text-lg font-semibold text-gray-text-strong">
            {itemType} Loading
          </span>
        </div>
      )}

      {error && !loading && (
        <div className="w-full py-5 text-base h-full flex flex-col items-center justify-center text-center rounded-lg bg-red-fill/10 max-w-[500px] mx-auto space-y-2">
          <p>
            {error ||
              `There was an error loading ${itemType}. Please try again`}
          </p>
        </div>
      )}

      {!error && !loading && (
        <section className="flex flex-col w-full gap-2 px-3">
          <form className="sticky left-0 w-full top-1">
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-base-light-white"
            />
          </form>

          <article className="h-full mt-1 mb-2 space-y-1">
            {filteredItems.map((item) => (
              <div
                className="flex items-center gap-4 p-3 rounded-sm lesson_card_selector"
                key={item.id}
              >
                <Checkbox
                  className="text-gray-text-strong lesson_checkbox"
                  id={item.id}
                  onCheckedChange={(checked) =>
                    handleItemCheck(item.id, Boolean(checked))
                  }
                  checked={checkedItems.includes(item.id)}
                />
                <Label
                  htmlFor={item.id}
                  className="inline-flex flex-col items-start justify-center flex-1 cursor-pointer"
                >
                  <h3 className="text-base leading-normal text-gray-text-strong/90 line-clamp-1">
                    {item.name}
                  </h3>
                  {showEstimatedHours && item.estimatedHours && (
                    <div className="inline-flex items-center justify-start gap-1">
                      <PlayCircle
                        size={10}
                        className="text-gray-text-strong/30"
                      />
                      <h4 className="text-xs leading-tight text-gray-text-strong/50">
                        {item.estimatedHours}{" "}
                        {item.estimatedHours === 1 ? "hour" : "hours"}
                      </h4>
                    </div>
                  )}
                </Label>
              </div>
            ))}
          </article>

          <div className="flex items-center justify-between mb-5">
            <div className="text-sm text-gray-text-weak">
              {hasChanges() && <span>{getChangesText()}</span>}
            </div>

            <div className="flex space-x-3">
              <SheetClose asChild ref={closeFormRef}>
                <Button variant="outline" className="cursor-pointer">
                  Cancel
                </Button>
              </SheetClose>
              <Button
                type="button"
                className="px-5"
                onClick={handleUpdate}
                disabled={isSubmitting || !hasChanges()}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="mr-2 animate-spin" size={16} />
                    Updating...
                  </>
                ) : (
                  `Update ${itemType}`
                )}
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
