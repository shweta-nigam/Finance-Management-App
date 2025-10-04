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

type CategoryDialogProps = {
  triggerLabel?: string;
  onCreated?: () => void;
  open?: boolean; // controlled
  onOpenChange?: (open: boolean) => void; // controlled
};

export default function CategoryDialog({
  triggerLabel = "+ Add Category",
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
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    const name = title.trim();
    if (!name) {
      toast.error("Enter category name");
      return;
    }
    setLoading(true);
    try {
      await addCategory({ title: name });
      toast.success("Category created");
      setTitle("");
      setOpen(false); // works for both controlled and uncontrolled
      onCreated?.();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create category");
    } finally {
      setLoading(false);
    }
  }

  console.log("categoryDialog component loaded...")

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>Give this category a name</DialogDescription>
        </DialogHeader>
        <div className="mt-3 flex gap-2">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Category name"
          />
          <Button onClick={handleCreate} disabled={loading}>
            {loading ? "Creating…" : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
