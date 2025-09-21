import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useExpense from "@/context/ExpenseContext";
// import useCategoryApi from "@/hooks/useCategoryApi"; //only for categories
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Expense() {
  const { expenses, addExpense } = useExpense(); //  only context
  const { response: categoryResponse, getAllCategories } = useCategoryApi();
  const [categories, setCategories] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: 0,
    categoryId: "",
    date: new Date().toISOString(),
  });

  // fetch categories once
  useEffect(() => {
    getAllCategories("/api/v1/category/");
  }, []);

  useEffect(() => {
    if (categoryResponse) setCategories(categoryResponse);
  }, [categoryResponse]);

  //  current month total
  const currentMonthTotal = useMemo(() => {
    const now = new Date();
    return expenses
      .filter((e) => {
        const d = new Date(e.date);
        return (
          d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
        );
      })
      .reduce((sum, e) => sum + e.amount, 0);
  }, [expenses]);

  // hart data
  const chartData = useMemo(() => {
    const grouped: Record<string, number> = {};
    expenses.forEach((e) => {
      const d = new Date(e.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      });
      grouped[d] = (grouped[d] || 0) + e.amount;
    });
    return Object.entries(grouped).map(([date, total]) => ({
      date,
      total,
    }));
  }, [expenses]);

  return (
    <div className="p-6 space-y-10">
      {/* ===== TOP: Expense Chart ===== */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Expenses Overview</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#16a34a" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ===== CENTER: Current Month Total ===== */}
      <Card className="bg-green-50 border-green-200 text-center shadow-sm">
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

      {/* ===== BOTTOM: Manage Expenses ===== */}
      <div className="space-y-6">
        {/* Add Expense Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600 transition">
              + Add Expense
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">
                Add New Expense
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4 mt-3">
              {/* Description */}
              <Input
                placeholder="Description"
                value={newExpense.description}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, description: e.target.value })
                }
              />

              {/* Amount */}
              <Input
                type="number"
                placeholder="Amount"
                value={newExpense.amount || ""}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, amount: Number(e.target.value) })
                }
              />

              {/* Category */}
              <Select
                value={newExpense.categoryId}
                onValueChange={(val) =>
                  setNewExpense({ ...newExpense, categoryId: val })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Save */}
              <Button
                onClick={async () => {
                  await addExpense(newExpense); //  saves to API + context
                  setOpen(false);
                  setNewExpense({
                    description: "",
                    amount: 0,
                    categoryId: "",
                    date: new Date().toISOString(),
                  });
                }}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Save Expense
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Expense List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Recent Expenses</h2>
          {expenses.length === 0 ? (
            <p className="text-gray-500">No expenses yet. Add one above 👆</p>
          ) : (
            expenses.map((expense) => (
              <Card key={expense.id} className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base font-medium">
                    {expense.description}
                  </CardTitle>
                  <span className="text-green-600 font-semibold">
                    ₹{expense.amount}
                  </span>
                </CardHeader>
                <CardContent className="text-sm text-gray-500">
                  Category:{" "}
                  {categories.find((c) => c.id === expense.categoryId)?.name ??
                    "Uncategorized"}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Expense;
