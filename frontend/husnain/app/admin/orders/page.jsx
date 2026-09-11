"use client";
import { useState, useEffect, useMemo } from "react";
import api from "@/lib/api";
import Image from "next/image";
import {
  Search, Filter, ChevronDown, ChevronUp, Package, Truck,
  CheckCircle2, Clock, MapPin, CreditCard, X, RefreshCw,
  ShoppingBag, DollarSign, TrendingUp, AlertCircle, Eye,
  ChevronLeft, ChevronRight
} from "lucide-react";

// ─── Stat Cards ──────────────────────────────────────────
function StatCards({ orders }) {
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
  const delivered = orders.filter((o) => o.isDelivered).length;
  const processing = orders.filter((o) => !o.isDelivered).length;
  const paid = orders.filter((o) => o.isPaid).length;

  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: ShoppingBag,
      color: "bg-blue-50 text-blue-600",
      iconBg: "bg-blue-100",
      trend: `${processing} active`,
    },
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "bg-green-50 text-green-600",
      iconBg: "bg-green-100",
      trend: `$${(totalRevenue / Math.max(orders.length, 1)).toFixed(0)} avg`,
    },
    {
      label: "Delivered",
      value: delivered,
      icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-600",
      iconBg: "bg-emerald-100",
      trend: `${orders.length > 0 ? Math.round((delivered / orders.length) * 100) : 0}% rate`,
    },
    {
      label: "Processing",
      value: processing,
      icon: Clock,
      color: "bg-amber-50 text-amber-600",
      iconBg: "bg-amber-100",
      trend: `${paid} paid`,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-stone-200 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat.iconBg} rounded-xl flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${stat.color.split(" ")[1]}`} />
              </div>
              <span className="font-mono text-[10px] text-stone-400 bg-stone-50 px-2 py-1 rounded-md">
                {stat.trend}
              </span>
            </div>
            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            <p className="font-mono text-xs text-stone-400 uppercase tracking-wider mt-1">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}

// ─── Order Detail Drawer ─────────────────────────────────
function OrderDetail({ order, onClose, onMarkDelivered, isUpdating }) {
  if (!order) return null;

  const paymentLabels = {
    cod: "Cash on Delivery",
    card: "Credit / Debit Card",
    easypaisa: "EasyPaisa / JazzCash",
    bank: "Bank Transfer",
    PayPal: "PayPal",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="relative w-full max-w-lg h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right">
        {/* Header */}
        <div className="border-b border-stone-200 p-6 flex items-center justify-between bg-stone-50">
          <div>
            <p className="font-mono text-xs text-stone-400 uppercase tracking-wider">Order Details</p>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              #{order._id.slice(-8).toUpperCase()}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5 text-stone-500" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status & Date */}
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold font-mono ${
                order.isDelivered
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {order.isDelivered ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <Clock className="w-3.5 h-3.5" />
              )}
              {order.isDelivered ? "Delivered" : "Processing"}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold font-mono ${
                order.isPaid
                  ? "bg-blue-100 text-blue-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              {order.isPaid ? "Paid" : "Unpaid"}
            </span>
            <span className="font-mono text-xs text-stone-400 ml-auto">
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          {/* Customer */}
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <h4 className="font-mono text-[10px] text-stone-400 uppercase tracking-wider mb-2">Customer</h4>
            <p className="font-bold text-slate-800">{order.user?.name || "Guest Checkout"}</p>
            {order.user?.email && (
              <p className="font-mono text-xs text-stone-500 mt-0.5">{order.user.email}</p>
            )}
          </div>

          {/* Shipping Address */}
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <h4 className="font-mono text-[10px] text-stone-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Shipping Address
            </h4>
            {order.shippingAddress ? (
              <>
                <p className="text-sm text-slate-700">{order.shippingAddress.address}</p>
                <p className="text-sm text-slate-700">
                  {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                </p>
                <p className="text-sm text-slate-700">{order.shippingAddress.country}</p>
              </>
            ) : (
              <p className="text-sm text-stone-400">No address provided</p>
            )}
          </div>

          {/* Payment */}
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <h4 className="font-mono text-[10px] text-stone-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <CreditCard className="w-3 h-3" /> Payment
            </h4>
            <p className="text-sm font-semibold text-slate-700">
              {paymentLabels[order.paymentMethod] || order.paymentMethod}
            </p>
            {order.isPaid && order.paidAt && (
              <p className="font-mono text-xs text-green-600 mt-1">
                Paid on {new Date(order.paidAt).toLocaleDateString()}
              </p>
            )}
          </div>

          {/* Order Items */}
          <div>
            <h4 className="font-mono text-[10px] text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-1">
              <Package className="w-3 h-3" /> Items ({order.orderItems?.length || 0})
            </h4>
            <div className="space-y-3">
              {order.orderItems?.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white border border-stone-200 rounded-xl p-3"
                >
                  <div className="w-14 h-14 bg-stone-100 rounded-lg overflow-hidden shrink-0">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{item.name}</p>
                    <p className="font-mono text-xs text-stone-400">
                      Qty: {item.qty} × ${item.price?.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-mono text-sm font-bold text-slate-800 shrink-0">
                    ${(item.qty * item.price).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-slate-900 rounded-xl p-5 text-white">
            <h4 className="font-mono text-[10px] text-white/50 uppercase tracking-wider mb-3">
              Order Summary
            </h4>
            <div className="space-y-2 text-sm">
              {order.itemsPrice !== undefined && (
                <div className="flex justify-between">
                  <span className="text-white/70">Items</span>
                  <span className="font-mono">${order.itemsPrice?.toFixed(2)}</span>
                </div>
              )}
              {order.shippingPrice !== undefined && (
                <div className="flex justify-between">
                  <span className="text-white/70">Shipping</span>
                  <span className="font-mono">
                    {order.shippingPrice === 0 ? "FREE" : `$${order.shippingPrice?.toFixed(2)}`}
                  </span>
                </div>
              )}
              {order.taxPrice !== undefined && (
                <div className="flex justify-between">
                  <span className="text-white/70">Tax</span>
                  <span className="font-mono">${order.taxPrice?.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-white/20 pt-2 mt-2 flex justify-between items-center">
                <span className="font-bold text-lg">Total</span>
                <span className="font-black text-2xl text-amber-400">
                  ${order.totalPrice?.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery Timeline */}
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <h4 className="font-mono text-[10px] text-stone-400 uppercase tracking-wider mb-3">Timeline</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">Order Placed</p>
                  <p className="font-mono text-xs text-stone-400">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              {order.isPaid && (
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                    <DollarSign className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">Payment Confirmed</p>
                    <p className="font-mono text-xs text-stone-400">
                      {order.paidAt
                        ? new Date(order.paidAt).toLocaleString()
                        : "Marked as paid"}
                    </p>
                  </div>
                </div>
              )}
              {order.isDelivered && (
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                    <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">Delivered</p>
                    <p className="font-mono text-xs text-stone-400">
                      {order.deliveredAt
                        ? new Date(order.deliveredAt).toLocaleString()
                        : "Marked as delivered"}
                    </p>
                  </div>
                </div>
              )}
              {!order.isDelivered && (
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-stone-200 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                  </div>
                  <div>
                    <p className="text-sm text-stone-400">Awaiting delivery…</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-stone-200 p-6 bg-stone-50 space-y-3">
          {!order.isDelivered && (
            <button
              onClick={() => onMarkDelivered(order._id)}
              disabled={isUpdating}
              className="w-full py-3.5 bg-green-500 text-white font-bold text-sm rounded-xl hover:bg-green-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-green-200"
            >
              <Truck className="w-4 h-4" />
              {isUpdating ? "Updating…" : "Mark as Delivered"}
            </button>
          )}
          <button
            onClick={onClose}
            className="w-full py-3 border border-stone-300 text-stone-600 font-mono text-sm rounded-xl hover:bg-stone-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Admin Orders Page ──────────────────────────────
export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/orders");
      setOrders(data);
    } catch (err) {
      setError("Failed to fetch orders. Make sure you're logged in as admin.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter & sort
  const filteredOrders = useMemo(() => {
    let result = [...orders];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (o) =>
          o._id.toLowerCase().includes(q) ||
          (o.user?.name || "guest").toLowerCase().includes(q) ||
          o.paymentMethod?.toLowerCase().includes(q) ||
          o.shippingAddress?.city?.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter === "delivered") result = result.filter((o) => o.isDelivered);
    else if (statusFilter === "processing") result = result.filter((o) => !o.isDelivered);
    else if (statusFilter === "paid") result = result.filter((o) => o.isPaid);
    else if (statusFilter === "unpaid") result = result.filter((o) => !o.isPaid);

    // Sort
    if (sortBy === "newest") result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    else if (sortBy === "oldest") result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    else if (sortBy === "highest") result.sort((a, b) => b.totalPrice - a.totalPrice);
    else if (sortBy === "lowest") result.sort((a, b) => a.totalPrice - b.totalPrice);

    return result;
  }, [orders, search, statusFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / perPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, sortBy]);

  const handleMarkDelivered = async (orderId) => {
    setIsUpdating(true);
    try {
      await api.put(`/orders/${orderId}/deliver`);
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, isDelivered: true, deliveredAt: new Date().toISOString() } : o
        )
      );
      // Update selected order too
      setSelectedOrder((prev) =>
        prev && prev._id === orderId
          ? { ...prev, isDelivered: true, deliveredAt: new Date().toISOString() }
          : prev
      );
    } catch (err) {
      console.error("Failed to update order", err);
    } finally {
      setIsUpdating(false);
    }
  };

  // ─── Loading State ──
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-stone-200 border-t-amber-500 rounded-full animate-spin mb-4" />
        <p className="font-mono text-sm text-stone-400">Loading orders…</p>
      </div>
    );
  }

  // ─── Error State ──
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Failed to Load Orders</h2>
        <p className="text-stone-500 mb-6 max-w-sm">{error}</p>
        <button
          onClick={fetchOrders}
          className="px-6 py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-black uppercase text-slate-900 tracking-tighter">
            Orders
          </h2>
          <p className="font-mono text-xs text-stone-400 mt-1">
            Manage and track all customer orders
          </p>
        </div>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm font-mono text-stone-600 hover:border-amber-400 hover:text-amber-600 transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Stats */}
      <StatCards orders={orders} />

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 mb-4 flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search by ID, customer, city…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-stone-200 rounded-xl font-mono text-sm focus:outline-none focus:border-amber-400 text-slate-700 placeholder-stone-400"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-9 pr-8 py-2.5 border border-stone-200 rounded-xl font-mono text-sm focus:outline-none focus:border-amber-400 text-slate-700 bg-white appearance-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="processing">Processing</option>
            <option value="delivered">Delivered</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
        </div>

        {/* Sort */}
        <div className="relative">
          <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="pl-9 pr-8 py-2.5 border border-stone-200 rounded-xl font-mono text-sm focus:outline-none focus:border-amber-400 text-slate-700 bg-white appearance-none cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Total</option>
            <option value="lowest">Lowest Total</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-3">
        <p className="font-mono text-xs text-stone-400">
          Showing {paginatedOrders.length} of {filteredOrders.length} orders
        </p>
        {search && (
          <button
            onClick={() => setSearch("")}
            className="font-mono text-xs text-amber-600 hover:text-amber-700 flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Clear search
          </button>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="p-4 font-mono text-[10px] text-stone-400 uppercase tracking-wider font-bold">
                  Order ID
                </th>
                <th className="p-4 font-mono text-[10px] text-stone-400 uppercase tracking-wider font-bold">
                  Customer
                </th>
                <th className="p-4 font-mono text-[10px] text-stone-400 uppercase tracking-wider font-bold">
                  Items
                </th>
                <th className="p-4 font-mono text-[10px] text-stone-400 uppercase tracking-wider font-bold">
                  Date
                </th>
                <th className="p-4 font-mono text-[10px] text-stone-400 uppercase tracking-wider font-bold">
                  Total
                </th>
                <th className="p-4 font-mono text-[10px] text-stone-400 uppercase tracking-wider font-bold">
                  Payment
                </th>
                <th className="p-4 font-mono text-[10px] text-stone-400 uppercase tracking-wider font-bold">
                  Status
                </th>
                <th className="p-4 font-mono text-[10px] text-stone-400 uppercase tracking-wider font-bold text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-12 text-center">
                    <Package className="w-12 h-12 text-stone-200 mx-auto mb-3" />
                    <p className="font-bold text-slate-700 mb-1">No orders found</p>
                    <p className="text-stone-400 text-sm">
                      {search ? "Try adjusting your search or filters" : "Orders will appear here once placed"}
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-stone-100 hover:bg-amber-50/30 transition-colors cursor-pointer group"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <td className="p-4">
                      <span className="font-mono text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded-md group-hover:bg-amber-100 group-hover:text-amber-700 transition-colors">
                        #{order._id.slice(-8).toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-sm text-slate-900">
                        {order.user?.name || "Guest"}
                      </p>
                      <p className="font-mono text-[10px] text-stone-400 mt-0.5">
                        {order.shippingAddress?.city || "—"}
                      </p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        {order.orderItems?.slice(0, 3).map((item, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 bg-stone-100 rounded-lg overflow-hidden border-2 border-white -ml-2 first:ml-0"
                          >
                            {item.image && (
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                        ))}
                        {(order.orderItems?.length || 0) > 3 && (
                          <span className="w-8 h-8 bg-stone-200 rounded-lg flex items-center justify-center -ml-2 text-[10px] font-bold text-stone-500 border-2 border-white">
                            +{order.orderItems.length - 3}
                          </span>
                        )}
                        <span className="font-mono text-[10px] text-stone-400 ml-2">
                          {order.orderItems?.reduce((s, i) => s + i.qty, 0) || 0} pcs
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-stone-600">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="font-mono text-[10px] text-stone-400">
                        {new Date(order.createdAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="font-mono font-black text-slate-900">
                        ${order.totalPrice?.toFixed(2)}
                      </p>
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-xs text-stone-500 bg-stone-100 px-2 py-1 rounded-md capitalize">
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
                          order.isDelivered
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {order.isDelivered ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        {order.isDelivered ? "Delivered" : "Processing"}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedOrder(order);
                          }}
                          className="p-2 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-amber-600 transition-colors"
                          title="View details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {!order.isDelivered && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkDelivered(order._id);
                            }}
                            disabled={isUpdating}
                            className="p-2 rounded-lg hover:bg-green-100 text-stone-400 hover:text-green-600 transition-colors disabled:opacity-50"
                            title="Mark as delivered"
                          >
                            <Truck className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="border-t border-stone-200 px-4 py-3 flex items-center justify-between bg-stone-50">
            <p className="font-mono text-xs text-stone-400">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-stone-200 text-stone-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
                )
                .map((page, i, arr) => (
                  <div key={page} className="flex items-center">
                    {i > 0 && arr[i - 1] !== page - 1 && (
                      <span className="px-1 text-stone-300">…</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg font-mono text-xs font-bold transition-colors ${
                        currentPage === page
                          ? "bg-amber-500 text-white"
                          : "hover:bg-stone-200 text-stone-600"
                      }`}
                    >
                      {page}
                    </button>
                  </div>
                ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-stone-200 text-stone-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Detail Drawer */}
      {selectedOrder && (
        <OrderDetail
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onMarkDelivered={handleMarkDelivered}
          isUpdating={isUpdating}
        />
      )}
    </div>
  );
}
