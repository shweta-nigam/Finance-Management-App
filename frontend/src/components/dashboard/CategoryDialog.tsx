import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useCategory from "@/context/CategoryContext";
import { toast } from "sonner";
import type { Category } from "@/types";

type CategoryDialogProps = {
  triggerLabel?: string;
  onCreated?: (category: Category) => void;
  open?: boolean; // controlled
  onOpenChange?: (open: boolean) => void; // controlled
};

export default function CategoryDialog({
  onCreated,
  open: controlledOpen,
  onOpenChange,
}: CategoryDialogProps) {
  const { addCategory } = useCategory();

  // if not controlled → use our own state
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = onOpenChange ?? setUncontrolledOpen;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [type, setType] = useState<"Income" | "Expense">("Expense");

  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    const name = title.trim();
    if (!name) {
      toast.error("Enter category name");
      return;
    }
    if (!description.trim()) {
      toast.error("Enter category description");
      return;
    }
    setLoading(true);
    try {
      const saved = await addCategory({
        title: name,
        description: description.trim(),
      });

      toast.success("Category created");
      setTitle("");
      setDescription("");
      setOpen(false);

      onCreated?.(saved);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create category");
    } finally {
      setLoading(false);
    }
  }

  // console.log("categoryDialog component loaded...");
  // console.log("Creating category:", { title, description, type });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm z-[99999]">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>Give this category a name</DialogDescription>
        </DialogHeader>
        <div className="mt-3 flex flex-col gap-3">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Category name"
          />
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Category description"
          />
          {/* <select
            className="border rounded p-2"
            value={type}
            onChange={(e) => setType(e.target.value as "Income" | "Expense")}
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select> */}
          <Button onClick={handleCreate} disabled={loading}>
            {loading ? "Creating…" : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
