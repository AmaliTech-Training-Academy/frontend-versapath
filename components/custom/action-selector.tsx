import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const actionSelector = ({
    placeholder,
    values
}: {
    placeholder: string;
    values: {
        label: string;
        val: string;
    }[]
}) => (
        <Select defaultValue="talent">
            <SelectTrigger className="h-9 w-40">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-base-white">
                {
                    values.map((value, i) => (
                        <SelectItem key={i + value.label} value={value.val}>{value.label}</SelectItem>
                    ))
                }
            </SelectContent>
        </Select>
    );