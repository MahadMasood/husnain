"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import api from "@/lib/api";
import {
  MapPin, CreditCard, ShieldCheck, ChevronRight, ChevronLeft,
  Truck, Package, CheckCircle2, Lock, Tag, Gift, Clock,
  ArrowLeft, ShoppingBag, AlertCircle, Percent
} from "lucide-react";

// ─── Step Indicator ──────────────────────────────────────
function StepIndicator({ currentStep }) {
  const steps = [
    { num: 1, label: "Shipping", icon: MapPin },
    { num: 2, label: "Payment", icon: CreditCard },
    { num: 3, label: "Review", icon: ShieldCheck },
  ];

  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((step, i) => {
        const Icon = step.icon;
        const isActive = currentStep === step.num;
        const isCompleted = currentStep > step.num;

        return (
          <React.Fragment key={step.num}>
            <div className="flex flex-col items-center relative">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                  isCompleted
                    ? "bg-green-500 text-white shadow-lg shadow-green-200"
                    : isActive
                    ? "bg-amber-500 text-white shadow-lg shadow-amber-200 scale-110"
                    : "bg-stone-100 text-stone-400 border border-stone-200"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
              <span
                className={`mt-2 font-mono text-xs tracking-wide transition-colors ${
                  isActive ? "text-amber-600 font-bold" : isCompleted ? "text-green-600" : "text-stone-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 max-w-[100px] min-w-[40px] h-[2px] mx-3 mt-[-18px] relative overflow-hidden rounded-full bg-stone-200">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-400 to-green-500 transition-all duration-700 ease-out rounded-full"
                  style={{ width: isCompleted ? "100%" : "0%" }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── Shipping Form ───────────────────────────────────────
function ShippingStep({ form, setForm, errors }) {
  const fields = [
    { name: "fullName", label: "Full Name", placeholder: "Muhammad Ahmed Khan", type: "text", half: false },
    { name: "phone", label: "Phone Number", placeholder: "+92 300 1234567", type: "tel", half: true },
    { name: "email", label: "Email (optional)", placeholder: "you@example.com", type: "email", half: true },
    { name: "address", label: "Street Address", placeholder: "House #, Street, Block, Area", type: "text", half: false },
    { name: "city", label: "City", placeholder: "Lahore", type: "text", half: true },
    { name: "postalCode", label: "Postal Code", placeholder: "54000", type: "text", half: true },
    { name: "country", label: "Country", placeholder: "Pakistan", type: "text", half: true },
    { name: "province", label: "Province / State", placeholder: "Punjab", type: "text", half: true },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center">
          <MapPin className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-900">Shipping Address</h2>
          <p className="text-stone-400 font-mono text-xs">Where should we deliver your order?</p>
        </div>
      </div>

      {/* Saved address hint */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
        <Gift className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
        <div>
          <p className="text-xs text-amber-600 font-mono mt-0.5">Standard delivery: 3-5 business days</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.name} className={field.half ? "" : "md:col-span-2"}>
            <label className="block font-mono text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">
              {field.label}
            </label>
            <input
              type={field.type}
              value={form[field.name] || ""}
              onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
              placeholder={field.placeholder}
              className={`w-full px-4 py-3 border rounded-xl font-mono text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 text-slate-700 placeholder-stone-300 ${
                errors[field.name] ? "border-red-400 bg-red-50" : "border-stone-200 bg-white"
              }`}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-xs font-mono mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors[field.name]}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Delivery options */}
      <div className="mt-6">
        <label className="block font-mono text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">
          Delivery Method
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { id: "standard", label: "Standard Delivery", time: "3-5 business days", price: "Rs 200", icon: Truck },
            { id: "express", label: "Express Delivery", time: "1-2 business days", price: "+ Rs 400", icon: Clock },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setForm({ ...form, deliveryMethod: opt.id })}
              className={`flex items-start gap-3 p-4 border-2 rounded-xl text-left transition-all ${
                form.deliveryMethod === opt.id
                  ? "border-amber-500 bg-amber-50/50 shadow-sm"
                  : "border-stone-200 hover:border-stone-300 bg-white"
              }`}
            >
              <opt.icon className={`w-5 h-5 mt-0.5 ${form.deliveryMethod === opt.id ? "text-amber-500" : "text-stone-400"}`} />
              <div>
                <p className={`font-bold text-sm ${form.deliveryMethod === opt.id ? "text-amber-700" : "text-slate-700"}`}>{opt.label}</p>
                <p className="font-mono text-xs text-stone-400 mt-0.5">{opt.time}</p>
                <p className="font-mono text-xs text-amber-600 font-semibold mt-0.5">{opt.price}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Payment Step ────────────────────────────────────────
function PaymentStep({ form, setForm, errors }) {
  const paymentMethods = [
    { id: "cod", label: "Cash on Delivery", desc: "Pay when you receive your order", icon: "💵" },
    { id: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, UnionPay", icon: "💳" },
    { id: "easypaisa", label: "EasyPaisa / JazzCash", desc: "Mobile wallet payment", icon: "📱" },
    { id: "bank", label: "Bank Transfer", desc: "Direct bank payment", icon: "🏦" },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center">
          <CreditCard className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-900">Payment Method</h2>
          <p className="text-stone-400 font-mono text-xs">Choose how you'd like to pay</p>
        </div>
      </div>

      {/* Security badge */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
        <Lock className="w-5 h-5 text-green-500 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-green-800">Your payment is 100% secure</p>
          <p className="text-xs text-green-600 font-mono">256-bit SSL encrypted · PCI DSS Compliant</p>
        </div>
      </div>

      <div className="space-y-3">
        {paymentMethods.map((method) => {
          const isDisabled = method.id !== "cod";
          return (
            <button
              key={method.id}
              onClick={() => !isDisabled && setForm({ ...form, paymentMethod: method.id })}
              disabled={isDisabled}
              className={`w-full flex items-center gap-4 p-5 border-2 rounded-xl text-left transition-all ${
                form.paymentMethod === method.id
                  ? "border-amber-500 bg-amber-50/50 shadow-sm"
                  : isDisabled
                  ? "border-stone-100 bg-stone-50 opacity-60 cursor-not-allowed"
                  : "border-stone-200 hover:border-stone-300 bg-white"
              }`}
            >
              <span className={`text-2xl ${isDisabled ? "grayscale opacity-50" : ""}`}>{method.icon}</span>
              <div className="flex-1">
                <p className={`font-bold ${form.paymentMethod === method.id ? "text-amber-700" : isDisabled ? "text-stone-400" : "text-slate-700"}`}>
                  {method.label} {isDisabled && <span className="text-[10px] bg-stone-200 text-stone-500 px-2 py-0.5 rounded ml-2 font-mono uppercase tracking-wider">Coming Soon</span>}
                </p>
                <p className="font-mono text-xs text-stone-400 mt-0.5">{method.desc}</p>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  form.paymentMethod === method.id ? "border-amber-500" : isDisabled ? "border-stone-200" : "border-stone-300"
                }`}
              >
                {form.paymentMethod === method.id && <div className="w-2.5 h-2.5 bg-amber-500 rounded-full" />}
              </div>
            </button>
          );
        })}
        {errors.paymentMethod && (
          <p className="text-red-500 text-xs font-mono flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.paymentMethod}
          </p>
        )}
      </div>

      {/* Card details (conditional) */}
      {form.paymentMethod === "card" && (
        <div className="mt-6 p-5 border border-stone-200 rounded-xl bg-stone-50 space-y-4">
          <h3 className="font-bold text-sm text-slate-700 flex items-center gap-2">
            💳 Card Details
          </h3>
          <div>
            <label className="block font-mono text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">
              Card Number
            </label>
            <input
              type="text"
              placeholder="4242 4242 4242 4242"
              value={form.cardNumber || ""}
              onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
              className="w-full px-4 py-3 border border-stone-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 text-slate-700 placeholder-stone-300"
              maxLength={19}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                Expiry
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                value={form.cardExpiry || ""}
                onChange={(e) => setForm({ ...form, cardExpiry: e.target.value })}
                className="w-full px-4 py-3 border border-stone-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 text-slate-700 placeholder-stone-300"
                maxLength={5}
              />
            </div>
            <div>
              <label className="block font-mono text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                CVV
              </label>
              <input
                type="text"
                placeholder="123"
                value={form.cardCvv || ""}
                onChange={(e) => setForm({ ...form, cardCvv: e.target.value })}
                className="w-full px-4 py-3 border border-stone-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 text-slate-700 placeholder-stone-300"
                maxLength={4}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Review Step ─────────────────────────────────────────
function ReviewStep({ form, cartItems }) {
  const paymentLabels = {
    cod: "Cash on Delivery",
    card: "Credit / Debit Card",
    easypaisa: "EasyPaisa / JazzCash",
    bank: "Bank Transfer",
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-900">Review Order</h2>
          <p className="text-stone-400 font-mono text-xs">Double-check everything before placing your order</p>
        </div>
      </div>

      {/* Shipping review */}
      <div className="border border-stone-200 rounded-xl p-5 mb-4 bg-white">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-500" /> Deliver to
          </h3>
          <span className="font-mono text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
            {form.deliveryMethod === "express" ? "Express" : "Standard"}
          </span>
        </div>
        <p className="text-sm text-slate-700 font-semibold">{form.fullName}</p>
        <p className="text-sm text-stone-500 mt-1">{form.address}</p>
        <p className="text-sm text-stone-500">{form.city}, {form.province} {form.postalCode}</p>
        <p className="text-sm text-stone-500">{form.country}</p>
        {form.phone && <p className="text-sm text-stone-400 font-mono mt-2">📞 {form.phone}</p>}
      </div>

      {/* Payment review */}
      <div className="border border-stone-200 rounded-xl p-5 mb-4 bg-white">
        <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2 mb-2">
          <CreditCard className="w-4 h-4 text-amber-500" /> Payment
        </h3>
        <p className="text-sm text-slate-700">{paymentLabels[form.paymentMethod] || form.paymentMethod}</p>
        {form.paymentMethod === "card" && form.cardNumber && (
          <p className="text-sm text-stone-400 font-mono mt-1">•••• •••• •••• {form.cardNumber.slice(-4)}</p>
        )}
      </div>

      {/* Items review */}
      <div className="border border-stone-200 rounded-xl p-5 bg-white">
        <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2 mb-4">
          <Package className="w-4 h-4 text-amber-500" /> Items ({cartItems.length})
        </h3>
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
          {cartItems.map((item) => (
            <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center gap-3">
              <div className="w-14 h-14 bg-stone-100 rounded-lg overflow-hidden shrink-0">
                {item.image && (
                  <Image src={item.image} alt={item.name} width={56} height={56} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">{item.name}</p>
                <p className="font-mono text-xs text-stone-400">
                  {item.size} · {item.color} · Qty: {item.quantity}
                </p>
              </div>
              <p className="font-mono text-sm font-bold text-slate-800 shrink-0">
                Rs. {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Order Summary Sidebar ───────────────────────────────
function OrderSummary({ cartItems, cartTotal, shipping, tax, orderTotal, promoCode, setPromoCode, promoApplied, applyPromo, discount }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 sticky top-24 space-y-5">
      <h2 className="font-black text-lg text-slate-900 flex items-center gap-2">
        <ShoppingBag className="w-5 h-5 text-amber-500" /> Order Summary
      </h2>

      {/* Cart items (compact) */}
      <div className="space-y-3 max-h-[240px] overflow-y-auto pr-1">
        {cartItems.map((item) => (
          <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-stone-100 rounded-lg overflow-hidden">
                {item.image && (
                  <Image src={item.image} alt={item.name} width={48} height={48} className="w-full h-full object-cover" />
                )}
              </div>
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-slate-800 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-700 truncate">{item.name}</p>
              <p className="font-mono text-[10px] text-stone-400">{item.size} · {item.color}</p>
            </div>
            <p className="font-mono text-xs font-bold text-slate-700 shrink-0">Rs. {(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Promo code */}
      <div className="border-t border-stone-100 pt-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 border border-stone-200 rounded-xl font-mono text-sm focus:outline-none focus:border-amber-400 text-slate-700 placeholder-stone-400"
            />
          </div>
          <button
            onClick={applyPromo}
            className="px-4 py-2.5 bg-slate-900 text-white font-mono text-sm rounded-xl hover:bg-amber-600 transition-colors"
          >
            Apply
          </button>
        </div>
        {promoApplied && (
          <p className="text-green-600 text-xs font-mono mt-2 flex items-center gap-1">
            <Percent className="w-3 h-3" /> Code applied! You saved Rs. {discount.toFixed(2)}
          </p>
        )}
      </div>

      {/* Price breakdown */}
      <div className="border-t border-stone-100 pt-4 space-y-2.5">
        <div className="flex justify-between text-sm text-stone-500">
          <span>Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
          <span className="font-mono">Rs. {cartTotal.toFixed(2)}</span>
        </div>
        {promoApplied && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount</span>
            <span className="font-mono">-Rs. {discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm text-stone-500">
          <span>Shipping</span>
          <span className="font-mono">
            {shipping === 0 ? (
              <span className="text-green-600 font-semibold">FREE</span>
            ) : (
              `Rs. ${shipping.toFixed(2)}`
            )}
          </span>
        </div>
        <div className="flex justify-between text-sm text-stone-500">
          <span>Tax (est.)</span>
          <span className="font-mono">Rs. {tax.toFixed(2)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-stone-200 pt-4">
        <div className="flex justify-between items-center">
          <span className="font-bold text-slate-900 text-lg">Total</span>
          <span className="font-black text-2xl text-slate-900">Rs. {orderTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Trust badges */}
      <div className="border-t border-stone-100 pt-4 flex items-center justify-center gap-4 flex-wrap">
        {["Visa", "Mastercard", "JazzCash", "EasyPaisa", "COD"].map((p) => (
          <span key={p} className="text-[10px] font-mono bg-stone-100 text-stone-500 px-2 py-1 rounded-md">{p}</span>
        ))}
      </div>
      <p className="text-center font-mono text-[10px] text-stone-400">
        🔒 Secure checkout · SSL encrypted
      </p>
    </div>
  );
}

// ─── Order Confirmed Screen ──────────────────────────────
function OrderConfirmed({ orderId }) {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[75vh] text-center px-4">
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-[bounce_1s_ease-in-out]">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-white text-sm animate-pulse">
            🎉
          </div>
        </div>

        <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Order Placed!</h1>
        <p className="text-stone-500 mb-2 max-w-md">
          Thank you for your purchase! Your order has been confirmed and is being processed.
        </p>
        {orderId && (
          <p className="font-mono text-sm text-amber-600 bg-amber-50 px-4 py-2 rounded-xl mb-6">
            Order ID: {orderId}
          </p>
        )}

        <div className="bg-white rounded-2xl border border-stone-200 p-6 max-w-sm w-full mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <Truck className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-left">
              <p className="font-bold text-sm text-slate-800">Estimated Delivery</p>
              <p className="font-mono text-xs text-stone-400">3-5 business days</p>
            </div>
          </div>
          <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full w-[15%] animate-pulse" />
          </div>
          <div className="flex justify-between mt-2 font-mono text-[10px] text-stone-400">
            <span>Confirmed</span>
            <span>Processing</span>
            <span>Shipped</span>
            <span>Delivered</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            href="/products"
            className="px-8 py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors shadow-lg shadow-amber-200"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="px-8 py-3 bg-white text-slate-700 font-bold rounded-xl border border-stone-200 hover:border-amber-400 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ─── Main Checkout Page ──────────────────────────────────
export default function CheckoutPage() {
  const { cartItems, cartCount, cartTotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlacing, setIsPlacing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [errors, setErrors] = useState({});
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Pakistan",
    province: "",
    deliveryMethod: "standard",
    paymentMethod: "cod",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });

  const shipping = form.deliveryMethod === "express" ? 400 : 200;
  const tax = cartTotal * 0.08;
  const orderTotal = cartTotal - discount + shipping + tax;

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setDiscount(cartTotal * 0.1);
      setPromoApplied(true);
    } else if (promoCode.toUpperCase() === "FLAT20") {
      setDiscount(20);
      setPromoApplied(true);
    } else {
      setPromoApplied(false);
      setDiscount(0);
    }
  };

  const validateShipping = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = "Name is required";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    if (!form.address.trim()) errs.address = "Address is required";
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.postalCode.trim()) errs.postalCode = "Postal code is required";
    if (!form.country.trim()) errs.country = "Country is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validatePayment = () => {
    const errs = {};
    if (!form.paymentMethod) errs.paymentMethod = "Please select a payment method";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateShipping()) return;
    if (currentStep === 2 && !validatePayment()) return;
    setErrors({});
    setCurrentStep((p) => Math.min(p + 1, 3));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((p) => Math.max(p - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = async () => {
    setIsPlacing(true);
    try {
      const orderItems = cartItems.map((item) => ({
        name: item.name,
        qty: item.quantity,
        image: item.image,
        price: item.price,
        product: item.id,
      }));

      const res = await api.post("/orders", {
        orderItems,
        shippingAddress: {
          address: form.address,
          city: form.city,
          postalCode: form.postalCode,
          country: form.country,
        },
        paymentMethod: form.paymentMethod,
        itemsPrice: cartTotal,
        taxPrice: tax,
        shippingPrice: shipping,
        totalPrice: orderTotal,
      });

      setOrderId(res.data._id || "");
      clearCart();
      setOrderComplete(true);
    } catch (error) {
      setErrors({ submit: "Failed to place order. Please try again." });
    } finally {
      setIsPlacing(false);
    }
  };

  // ── Order confirmed ──
  if (orderComplete) return <OrderConfirmed orderId={orderId} />;

  // ── Empty cart ──
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
          <ShoppingBag className="w-20 h-20 text-stone-200 mb-6" />
          <h1 className="text-3xl font-black text-slate-900 mb-2">Nothing to checkout</h1>
          <p className="text-stone-400 mb-8">Add items to your bag first.</p>
          <Link
            href="/products"
            className="px-8 py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-2">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-stone-400 hover:text-amber-600 font-mono text-sm transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Bag
        </Link>
        <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-1">Checkout</h1>
        <p className="text-stone-400 font-mono text-sm mb-6">Secure checkout · {cartCount} items</p>
      </div>

      {/* Steps */}
      <div className="max-w-7xl mx-auto px-4">
        <StepIndicator currentStep={currentStep} />
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Area */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8">
            {currentStep === 1 && <ShippingStep form={form} setForm={setForm} errors={errors} />}
            {currentStep === 2 && <PaymentStep form={form} setForm={setForm} errors={errors} />}
            {currentStep === 3 && <ReviewStep form={form} cartItems={cartItems} />}

            {/* Error message */}
            {errors.submit && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-sm text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0" /> {errors.submit}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-stone-100">
              {currentStep > 1 ? (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-6 py-3 border border-stone-200 text-stone-600 font-bold text-sm rounded-xl hover:border-amber-400 hover:text-amber-600 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-8 py-3 bg-amber-500 text-white font-bold text-sm rounded-xl hover:bg-amber-600 transition-all shadow-lg shadow-amber-200 hover:shadow-amber-300"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handlePlaceOrder}
                  disabled={isPlacing}
                  className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-sm rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Lock className="w-4 h-4" />
                  {isPlacing ? "Placing Order…" : "Place Order"}
                </button>
              )}
            </div>
          </div>

          {/* Assurance bar */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { icon: Truck, title: "Fast Delivery", desc: "3-5 business days" },
              { icon: ShieldCheck, title: "Buyer Protection", desc: "Full refund guarantee" },
              { icon: Lock, title: "Secure Payment", desc: "256-bit SSL" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-stone-200">
                <Icon className="w-5 h-5 text-amber-500 mb-2" />
                <p className="font-bold text-xs text-slate-700">{title}</p>
                <p className="font-mono text-[10px] text-stone-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <OrderSummary
            cartItems={cartItems}
            cartTotal={cartTotal}
            shipping={shipping}
            tax={tax}
            orderTotal={orderTotal}
            promoCode={promoCode}
            setPromoCode={setPromoCode}
            promoApplied={promoApplied}
            applyPromo={applyPromo}
            discount={discount}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
