/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend);

export default function ReportPage() {
  const [expenses, setExpenses] = useState<{ category: string; amount: number; date: string }[]>([]);
  const [budgets, setBudgets] = useState<{ name: string; budget: number }[]>([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    const savedBudgets = JSON.parse(localStorage.getItem("budgets") || "[]");
    setExpenses(savedExpenses);
    setBudgets(savedBudgets);

    const totalSpentAmount = savedExpenses.reduce((sum: number, exp: any) => sum + Number(exp.amount), 0);
    const totalBudgetAmount = savedBudgets.reduce((sum: number, bud: any) => sum + Number(bud.budget), 0);

    setTotalSpent(totalSpentAmount);
    setTotalBudget(totalBudgetAmount);
  }, []);

  const categoryTotals = budgets.map((budget) => {
    const totalSpent = expenses
      .filter((expense) => expense.category === budget.name)
      .reduce((sum, expense) => sum + Number(expense.amount), 0);
    return {
      category: budget.name,
      budget: budget.budget,
      spent: totalSpent,
      percentage: ((totalSpent / budget.budget) * 100).toFixed(2),
    };
  });

  const barData = {
    labels: categoryTotals.map((item) => item.category),
    datasets: [
      {
        label: "Ngân sách",
        data: categoryTotals.map((item) => item.budget),
        backgroundColor: "#4CAF50",
      },
      {
        label: "Đã chi tiêu",
        data: categoryTotals.map((item) => item.spent),
        backgroundColor: "#F44336",
      },
    ],
  };

  const pieData = {
    labels: categoryTotals.map((item) => item.category),
    datasets: [
      {
        data: categoryTotals.map((item) => item.spent),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800", "#9C27B0"],
      },
    ],
  };

  const lineData = {
    labels: Array.from(new Set(expenses.map((e) => e.date))).sort(),
    datasets: [
      {
        label: "Chi tiêu theo ngày",
        data: Array.from(new Set(expenses.map((e) => e.date))).sort().map((date) => {
          return expenses.filter((e) => e.date === date).reduce((sum, e) => sum + Number(e.amount), 0);
        }),
        fill: false,
        borderColor: "#3B82F6",
        tension: 0.3,
      },
    ],
  };

  return (
    <motion.main
      className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 p-6 flex flex-col items-center"
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
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">📊 Báo cáo chi tiêu</h1>
        <p className="text-lg font-semibold text-gray-700">💰 Tổng ngân sách: {totalBudget.toLocaleString()} VNĐ</p>
        <p className="text-lg font-semibold text-red-600">💸 Đã chi tiêu: {totalSpent.toLocaleString()} VNĐ</p>
        <p className="text-lg font-semibold text-green-600">💵 Còn lại: {(totalBudget - totalSpent).toLocaleString()} VNĐ</p>

        {categoryTotals.some(item => parseFloat(item.percentage) >= 90) && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mt-4 text-sm">
            ⚠️ Một số danh mục sắp vượt ngân sách! Hãy kiểm tra lại chi tiêu của bạn.
          </div>
        )}

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-center text-gray-700">📈 Biểu đồ cột</h2>
          <Bar data={barData} />
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-center text-gray-700">🍩 Tỉ lệ chi tiêu</h2>
          <Pie data={pieData} />
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-center text-gray-700">📉 Xu hướng chi tiêu theo ngày</h2>
          <Line data={lineData} />
        </div>
      </motion.div>
    </motion.main>
  );
}
