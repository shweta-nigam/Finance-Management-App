import { useState } from "react";
import { motion } from "framer-motion";
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
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Plus } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import CategorySelect from "@/components/dashboard/CategorySelect";
import CategoryDialog from "@/components/dashboard/CategoryDialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useBudget from "@/context/BudgetContext";

export default function Budget() {
  const { budgets, addBudget, updateBudget, removeBudget, loading } =
    useBudget();

  // form state
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState("Monthly");
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);

  const [openBudgetDialog, setOpenBudgetDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [saving, setSaving] = useState(false);

  // handle create / update
  const handleSave = async () => {
    console.log({
      title,
      amount,
      categoryId,
      isRecurring,
      frequency,
      selectedBudget,
    });
    console.log("title", title, "amount :", amount, "categoryId", categoryId);
    if (!title || !amount || !categoryId) return;

    setSaving(true);
    try {
      if (selectedBudget) {
        await updateBudget(selectedBudget, {
          title,
          description,
          amount: parseFloat(amount),
          categoryId,
          isRecurring,
          frequency,
        });
      } else {
        await addBudget({
          title,
          description,
          amount: parseFloat(amount),
          limit: parseFloat(amount),
          categoryId,
          currency: "INR",
          date: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          isRecurring,
          frequency,
        });
      }

      setOpenBudgetDialog(false);

      // reset form
      setTitle("");
      setAmount("");
      setCategoryId("");
      setDescription("");
      setIsRecurring(false);
      setFrequency("Monthly");
      setSelectedBudget(null);
    } catch (err) {
      console.error("Error saving budget:", err);
    } finally {
      setSaving(false);
    }
  };

  // chart data
  const chartData = budgets.map((b) => ({
    name: new Date(b.date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    }),
    amount: b.amount,
  }));

  // render
  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Budgets</h2>
        <Dialog open={openBudgetDialog} onOpenChange={setOpenBudgetDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} /> Add Budget
            </Button>
          </DialogTrigger>
          <DialogContent className="z-[99]">
            <DialogHeader>
              <DialogTitle>
                {selectedBudget ? "Update Budget" : "Create Budget"}
              </DialogTitle>
              <DialogDescription>
                Assign a budget to a specific category.
              </DialogDescription>
            </DialogHeader>
            <form
              className="space-y-4 mt-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <Input
                placeholder="Budget Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <CategorySelect
                value={categoryId}
                onChange={setCategoryId}
                onAddNew={() => setOpenCategoryDialog(true)}
              />

              <div className="flex items-center gap-2">
                <Checkbox
                  checked={isRecurring}
                  onCheckedChange={(val) => setIsRecurring(val as boolean)}
                />
                <label>Recurring Budget?</label>
              </div>

              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Daily">Daily</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>

              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : selectedBudget ? "Update" : "Save"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {openCategoryDialog && (
        <CategoryDialog
          open={openCategoryDialog}
          onOpenChange={setOpenCategoryDialog}
          onCreated={() => {
            setOpenCategoryDialog(false);
          }}
        />
      )}

      {loading ? (
        <p>Loading Budgets...</p>
      ) : (
        <Tabs defaultValue="list" className="w-full">
          <TabsList>
            <TabsTrigger value="list">List</TabsTrigger>
            <TabsTrigger value="chart">Chart</TabsTrigger>
          </TabsList>

          {/* List View */}
          <TabsContent value="list">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {budgets.map((b) => (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <CardContent className="p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{b.title}</h3>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeBudget(b.id)}
                        >
                          Delete
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(b.date).toLocaleDateString()} • {b.currency}
                      </p>
                      <Progress value={70} />
                      <p className="font-medium">₹ {b.amount}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Chart View */}
          <TabsContent value="chart">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
