"use client"; // if you’re in Next.js 13 app router
import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Budget {
  id: string;
  title: string;
  description?: string;
  amount: number;
  date: string;
  currency?: string;
  isDeleted?: boolean;
}

export default function BudgetPage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    amount: "",
    date: "",
  });

  // Fetch budgets
  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/budgets"); // proxy to backend
      setBudgets(res.data.data.budgets);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  // Create budget
  const handleCreate = async () => {
    try {
      await axios.post("/api/budgets", {
        ...form,
        amount: parseFloat(form.amount),
      });
      setForm({ title: "", description: "", amount: "", date: "" });
      setShowForm(false);
      fetchBudgets();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to create budget");
    }
  };

  // Delete budget
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this budget?")) return;
    try {
      await axios.delete(`/api/budgets/${id}`);
      fetchBudgets();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete budget");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">💰 My Budgets</h1>
        <button
          className="btn btn-primary flex items-center gap-2"
          onClick={() => setShowForm(true)}
        >
          <Plus size={18} /> Add Budget
        </button>
      </div>

      {loading && <p>Loading budgets...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Budgets List */}
      <div className="grid md:grid-cols-2 gap-4">
        {budgets.map((b) => (
          <div
            key={b.id}
            className="card bg-base-100 shadow-md p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold">{b.title}</h2>
              <p className="text-gray-500">{b.description}</p>
              <p className="mt-2 font-bold text-green-600">
                {b.currency || "₹"} {b.amount}
              </p>
              <p className="text-sm text-gray-400">
                {new Date(b.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="btn btn-sm btn-outline">
                <Pencil size={16} /> Edit
              </button>
              <button
                className="btn btn-sm btn-error text-white"
                onClick={() => handleDelete(b.id)}
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Budget Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="card bg-base-100 shadow-lg w-96 p-6">
            <h2 className="text-xl font-bold mb-4">Add New Budget</h2>
            <input
              type="text"
              placeholder="Title"
              className="input input-bordered w-full mb-3"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              className="textarea textarea-bordered w-full mb-3"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Amount"
              className="input input-bordered w-full mb-3"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
            <input
              type="date"
              className="input input-bordered w-full mb-3"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-ghost"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleCreate}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
