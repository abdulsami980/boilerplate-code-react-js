// src/pages/portal/Dashboard.jsx
import { Card, CardContent } from "@/components/ui/card";
// import { ComingSoonOverlay } from "@/components/ui/Loaders";
import {
  ArrowUpRight,
  BarChart3,
  Package,
  Target,
  TrendingUp
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
      value: "$1,284.00",
      sub: "↑ 11% vs last 28 days",
      icon: <BarChart3 className="text-green-600" size={20} />,
      accent: "from-green-500/10 to-green-500/0",
    },
    {
      title: "Total Products",
      value: "122 items",
      sub: "↑ 4% this month",
      icon: <Package className="text-green-600" size={20} />,
      accent: "from-green-400/10 to-green-400/0",
    },
    {
      title: "Latest Churn",
      value: "7.81%",
      sub: "↓ 1.2% vs avg",
      icon: <TrendingUp className="text-green-600" size={20} />,
      accent: "from-green-300/10 to-green-300/0",
    },
    {
      title: "Boost Sales",
      value: "8 Recommendations",
      sub: "See all actions →",
      icon: <Target className="text-green-600" size={20} />,
      accent: "from-green-200/10 to-green-200/0",
    },
  ];

  const products = [
    {
      name: "Trailblazer Backpack",
      price: "$89.99",
      stock: 112,
      sales: 45,
      risk: "Low",
    },
    {
      name: "SolarFlare Lantern",
      price: "$34.95",
      stock: 43,
      sales: 25,
      risk: "Low",
    },
    {
      name: "AeroFlex Tent",
      price: "$159.00",
      stock: 18,
      sales: 12,
      risk: "Medium",
    },
  ];

  return (
    <>
      {/* <ComingSoonOverlay /> */}
      <div className="space-y-8">
        {/* Greeting */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-green-700 tracking-tight">
              Hello, Antoine 👋
            </h1>
            <p className="text-gray-500 text-sm">
              Displaying insights for{" "}
              <span className="font-medium">June 2025</span>
            </p>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow-md transition-all flex items-center gap-2">
            <ArrowUpRight size={16} /> Add Product Batch
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((card, i) => (
            <Card
              key={i}
              className={`relative overflow-hidden bg-gradient-to-br ${card.accent} backdrop-blur-sm border border-green-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl`}
            >
              <CardContent className="p-5 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <p className="text-gray-500 text-sm">{card.title}</p>
                  {card.icon}
                </div>
                <h2 className="text-2xl font-semibold text-green-700">
                  {card.value}
                </h2>
                <p className="text-green-600 text-xs font-medium">{card.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analytics + Product Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Analytics Placeholder */}
          <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-5 transition-all hover:shadow-md">
            <h3 className="font-semibold text-green-700 mb-3 text-lg flex items-center gap-2">
              Quick Analytics
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            </h3>
            <div className="h-48 flex items-center justify-center text-gray-400 text-sm border border-dashed border-green-200 rounded-lg">
              Chart Coming Soon
            </div>
          </div>

          {/* Products Overview */}
          <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-5 transition-all hover:shadow-md">
            <h3 className="font-semibold text-green-700 mb-4 text-lg">
              Products Overview
            </h3>
            <table className="w-full text-sm text-gray-700">
              <thead>
                <tr className="text-gray-500 text-xs border-b border-green-100">
                  <th className="py-2 text-left">Name</th>
                  <th className="py-2 text-left">Price</th>
                  <th className="py-2 text-left">Stock</th>
                  <th className="py-2 text-left">Sales</th>
                  <th className="py-2 text-left">Risk</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr
                    key={i}
                    className="border-b border-green-50 hover:bg-green-50/40 transition-colors"
                  >
                    <td className="py-2">{p.name}</td>
                    <td>{p.price}</td>
                    <td>{p.stock}</td>
                    <td>{p.sales}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium ${
                          p.risk === "Low"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {p.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
