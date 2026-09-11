"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag, DollarSign, Package, TrendingUp, Users,
  CheckCircle2, Clock, ArrowUpRight, AlertCircle, RefreshCw,
  Truck, Eye, CreditCard
} from "lucide-react";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const [ordersRes, productsRes] = await Promise.all([
          api.get("/orders"),
          api.get("/products"),
        ]);
        setOrders(ordersRes.data);
        setProducts(productsRes.data);
      } catch (err) {
        setError("Failed to load dashboard data. Ensure you're logged in as admin.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-stone-200 border-t-amber-500 rounded-full animate-spin mb-4" />
        <p className="font-mono text-sm text-stone-400">Loading dashboard…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Dashboard Error</h2>
        <p className="text-stone-500 mb-6 max-w-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Retry
        </button>
      </div>
    );
  }

  // Computed stats
  const totalRevenue = orders.reduce((s, o) => s + (o.totalPrice || 0), 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const deliveredOrders = orders.filter((o) => o.isDelivered).length;
  const processingOrders = orders.filter((o) => !o.isDelivered).length;
  const paidOrders = orders.filter((o) => o.isPaid).length;
  const inStockProducts = products.filter((p) => p.inStock).length;
  const outOfStockProducts = products.filter((p) => !p.inStock).length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Recent orders (latest 5)
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  // Top products by frequency in orders
  const productFrequency = {};
  orders.forEach((o) => {
    o.orderItems?.forEach((item) => {
      const key = item.name;
      productFrequency[key] = (productFrequency[key] || 0) + item.qty;
    });
  });
  const topProducts = Object.entries(productFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Category breakdown
  const categoryMap = {};
  products.forEach((p) => {
    categoryMap[p.category] = (categoryMap[p.category] || 0) + 1;
  });

  const stats = [
    {
      label: "Total Revenue",
      value: (totalRevenue),
      icon: DollarSign,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      sub: `Avg ${(Math.round(avgOrderValue))} / order`,
      link: "/admin/orders",
    },
    {
      label: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      sub: `${processingOrders} processing · ${deliveredOrders} delivered`,
      link: "/admin/orders",
    },
    {
      label: "Products",
      value: totalProducts,
      icon: Package,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      sub: `${inStockProducts} in stock · ${outOfStockProducts} out`,
      link: "/admin/products",
    },
    {
      label: "Delivery Rate",
      value: `${totalOrders > 0 ? Math.round((deliveredOrders / totalOrders) * 100) : 0}%`,
      icon: Truck,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      sub: `${paidOrders} paid orders`,
      link: "/admin/orders",
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black uppercase text-slate-900 tracking-tighter">
            Dashboard
          </h2>
          <p className="font-mono text-xs text-stone-400 mt-1">
            Welcome back — here's your store overview
          </p>
        </div>
        <span className="font-mono text-xs text-stone-400 bg-stone-100 px-3 py-1.5 rounded-lg">
          {new Date().toLocaleDateString("en-PK", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.link}
              className="bg-white rounded-xl border border-stone-200 p-5 hover:shadow-md hover:border-amber-300 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${stat.iconBg} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <ArrowUpRight className="w-4 h-4 text-stone-300 group-hover:text-amber-500 transition-colors" />
              </div>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
              <p className="font-mono text-[10px] text-stone-400 uppercase tracking-wider mt-1">
                {stat.label}
              </p>
              <p className="font-mono text-[10px] text-stone-400 mt-2">{stat.sub}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-stone-200 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-stone-100">
            <div>
              <h3 className="font-bold text-slate-900">Recent Orders</h3>
              <p className="font-mono text-[10px] text-stone-400 mt-0.5">Latest customer orders</p>
            </div>
            <Link
              href="/admin/orders"
              className="font-mono text-xs text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              View All <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="p-12 text-center">
              <ShoppingBag className="w-12 h-12 text-stone-200 mx-auto mb-3" />
              <p className="font-bold text-slate-700 mb-1">No orders yet</p>
              <p className="text-stone-400 text-sm">Orders will appear here once placed</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {recentOrders.map((order) => (
                <Link
                  key={order._id}
                  href="/admin/orders"
                  className="flex items-center gap-4 p-4 hover:bg-amber-50/30 transition-colors"
                >
                  <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center shrink-0">
                    <ShoppingBag className="w-5 h-5 text-stone-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-stone-500">
                        #{order._id.slice(-6).toUpperCase()}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                          order.isDelivered
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {order.isDelivered ? "Delivered" : "Processing"}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 font-semibold truncate mt-0.5">
                      {order.user?.name || "Guest"} — {order.orderItems?.length || 0} items
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-mono font-black text-slate-900 text-sm">
                      {(order.totalPrice)}
                    </p>
                    <p className="font-mono text-[10px] text-stone-400">
                      {new Date(order.createdAt).toLocaleDateString("en-PK", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Category Breakdown */}
          <div className="bg-white rounded-xl border border-stone-200 p-5">
            <h3 className="font-bold text-slate-900 mb-1">Categories</h3>
            <p className="font-mono text-[10px] text-stone-400 mb-4">Product distribution</p>
            {Object.keys(categoryMap).length === 0 ? (
              <p className="text-stone-400 text-sm text-center py-6">No products yet</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(categoryMap)
                  .sort((a, b) => b[1] - a[1])
                  .map(([cat, count]) => {
                    const pct = Math.round((count / totalProducts) * 100);
                    return (
                      <div key={cat}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold text-slate-700">{cat}</span>
                          <span className="font-mono text-xs text-stone-400">
                            {count} ({pct}%)
                          </span>
                        </div>
                        <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-700"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Top Selling Products */}
          <div className="bg-white rounded-xl border border-stone-200 p-5">
            <h3 className="font-bold text-slate-900 mb-1">Top Selling</h3>
            <p className="font-mono text-[10px] text-stone-400 mb-4">Most ordered products</p>
            {topProducts.length === 0 ? (
              <p className="text-stone-400 text-sm text-center py-6">No order data yet</p>
            ) : (
              <div className="space-y-3">
                {topProducts.map(([name, qty], i) => (
                  <div key={name} className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${
                        i === 0
                          ? "bg-amber-100 text-amber-700"
                          : i === 1
                          ? "bg-stone-200 text-stone-600"
                          : "bg-stone-100 text-stone-500"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-700 truncate">{name}</p>
                    </div>
                    <span className="font-mono text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                      {qty} sold
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-900 rounded-xl p-5 text-white">
            <h3 className="font-bold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link
                href="/admin/products/new"
                className="flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
              >
                <Package className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium">Add New Product</span>
              </Link>
              <Link
                href="/admin/orders"
                className="flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
              >
                <Eye className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium">View All Orders</span>
              </Link>
              <Link
                href="/admin/products"
                className="flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
              >
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium">Manage Inventory</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
