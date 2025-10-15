"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Target, PlusCircle } from "lucide-react";

type Goal = {
  id: number;
  title: string;
  target: number;
  deadline: string;
  description: string;
  completed: boolean;
};

export default function Goal() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [form, setForm] = useState({
    title: "",
    target: "",
    deadline: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    setGoals(
      goals.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g))
    );
  };

  return (
    <div className="p-6 space-y-10 text-white">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00aaff] via-[#540979] to-[#0066ff] text-transparent bg-clip-text">
          Financial Goals
        </h1>
      </div>

      {/* Add Goal Form */}
      <Card className="bg-D-blue border border-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-white">
            <Target className="w-5 h-5 text-indigo-400" />
            Set a New Goal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              name="title"
              placeholder="Goal Title (e.g. Buy a Laptop)"
              value={form.title}
              onChange={handleChange}
              className="bg-gray-900 border-gray-700 text-white"
            />
            <Input
              name="target"
              type="number"
              placeholder="Target Amount (₹)"
              value={form.target}
              onChange={handleChange}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              name="deadline"
              type="date"
              value={form.deadline}
              onChange={handleChange}
              className="bg-gray-900 border-gray-700 text-white"
            />
            <textarea
              name="description"
              placeholder="Description (optional)"
              value={form.description}
              onChange={handleChange}
              className="bg-gray-900 border border-gray-700 text-white rounded-md p-2"
            />
          </div>

          <Button
            onClick={addGoal}
            className="w-full bg-gradient-to-r from-[#00aaff] via-[#540979] to-[#0066ff] hover:opacity-90 text-white font-medium rounded-md flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4" /> Add Goal
          </Button>
        </CardContent>
      </Card>

      {/* Active Goals */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-white/90">
          Active Goals
        </h2>
        {goals.filter((g) => !g.completed).length === 0 ? (
          <p className="text-gray-400">No active goals yet. Start by adding one!</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {goals
              .filter((g) => !g.completed)
              .map((goal, i) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="bg-gray-900/70 border border-gray-700 hover:shadow-lg hover:shadow-indigo-500/20 transition">
                    <CardContent className="p-5 space-y-2">
                      <h3 className="text-lg font-semibold text-indigo-300">
                        {goal.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        🎯 Target: <span className="text-white">₹{goal.target}</span>
                      </p>
                      <p className="text-sm text-gray-400">
                        ⏰ Deadline:{" "}
                        <span className="text-white">{goal.deadline}</span>
                      </p>
                      {goal.description && (
                        <p className="text-sm text-gray-500">
                          {goal.description}
                        </p>
                      )}
                      <Button
                        variant="outline"
                        onClick={() => toggleComplete(goal.id)}
                        className="mt-3 border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Mark as Completed
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        )}
      </section>

      {/* Completed Goals */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-white/90">
          Completed Goals
        </h2>
        {goals.filter((g) => g.completed).length === 0 ? (
          <p className="text-gray-400">No goals completed yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {goals
              .filter((g) => g.completed)
              .map((goal, i) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="bg-gray-800 border border-gray-700 opacity-80">
                    <CardContent className="p-5 space-y-2">
                      <h3 className="text-lg font-semibold text-gray-400 line-through">
                        {goal.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Target: ₹{goal.target}
                      </p>
                      <p className="text-sm text-gray-500">
                        Deadline: {goal.deadline}
                      </p>
                      {goal.description && (
                        <p className="text-sm text-gray-500">
                          {goal.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        )}
      </section>
    </div>
  );
}
