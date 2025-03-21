import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          💸 Quản lý chi tiêu cá nhân
        </h1>
        <ul className="space-y-4 text-lg">
          <li>
            <Link className="block p-3 bg-blue-100 rounded-lg hover:bg-blue-200 transition" href="/income">
              ➕ Kê khai thu nhập
            </Link>
          </li>
          <li>
            <Link className="block p-3 bg-green-100 rounded-lg hover:bg-green-200 transition" href="/budget">
              📊 Thiết lập ngân sách
            </Link>
          </li>
          <li>
            <Link className="block p-3 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition" href="/expense">
              📝 Ghi chép chi tiêu
            </Link>
          </li>
          <li>
            <Link className="block p-3 bg-purple-100 rounded-lg hover:bg-purple-200 transition" href="/report">
              📈 Xem báo cáo
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}