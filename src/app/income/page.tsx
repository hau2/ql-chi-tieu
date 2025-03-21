"use client";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function IncomePage() {
  const [income, setIncome] = useState<{ source: string; amount: number; date: string }[]>([]);
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  
  useEffect(() => {
    const savedIncome = JSON.parse(localStorage.getItem("income") || "[]");
    setIncome(Array.isArray(savedIncome) ? savedIncome : []);
  }, []);

  const handleAddIncome = () => {
    if (!source.trim() || !amount.trim()) return;
    const newIncome = {
      source,
      amount: Number(amount),
      date: new Date().toISOString().slice(0, 7),
    };
    const updatedIncome = [...income, newIncome];
    setIncome(updatedIncome);
    localStorage.setItem("income", JSON.stringify(updatedIncome));
    setSource("");
    setAmount("");
  };

  const filteredIncome = income.filter(item => item.date === selectedMonth);
  const totalIncome = filteredIncome.reduce((sum, item) => sum + item.amount, 0);

  const chartData = {
    labels: filteredIncome.map((item) => item.source),
    datasets: [
      {
        label: "Thu nhập",
        data: filteredIncome.map((item) => item.amount),
        backgroundColor: "#4CAF50",
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
        className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 w-full"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-green-700">💰 Kê khai thu nhập</h1>
        <label className="block text-gray-700 font-medium mb-2">Chọn tháng:</label>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="w-full p-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-3"
        />
        
        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="Nguồn thu nhập"
          className="w-full p-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-3"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Nhập số tiền (VNĐ)"
          className="w-full p-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-3"
        />
        <button
          onClick={handleAddIncome}
          className="w-full py-3 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition"
        >
          ➕ Thêm thu nhập
        </button>

        <h2 className="text-lg font-semibold mt-6">📊 Tổng thu nhập ({selectedMonth}): {totalIncome.toLocaleString()} VNĐ</h2>
        {filteredIncome.length > 0 && <Bar data={chartData} className="mt-4" />}
      </motion.div>
    </motion.main>
  );
}
