import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useCategory from "@/context/CategoryContext";
import { toast } from "sonner";
import type { Category } from "@/types";

type Props = {
  triggerLabel?: string;
  onCreated?: (cat: Category) => void;
};

export default function CategoryDialog({ triggerLabel = "+ Add Category", onCreated }: Props) {
  const { addCategory } = useCategory(); 
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    const name = title.trim();
    if (!name) {
      toast.error("Enter category name");
      return;
    }
    setLoading(true);
    try {
      const created = await addCategory({ title: name }); 
      toast.success("Category created");
      setTitle("");
      setOpen(false);
      onCreated?.(created);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create category");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button>{triggerLabel}</Button></DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>Give this category a name</DialogDescription>
        </DialogHeader>
        <div className="mt-3 flex gap-2">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Category name" />
          <Button onClick={handleCreate} disabled={loading}>{loading ? "Creating…" : "Create"}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
