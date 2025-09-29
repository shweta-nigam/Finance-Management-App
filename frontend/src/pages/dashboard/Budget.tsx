import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Plus } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useBudget from "@/context/BudgetContext";
import CategorySelect from "@/components/dashboard/CategorySelect";
import CategoryDialog from "@/components/dashboard/CategoryDialog";
import useCategory from "@/context/CategoryContext";



export default function Budget() {
  const { budget, addBudget } = useBudget();
  const { categories } = useCategory();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);

  const [newBudget, setNewBudget] = useState({
    categoryId: "uncategorized",
    limit: 0,
    perDay: 0,
  });

 const handleSaveBudget = async () => {
    if (!newBudget.categoryId || !newBudget.limit) return;

    await addBudget({
      ...newBudget
    });

    setNewBudget({ categoryId: "uncategorized", limit: 0, perDay: 0 });
    setDialogOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Tabs */}
      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="flex justify-center gap-6">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="merchants">Merchants</TabsTrigger>
        </TabsList>

        {/* Categories Tab */}
        <TabsContent value="categories" className="mt-6 space-y-4">
          {/* Add Budget Button */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full flex items-center gap-2">
                <Plus className="w-5 h-5" /> Add Budget
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Budget</DialogTitle>
                <DialogDescription>
                  Assign a budget limit to a category.
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-3 mt-4">
                <CategorySelect
                  value={newBudget.categoryId}
                  onChange={(val) => setNewBudget({ ...newBudget, categoryId: val })}
                  onAddNew={() => setShowCategoryDialog(true)}
                />

                {showCategoryDialog && (
                  <CategoryDialog
                    triggerLabel="Hidden"
                    onCreated={(cat) => {
                      setNewBudget((p) => ({ ...p, categoryId: cat.id }));
                      setShowCategoryDialog(false);
                    }}
                  />
                )}

                <Input
                  type="number"
                  placeholder="Limit"
                  value={newBudget.limit || ""}
                  onChange={(e) =>
                    setNewBudget({ ...newBudget, limit: Number(e.target.value) })
                  }
                />

                <Input
                  type="number"
                  placeholder="Per Day"
                  value={newBudget.perDay || ""}
                  onChange={(e) =>
                    setNewBudget({ ...newBudget, perDay: Number(e.target.value) })
                  }
                />

                <Button onClick={handleSaveBudget} className="bg-blue-600 text-white">
                  Save
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Render Budget */}
          {!budget ? (
            <p className="text-center opacity-80">No budgets yet. Add one!</p>
          ) : (
            (() => {
              const category = categories.find((c) => c.id === budget.categoryId);
              const spent = 0; // later: calculate from expenses for this category
              const progress = budget.limit > 0 ? (spent / budget.limit) * 100 : 0;

              return (
                <Card key={budget.id} className="bg-white/10 border-none rounded-2xl shadow-lg">
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <p className="font-semibold">{category?.title || "Uncategorized"}</p>
                      <p className="text-xs opacity-70">₹{budget.perDay} per day</p>
                    </div>
                    <Progress value={progress} className="mb-2" />
                    <div className="flex justify-between text-sm">
                      <p className="text-pink-400">₹{spent}</p>
                      <p className="opacity-70">₹{budget.limit}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })()
          )}
        </TabsContent>

        {/* Merchants Tab */}
        <TabsContent value="merchants" className="mt-6">
          <p className="opacity-80 text-center">[ Merchants Data Coming Soon ]</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
