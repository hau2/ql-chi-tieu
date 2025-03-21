"use client";
import { useState, useEffect } from "react";

export default function BudgetPage() {
  const [budgets, setBudgets] = useState<{ name: string; budget: string }[]>([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const savedBudgets = JSON.parse(localStorage.getItem("budgets") || "[]");
    if (savedBudgets.length > 0) {
      setBudgets(savedBudgets);
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    const updatedBudgets = [...budgets];
    updatedBudgets[index].budget = value;
    setBudgets(updatedBudgets);
  };

  const handleAddCategory = () => {
    if (newCategory.trim() === "") return;
    setBudgets([...budgets, { name: newCategory, budget: "" }]);
    setNewCategory("");
  };

  const handleSave = () => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
    alert("💾 Đã lưu ngân sách!");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 p-6">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-green-700">📊 Thiết lập ngân sách</h1>

        {budgets.map((category, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              {category.name} (VNĐ):
            </label>
            <input
              type="number"
              value={category.budget}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder="Nhập số tiền"
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        ))}

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Nhập khoản chi mới"
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAddCategory}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            ➕
          </button>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
        >
          Lưu ngân sách
        </button>
      </div>
    </main>
  );
}