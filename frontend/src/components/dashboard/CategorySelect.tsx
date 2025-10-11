import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useCategory from "@/context/CategoryContext";

type CategorySelectProps = {
  value: string;
  onChange: (val: string) => void;
  onAddNew?: () => void;
  includeUncategorized?: boolean;
};

export default function CategorySelect({
  value,
  onChange,
  onAddNew,
  includeUncategorized = true,
}: CategorySelectProps) {
  const { categories } = useCategory();

  const uniqueCategories = Array.isArray(categories)
    ? Array.from(new Map(categories.map((c) => [c.id, c])).values())
    : [];

  const hasUncategorized = uniqueCategories.some(
    (c) => c.id === "uncategorized"
  );

  // console.log("uniqueCategories:", uniqueCategories);
  // console.log("CategorySelect value prop:", value);
  // uniqueCategories.forEach((c) => console.log(c.id, c.title));

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

      <SelectContent className="z-[9999]">
        {uniqueCategories.length > 0 ? (
          uniqueCategories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.title}
            </SelectItem>
          ))
        ) : (
          <SelectItem key="empty" value="__empty__" disabled>
            No categories yet
          </SelectItem>
        )}

        {uniqueCategories.length === 0 && (
          <SelectItem key="uncategorized-default" value="uncategorized">
            Uncategorized
          </SelectItem>
        )}

        <SelectItem key="__ADD_NEW__" value="__ADD_NEW__">
          + Add new category
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
