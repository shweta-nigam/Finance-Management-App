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
import { useBudgetApi } from "@/hooks/useBudget";
import useBudget from "@/context/BudgetContext";

type Category = {
  name: string;
  spent: number | "";
  limit: number | "";
  perDay: number | "";
};

export default function () {
  const [activeTab, setActiveTab] = useState("categories");
  const [categories, setCategories] = useState<Category[]>([]);
  const { response, chartData, month, getAllBudgets } = useBudgetApi();
  const { budget, addBudget } = useBudget();

  // fetch data once on mount
  useEffect(() => {
    getAllBudgets("/api/v1/budget/");
  }, []);

  // when response changes , sync with context
useEffect(()=>{
  if(response && response.length > 0){
    addBudget(response[0])
  }
},[response])

  const [newCategory, setNewCategory] = useState<Category>({
    name: "",
    spent: "",
    limit: "",
    perDay: "",
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="relative rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 p-6 mb-6 shadow-xl">
      <div className="text-center mb-4">
        <p className="text-4xl font-bold">
          ₹{budget?.amount?.toLocaleString() ?? response?.[0]?.amount?.toLocalString() ?? "0.00"}
        </p>
        <p className="opacity-80">{month}</p>
      </div>
      {/* Chart */}
      <div className="h-32 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="day" stroke="#fff" />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                background: "#1E293B",
                borderRadius: "10px",
                color: "#fff",
              }}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#fff"
              strokeWidth={2.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex justify-center gap-6 bg-transparent border-b border-white/20">
          <TabsTrigger
            value="categories"
            className="data-[state=active]:border-b-2 data-[state=active]:border-white px-4 py-2"
          >
            Categories
          </TabsTrigger>
          <TabsTrigger
            value="merchants"
            className="data-[state=active]:border-b-2 data-[state=active]:border-white px-4 py-2"
          >
            Merchants
          </TabsTrigger>
        </TabsList>

        {/* Categories Tab */}
        <TabsContent value="categories" className="mt-6 space-y-4">
          {/* Add Category Button */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 rounded-xl shadow-md flex items-center gap-2">
                <Plus className="w-5 h-5" /> Add Category
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>
                  Fill out the details to create a new budget category.
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-3 mt-4 z-1000">
                <div>
                  <label className="text-sm font-medium">Category Name</label>
                  <Input
                    placeholder="e.g. Food"
                    value={newCategory.name}
                    onChange={(e) =>
                      setNewCategory({ ...newCategory, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Spent Amount</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={newCategory.spent === "" ? "" : newCategory.spent}
                    onChange={(e) =>
                      setNewCategory({
                        ...newCategory,
                        spent:
                          e.target.value === "" ? "" : Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Limit</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={newCategory.limit === "" ? "" : newCategory.limit}
                    onChange={(e) =>
                      setNewCategory({
                        ...newCategory,
                        limit:
                          e.target.value === "" ? "" : Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Per Day</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={newCategory.perDay === "" ? "" : newCategory.perDay}
                    onChange={(e) =>
                      setNewCategory({
                        ...newCategory,
                        perDay:
                          e.target.value === "" ? "" : Number(e.target.value),
                      })
                    }
                  />
                </div>

                <Button
                  onClick={() => {
                    if (!newCategory.name || !newCategory.limit) return;
                    setCategories([...categories, { ...newCategory }]);
                    setNewCategory({
                      name: "",
                      spent: "",
                      limit: "",
                      perDay: "",
                    });
                    setDialogOpen(false);
                  }}
                  className="bg-blue-600 text-white"
                >
                  Save
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Render Categories */}
          {categories.length === 0 ? (
            <p className="text-center opacity-80">
              No categories yet. Add one!
            </p>
          ) : (
            categories.map((cat: any, i) => {
              const progress = (cat.spent / cat.limit) * 100;
              const status =
                cat.spent < cat.limit
                  ? { msg: "You are still on track", color: "text-green-400" }
                  : {
                      msg: "You are exceeding your budget",
                      color: "text-red-400",
                    };

              return (
                <Card
                  key={i}
                  className="bg-white/10 border-none rounded-2xl shadow-lg"
                >
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <p className="font-semibold">{cat.name}</p>
                      <p className="text-xs opacity-70">
                        ${cat.perDay} per day
                      </p>
                    </div>
                    <Progress value={progress} className="mb-2" />
                    <div className="flex justify-between text-sm">
                      <p className="text-pink-400">${cat.spent.toFixed(2)}</p>
                      <p className="opacity-70">${cat.limit.toFixed(2)}</p>
                    </div>
                    <p className={`text-xs mt-1 ${status.color}`}>
                      {status.msg}
                    </p>
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>

        {/* Merchants Tab */}
        <TabsContent value="merchants" className="mt-6">
          <p className="opacity-80 text-center">
            [ Merchants Data Coming Soon ]
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
