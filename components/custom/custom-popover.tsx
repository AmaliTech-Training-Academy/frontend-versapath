import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function CustomPopover({
  children,
  trigger,
  classes
}: {
  readonly children: React.ReactNode;
  readonly trigger: React.ReactNode;
  readonly classes: string;
}) {
  return (
    <Popover >
      <PopoverTrigger asChild>
        {trigger}
      </PopoverTrigger>
      <PopoverContent className={classes} side="top" sideOffset={15} >{children}</PopoverContent>
    </Popover>
  );
}
