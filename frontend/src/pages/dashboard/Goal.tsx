import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Goal = {
  id: number;
  title: string;
  target: number;
  deadline: string;
  description: string;
  completed: boolean;
};

function Goal() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [form, setForm] = useState({
    title: "",
    target: "",
    deadline: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addGoal = () => {
    if (!form.title || !form.target || !form.deadline) return;

    const newGoal: Goal = {
      id: Date.now(),
      title: form.title,
      target: Number(form.target),
      deadline: form.deadline,
      description: form.description,
      completed: false,
    };
    setGoals([...goals, newGoal]);
    setForm({ title: "", target: "", deadline: "", description: "" });
  };

  const toggleComplete = (id: number) => {
    setGoals(goals.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g)));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-transparent bg-clip-text">
        Financial Goals
      </h1>

      {/* Add Goal Form */}
      <Card className="shadow-lg border border-blue-200">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-blue-700">Set a New Goal</h2>

          <Input
            name="title"
            placeholder="Goal Title (e.g. Buy a Laptop)"
            value={form.title}
            onChange={handleChange}
          />
          <Input
            name="target"
            type="number"
            placeholder="Target Amount (₹)"
            value={form.target}
            onChange={handleChange}
          />
          <Input
            name="deadline"
            type="date"
            value={form.deadline}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description (optional)"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />

          <Button
            className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white font-medium rounded-md"
            onClick={addGoal}
          >
            Add Goal
          </Button>
        </CardContent>
      </Card>

      {/* Active Goals */}
      <div>
        <h2 className="text-xl font-semibold text-blue-700 mb-3">Active Goals</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {goals.filter((g) => !g.completed).map((goal) => (
            <Card key={goal.id} className="border border-blue-200 shadow-md">
              <CardContent className="p-4 space-y-2">
                <h3 className="text-lg font-bold text-blue-800">{goal.title}</h3>
                <p className="text-sm text-gray-600">Target: ₹{goal.target}</p>
                <p className="text-sm text-gray-600">Deadline: {goal.deadline}</p>
                {goal.description && (
                  <p className="text-sm text-gray-500">{goal.description}</p>
                )}
                <Button
                  variant="outline"
                  className="mt-2 border-blue-500 text-blue-600"
                  onClick={() => toggleComplete(goal.id)}
                >
                  Mark as Completed
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Previous Goals */}
      <div>
        <h2 className="text-xl font-semibold text-blue-700 mb-3">Previous Goals</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {goals.filter((g) => g.completed).map((goal) => (
            <Card key={goal.id} className="border border-gray-200 bg-gray-50">
              <CardContent className="p-4 space-y-2">
                <h3 className="text-lg font-bold text-gray-600 line-through">
                  {goal.title}
                </h3>
                <p className="text-sm text-gray-500">Target: ₹{goal.target}</p>
                <p className="text-sm text-gray-500">Deadline: {goal.deadline}</p>
                {goal.description && (
                  <p className="text-sm text-gray-400">{goal.description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Goal;
