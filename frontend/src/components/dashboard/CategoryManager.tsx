import { useState } from "react";
import CategorySelect from "./CategorySelect";
import CategoryDialog from "./CategoryDialog";

export default function CategoryManager() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div>
      <CategorySelect
        value={selectedCategory}
        onChange={setSelectedCategory}
        onAddNew={() => setIsDialogOpen(true)} 
      />

      <CategoryDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen} 
        onCreated={() => {
          setIsDialogOpen(false);
        }}
      />
    </div>
  );
}
