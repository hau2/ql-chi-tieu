"use client";
import { useState, useEffect } from "react";

export default function IncomePage() {
  const [income, setIncome] = useState("");

  useEffect(() => {
    const savedIncome = localStorage.getItem("income") || "";
    setIncome(savedIncome);
  }, []);

  const handleSave = () => {
    localStorage.setItem("income", income);
    alert("💾 Đã lưu thu nhập!");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 p-6">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">
          💰 Kê khai thu nhập tháng
        </h1>

        <label className="block text-gray-700 font-medium mb-2">
          Tổng thu nhập (VNĐ):
        </label>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          placeholder="VD: 15,000,000"
          className="p-3 border rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleSave}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Lưu thu nhập
        </button>
      </div>
    </main>
  );
}
