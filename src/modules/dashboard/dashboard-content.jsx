"use client";

import {
  Users,
  Package,
  DollarSign,
  CreditCard,
  ArrowDown,
  ArrowUp,
  MoreHorizontal,
  Calendar,
  RefreshCw,
} from "lucide-react";
import ChartComponent from "../../shared/components/chart-component";

export function DashboardContent() {
  const stats = [
    {
      title: "Usuarios",
      value: "1,245",
      growth: "+15%",
      isPositive: true,
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Productos",
      value: "532",
      growth: "+8%",
      isPositive: true,
      icon: Package,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Ventas",
      value: "1,024+",
      growth: "+12%",
      isPositive: true,
      icon: DollarSign,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Ingresos",
      value: "$12,345",
      growth: "-3%",
      isPositive: false,
      icon: CreditCard,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        </div>
        <div className="mt-4 flex space-x-3 sm:mt-0">
          <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Abril 2025</span>
          </button>
          <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            <RefreshCw className="mr-2 h-4 w-4" />
            <span>Actualizar</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-lg border bg-white p-5 shadow-sm transition-all hover:shadow"
          >
            <div className="flex justify-between">
              <div className={`rounded-full p-2 ${item.color}`}>
                <item.icon className="h-5 w-5" />
              </div>
              <span
                className={`flex items-center text-xs font-medium ${
                  item.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.growth}
                {item.isPositive ? (
                  <ArrowUp className="ml-1 h-3 w-3" />
                ) : (
                  <ArrowDown className="ml-1 h-3 w-3" />
                )}
              </span>
            </div>
            <p className="mt-4 text-3xl font-bold">{item.value}</p>
            <p className="mt-1 text-sm font-medium text-gray-500">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 lg:grid-cols-1">
        <div className="rounded-lg border bg-white shadow-sm">
          <div className="border-b px-5 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Ventas recientes</h2>
              <div className="flex items-center space-x-2">
                <select className="rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Últimos 7 días</option>
                  <option>Últimos 30 días</option>
                  <option>Este año</option>
                </select>
                <button className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="p-5 w-full">
            <div className="h-72 w-full">
              <ChartComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardContent;
