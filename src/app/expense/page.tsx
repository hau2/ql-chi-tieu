"use client";
import { useState, useEffect } from "react";

export default function ExpensePage() {
  const [expenses, setExpenses] = useState<{ category: string; amount: string; date: string }[]>([]);
  const [categories, setCategories] = useState<{ name: string; budget: number }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    const savedCategories = JSON.parse(localStorage.getItem("budgets") || "[]");
    if (savedExpenses.length > 0) setExpenses(savedExpenses);
    if (savedCategories.length > 0) setCategories(savedCategories);
  }, []);

  const handleAddExpense = () => {
    if (!selectedCategory || !amount || !date) {
      setError("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    
    const selectedBudget = categories.find((c) => c.name === selectedCategory);
    if (selectedBudget && parseFloat(amount) > selectedBudget.budget) {
      setError("Chi tiêu vượt quá ngân sách! Hãy điều chỉnh lại.");
      return;
    }

    const newExpense = { category: selectedCategory, amount, date };
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    setAmount("");
    setDate("");
    setError("");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 via-white to-red-100 p-6">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-red-700">📝 Ghi chép chi tiêu</h1>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <label className="block text-gray-700 font-medium mb-1">Chọn danh mục:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-3 border rounded-lg w-full mb-4"
        >
          <option value="">Chọn danh mục</option>
          {categories.map((category, index) => (
            <option key={index} value={category.name}>{category.name} (Ngân sách: {category.budget} VNĐ)</option>
          ))}
        </select>

        <label className="block text-gray-700 font-medium mb-1">Số tiền (VNĐ):</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Nhập số tiền"
          required
          className="p-3 border rounded-lg w-full mb-4"
        />

        <label className="block text-gray-700 font-medium mb-1">Ngày chi tiêu:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="p-3 border rounded-lg w-full mb-4"
        />

        <button
          onClick={handleAddExpense}
          className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
        >
          Thêm chi tiêu
        </button>
      </div>
    </main>
  );
}
