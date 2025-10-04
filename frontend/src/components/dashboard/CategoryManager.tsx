import { useState } from "react";
import CategorySelect from "./CategorySelect";
import CategoryDialog from "./CategoryDialog";

type CategoryManagerProps = {
  value: string;
  onChange: (val: string) => void;
};

export default function CategoryManager({ value, onChange }: CategoryManagerProps) {
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
        onCreated={() => setOpenDialog(false)}
      />
    </>
  );
}
