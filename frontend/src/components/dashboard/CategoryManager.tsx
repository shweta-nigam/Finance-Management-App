import { useState } from "react";
import CategorySelect from "./CategorySelect";
import CategoryDialog from "./CategoryDialog";
import type { Category } from "@/types";

type CategoryManagerProps = {
  value: string;
  onChange: (val: string) => void;
  onCreated?: (category: Category) => void;
};

export default function CategoryManager({
  value,
  onChange,
}: CategoryManagerProps) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <CategorySelect
        value={value}
        onChange={onChange}
        onAddNew={() => setOpenDialog(true)}
      />
      <CategoryDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onCreated={(newCategory) => {
          onChange(newCategory.id); // auto-select new category in Budget
          setOpenDialog(false);
        }}
      />
    </>
  );
}
