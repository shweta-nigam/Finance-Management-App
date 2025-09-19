import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import React from 'react'

function Expense() {

    const [newExpense, setNewExpense] = 

  return (
    <div>
        <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button className="bg-green-500">+ Add Expense</Button>
  </DialogTrigger>

  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add New Expense</DialogTitle>
    </DialogHeader>

    <div className="flex flex-col gap-3">
      <Input
        placeholder="Description (e.g. Lunch at McDonalds)"
        value={newExpense.description}
        onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
      />
      <Input
        type="number"
        placeholder="Amount"
        value={newExpense.amount}
        onChange={(e) => setNewExpense({...newExpense, amount: Number(e.target.value)})}
      />
      <select
        value={newExpense.categoryId}
        onChange={(e) => setNewExpense({...newExpense, categoryId: e.target.value})}
      >
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <Button
        onClick={() => {
          addExpense(newExpense); // calls POST /api/v1/expense
          setOpen(false);
        }}
        className="bg-green-600 text-white"
      >
        Save
      </Button>
    </div>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default Expense