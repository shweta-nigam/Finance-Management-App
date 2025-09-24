import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useCategory from "@/context/CategoryContext";
import type { Category } from "@/types";

type Props = {
  value: string;
  onChange: (val: string) => void;
  onAddNew?: () => void; // called when user picks "+ Add new"
  includeUncategorized?: boolean;
};

export default function CategorySelect({
  value,
  onChange,
  onAddNew,
  includeUncategorized = true,
}: Props) {
  const { categories } = useCategory();

  return (
    <Select
      value={value}
      onValueChange={(val) => {
        if (val === "__ADD_NEW__") {
          onAddNew?.();
          return;
        }
        onChange(val);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((cat: Category) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.title}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="uncategorized" disabled>
            Loading categories…
          </SelectItem>
        )}
        {includeUncategorized && (
          <SelectItem value="uncategorized">Uncategorized</SelectItem>
        )}
        <SelectItem value="__ADD_NEW__">+ Add new category</SelectItem>
      </SelectContent>
    </Select>
  );
}
