"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TransactionsPage() {
  const [expenses, setExpenses] = useState<{ category: string; amount: number; date: string }[]>([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    setExpenses(savedExpenses);
    setFilteredExpenses(savedExpenses);
  }, []);

  useEffect(() => {
    if (filterCategory) {
      setFilteredExpenses(expenses.filter((expense) => expense.category === filterCategory));
    } else {
      setFilteredExpenses(expenses);
    }
  }, [filterCategory, expenses]);

  const handleDelete = (index: number) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
    setFilteredExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  return (
    <motion.main
      className="min-h-screen bg-gradient-to-br from-yellow-100 via-white to-red-100 p-6 flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6 w-full"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-red-700">📜 Lịch sử giao dịch</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Lọc theo danh mục:</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="p-3 border rounded-lg w-full"
          >
            <option value="">Tất cả</option>
            {Array.from(new Set(expenses.map((expense) => expense.category))).map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="overflow-y-auto max-h-80">
          {filteredExpenses.length > 0 ? (
            filteredExpenses.map((expense, index) => (
              <motion.div
                key={index}
                className="p-4 mb-2 bg-gray-100 rounded-lg shadow-sm flex justify-between items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div>
                  <p className="text-lg font-semibold">{expense.category}</p>
                  <p className="text-sm text-gray-500">{expense.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-lg font-semibold text-red-600">- {expense.amount.toLocaleString()} VNĐ</p>
                  <button
                    onClick={() => handleDelete(index)}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                  >
                    Xóa
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500">Không có giao dịch nào.</p>
          )}
        </div>
      </motion.div>
    </motion.main>
  );
}
