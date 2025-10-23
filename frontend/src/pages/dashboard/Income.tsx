"use client";

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
import { Plus } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import useIncome from "@/context/IncomeContext";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function Income() {
  const { incomes, addIncome, updateIncome, removeIncome, loading } =
    useIncome();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState("Monthly");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [selectedIncome, setSelectedIncome] = useState<string | null>(null);
  const [openIncomeDialog, setOpenIncomeDialog] = useState(false);
  const [saving, setSaving] = useState(false);

  // handle create / update
  const handleSave = async () => {
    if (!title.trim()) return toast.error("Please enter a title.");
    if (!amount.trim() || isNaN(parseFloat(amount)))
      return toast.error("Please enter a valid amount.");

    setSaving(true);
    try {
      if (selectedIncome) {
        await updateIncome(selectedIncome, {
          title,
          description,
          amount: parseFloat(amount),
          isRecurring,
          frequency,
          date: new Date().toISOString(),
          paymentMethod, 
        });
        toast.success("Income updated successfully ✅");
      } else {
        await addIncome({
          title,
          description,
          amount: parseFloat(amount),
          currency: "INR",
          date: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          isRecurring,
          frequency,
          paymentMethod, 
        });
        toast.success("Income added successfully 🎉");
      }

      setOpenIncomeDialog(false);

      // reset form
      setTitle("");
      setAmount("");
      setDescription("");
      setIsRecurring(false);
      setFrequency("Monthly");
      setSelectedIncome(null);
      setPaymentMethod("Cash");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setSaving(false);
    }
  };

  const chartData = incomes.map((i) => ({
    name: new Date(i.date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    }),
    amount: i.amount,
  }));

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Income</h2>
        <Dialog open={openIncomeDialog} onOpenChange={setOpenIncomeDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} /> Add Income
            </Button>
          </DialogTrigger>
          <DialogContent className="z-[99]">
            <DialogHeader>
              <DialogTitle>
                {selectedIncome ? "Update Income" : "Add Income"}
              </DialogTitle>
              <DialogDescription>
                Track your income sources here.
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
                placeholder="Title"
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

              <div className="flex items-center gap-2">
                <Checkbox
                  checked={isRecurring}
                  onCheckedChange={(val) => setIsRecurring(val as boolean)}
                />
                <label>Recurring Income?</label>
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

              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>

              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : selectedIncome ? "Update" : "Save"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p>Loading Incomes...</p>
      ) : (
        <Tabs defaultValue="list" className="w-full">
          <TabsList>
            <TabsTrigger value="list">List</TabsTrigger>
            <TabsTrigger value="chart">Chart</TabsTrigger>
          </TabsList>

          {/* List View */}
          <TabsContent value="list">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {incomes.map((i) => (
                <motion.div
                  key={i.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <CardContent className="p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{i.title}</h3>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeIncome(i.id)}
                        >
                          Delete
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(i.date).toLocaleDateString()} • {i.currency}
                      </p>
                      <p className="font-medium">₹ {i.amount}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Chart View */}
          <TabsContent value="chart" className="bg-D-blue p-4">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#22c55e" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
