import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useExpense from "@/context/ExpenseContext";
import useCategory from "@/context/CategoryContext";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Expense, PaymentMethod } from "@/types";
import { toast } from "sonner";

import CategorySelect from "@/components/dashboard/CategorySelect";
import CategoryDialog from "@/components/dashboard/CategoryDialog";

const defaultExpense: Expense = {
  id: "",
  title: "",
  description: "",
  amount: 0,
  currency: "INR",
  categoryId: "uncategorized",
  paymentMethod: "Cash",
  isRecurring: false,
  tags: [],
  date: new Date().toISOString(),
};

export default function Expense() {
  const { expenses, addExpense } = useExpense();
  const { categories } = useCategory();

  const [loading, setLoading] = useState(true);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [newExpense, setNewExpense] = useState<Expense>(defaultExpense);
  const [tagsInput, setTagsInput] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    console.log("Expense component mounted", {
      expensesLength: expenses.length,
    });
  }, []);

  useEffect(() => {
      setLoading(false);
  }, [expenses]);

  const currentMonthTotal = useMemo(() => {
    const now = new Date();
    return (expenses || [])
      .filter((e) => e?.date)
      .filter((e) => {
        const d = new Date(e.date);
        return (
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      })
      .reduce((sum, e) => sum + Number(e.amount), 0);
  }, [expenses]);

  const chartData = useMemo(() => {
    const grouped: Record<string, number> = {};
    (expenses || []).forEach((e) => {
      if (!e?.date) return;
      const d = new Date(e.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      });
      grouped[d] = (grouped[d] || 0) + Number(e.amount);
    });
    return Object.entries(grouped).map(([date, total]) => ({ date, total }));
  }, [expenses]);

  const handleSaveExpense = async () => {
    if (!newExpense.title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (!newExpense.amount || Number(newExpense.amount) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    setSaving(true);

    try {
      const finalExpense: Expense = {
        ...newExpense,
        tags: tagsInput
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        date: new Date().toISOString(),
        categoryId: newExpense.categoryId || "uncategorized",
      };

      await addExpense(finalExpense);

      toast.success("Expense Added", {
        description: "Your expense was saved successfully!",
      });

      setOpen(false);
      setNewExpense(defaultExpense);
      setTagsInput("");
    } catch (error: any) {
      console.error("handleSaveExpense error:", error);
      toast.error("Failed to Save Expense", {
        description:
          error?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 space-y-10">
      {loading ? (
        <p>Loading Expenses...</p>      ) : (
        <>
          {/* ===== Expense Chart ===== */}
          <Card className="bg-D-blue shadow-md text-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Expenses Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#16a34a"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* ===== Current Month Total ===== */}
          <Card className="bg-green-50 border-green-200 text-center shadow-sm bg-D-blue">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-green-700">
                This Month’s Spending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-extrabold text-green-600">
                ₹{currentMonthTotal}
              </p>
            </CardContent>
          </Card>

          {/* ===== Manage Expenses ===== */}
          <div className="space-y-6">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-500 hover:bg-green-600 transition">
                  + Add Expense
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-md z-[9999]">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold">
                    Add New Expense
                  </DialogTitle>
                  <DialogDescription>
                    Fill in the details below to record a new expense.
                  </DialogDescription>
                </DialogHeader>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveExpense();
                  }}
                  className="flex flex-col gap-4 mt-3"
                >
                  <Input
                    placeholder="Title"
                    value={newExpense.title}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, title: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Description"
                    value={newExpense.description}
                    onChange={(e) =>
                      setNewExpense({
                        ...newExpense,
                        description: e.target.value,
                      })
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={newExpense.amount === "" ? "" : newExpense.amount}
                    onChange={(e) =>
                      setNewExpense({
                        ...newExpense,
                        amount:
                          e.target.value === "" ? "" : Number(e.target.value),
                      })
                    }
                  />

                  <Select
                    value={newExpense.currency}
                    onValueChange={(val) =>
                      setNewExpense({ ...newExpense, currency: val })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {["INR", "USD", "EUR"].map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={newExpense.paymentMethod}
                    onValueChange={(val: PaymentMethod) =>
                      setNewExpense({ ...newExpense, paymentMethod: val })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Payment Method" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Cash", "Card", "UPI", "Bank Transfer"].map(
                        (method) => (
                          <SelectItem key={method} value={method}>
                            {method}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>

                  <CategorySelect
                    value={newExpense.categoryId}
                    onChange={(val: any) =>
                      setNewExpense({ ...newExpense, categoryId: val })
                    }
                    onAddNew={() => setShowCategoryDialog(true)}
                  />

                  {showCategoryDialog && (
                    <CategoryDialog
                      triggerLabel="Hidden"
                      onCreated={(cat: any) => {
                        setNewExpense((p) => ({ ...p, categoryId: cat.id }));
                        setShowCategoryDialog(false);
                      }}
                    />
                  )}

                  {/*  Recurring Checkbox */}
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={newExpense.isRecurring}
                      onChange={(e) =>
                        setNewExpense({
                          ...newExpense,
                          isRecurring: e.target.checked,
                        })
                      }
                    />
                    Recurring Expense
                  </label>

                  {/*  Tags Input */}
                  <Input
                    placeholder="Tags (comma separated)"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                  />

                  <Button
                    disabled={saving}
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white mt-2"
                  >
                    {saving ? "Saving..." : "Save Expense"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            {/* Expense List */}
            <div className="space-y-4 text-white">
              <h2 className="text-lg font-semibold">Recent Expenses</h2>

              {!expenses || expenses.length === 0 ? (
                <p className="text-gray-500">
                  No expenses yet. Add one above 👆
                </p>
              ) : (
                expenses.filter(Boolean).map((expense) => {
                  if (!expense) return null;

                  console.log("expense:", expense);
                  const category = categories.find(
                    (c) => c.id === expense.categoryId
                  );
                  console.log("matched category:", category);

                  return (
                    <Card key={expense.id} className="shadow-sm bg-D-blue text-white">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-base font-medium">
                          {expense.title}
                        </CardTitle>
                        <span className="text-green-600 font-semibold">
                          ₹{expense.amount}
                        </span>
                      </CardHeader>
                      <CardContent className="text-sm text-gray-500">
                        Category: {category ? category.title : "Uncategorized"}
                        <br />
                        Payment: {expense.paymentMethod}
                        <br />
                        Recurring: {expense.isRecurring ? "Yes" : "No"}
                        <br />
                        Tags:{" "}
                        {expense.tags?.length > 0
                          ? expense.tags.join(", ")
                          : "None"}
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
