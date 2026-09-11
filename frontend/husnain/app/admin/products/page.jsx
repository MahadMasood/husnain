"use client";
import { useState, useEffect, useMemo } from "react";
import api, { fetchProducts } from "@/lib/api";
import { formatPrice } from "@/lib/currency";
import Link from "next/link";
import Image from "next/image";
import {
  Plus, Edit, Trash2, Search, Filter, ChevronDown, RefreshCw,
  Package, AlertCircle, X, CheckCircle2, XCircle, Eye, Star
} from "lucide-react";

// ─── Edit Modal ──────────────────────────────────────────
function EditModal({ product, onClose, onSave, isSaving }) {
  const [form, setForm] = useState({
    name: product.name || "",
    price: product.price || "",
    category: product.category || "",
    gender: product.gender || "Unisex",
    image: product.image || "",
    inStock: product.inStock ?? true,
    isNew: product.new ?? false,
    colors: product.colors?.join(", ") || "",
    size: product.size?.join(", ") || "",
    rating: product.rating || 0,
  });
  const [uploading, setUploading] = useState(false);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formDataData = new FormData();
    formDataData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await api.post('/upload', formDataData, config);

      setForm((prev) => ({ ...prev, image: data.image }));
      setUploading(false);
    } catch (err) {
      console.error(err);
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(product._id, {
      name: form.name,
      price: Number(form.price),
      category: form.category,
      gender: form.gender,
      image: form.image,
      inStock: form.inStock,
      isNew: form.isNew,
      colors: form.colors.split(",").map((c) => c.trim()).filter(Boolean),
      size: form.size.split(",").map((s) => s.trim()).filter(Boolean),
      rating: Number(form.rating),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="border-b border-stone-200 p-6 flex items-center justify-between bg-stone-50 rounded-t-2xl">
          <div>
            <p className="font-mono text-xs text-stone-400 uppercase tracking-wider">Edit Product</p>
            <h3 className="text-lg font-black text-slate-900 mt-1">{product.name}</h3>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-stone-200 transition-colors">
            <X className="w-5 h-5 text-stone-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block font-mono text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                Product Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 border border-stone-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 text-slate-700"
              />
            </div>

            <div>
              <label className="block font-mono text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                Price (PKR)
              </label>
              <input
                type="number"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full px-4 py-3 border border-stone-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 text-slate-700"
              />
            </div>

            <div>
              <label className="block font-mono text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-3 border border-stone-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 text-slate-700 bg-white"
              >
                <option value="Hoodies">Hoodies</option>
                <option value="Jackets">Jackets</option>
                <option value="Pants">Pants</option>
                <option value="T-Shirts">T-Shirts</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label className="block font-mono text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                Gender
              </label>
              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="w-full px-4 py-3 border border-stone-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 text-slate-700 bg-white"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>

            <div>
              <label className="block font-mono text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                Rating
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: e.target.value })}
                className="w-full px-4 py-3 border border-stone-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 text-slate-700"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-mono text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                Image Upload
              </label>
              <input
                type="file"
                name="image"
                onChange={uploadFileHandler}
                className="w-full px-4 py-3 border border-stone-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 text-slate-700"
              />
              {uploading && <p className="text-sm mt-2 text-stone-500">Uploading...</p>}
              {form.image && <p className="text-sm mt-2 text-green-600">Current image: {form.image}</p>}
            </div>

            <div>
              <label className="block font-mono text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                Colors (comma separated)
              </label>
              <input
                type="text"
                value={form.colors}
                onChange={(e) => setForm({ ...form, colors: e.target.value })}
                placeholder="Black, White, Red"
                className="w-full px-4 py-3 border border-stone-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 text-slate-700"
              />
            </div>

            <div>
              <label className="block font-mono text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                Sizes (comma separated)
              </label>
              <input
                type="text"
                value={form.size}
                onChange={(e) => setForm({ ...form, size: e.target.value })}
                placeholder="S, M, L, XL"
                className="w-full px-4 py-3 border border-stone-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 text-slate-700"
              />
            </div>

            <div className="md:col-span-2 flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.inStock}
                  onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
                  className="w-5 h-5 rounded border-stone-300 text-amber-500 focus:ring-amber-500"
                />
                <span className="text-sm font-medium text-stone-600">In Stock</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isNew}
                  onChange={(e) => setForm({ ...form, isNew: e.target.checked })}
                  className="w-5 h-5 rounded border-stone-300 text-amber-500 focus:ring-amber-500"
                />
                <span className="text-sm font-medium text-stone-600">New Arrival</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-stone-200 text-stone-600 font-mono text-sm rounded-xl hover:bg-stone-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-8 py-3 bg-amber-500 text-white font-bold text-sm rounded-xl hover:bg-amber-600 transition-all shadow-lg shadow-amber-200 disabled:opacity-50"
            >
              {isSaving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Delete Confirm Modal ────────────────────────────────
function DeleteModal({ product, onClose, onConfirm, isDeleting }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-2">Delete Product?</h3>
        <p className="text-stone-500 mb-6">
          Are you sure you want to delete <span className="font-bold text-slate-700">"{product.name}"</span>? This cannot be undone.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-stone-200 text-stone-600 font-mono text-sm rounded-xl hover:bg-stone-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(product._id)}
            disabled={isDeleting}
            className="px-8 py-3 bg-red-500 text-white font-bold text-sm rounded-xl hover:bg-red-600 transition-all shadow-lg shadow-red-200 disabled:opacity-50"
          >
            {isDeleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Admin Products Page ────────────────────────────
export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const loadProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Filter
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.gender?.toLowerCase().includes(q)
      );
    }
    if (categoryFilter !== "all") {
      result = result.filter((p) => p.category === categoryFilter);
    }
    if (stockFilter === "instock") result = result.filter((p) => p.inStock);
    else if (stockFilter === "out") result = result.filter((p) => !p.inStock);

    return result;
  }, [products, search, categoryFilter, stockFilter]);

  // Unique categories
  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];

  // Stats
  const inStock = products.filter((p) => p.inStock).length;
  const outOfStock = products.filter((p) => !p.inStock).length;
  const avgPrice = products.length > 0 ? products.reduce((s, p) => s + p.price, 0) / products.length : 0;

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleSave = async (id, data) => {
    setIsSaving(true);
    try {
      const { data: updated } = await api.put(`/products/${id}`, data);
      setProducts((prev) => prev.map((p) => (p._id === id ? updated : p)));
      setEditProduct(null);
      showSuccess("Product updated successfully!");
    } catch (err) {
      console.error("Failed to update product", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      setDeleteProduct(null);
      showSuccess("Product deleted successfully!");
    } catch (err) {
      console.error("Failed to delete product", err);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-stone-200 border-t-amber-500 rounded-full animate-spin mb-4" />
        <p className="font-mono text-sm text-stone-400">Loading products…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Failed to Load Products</h2>
        <p className="text-stone-500 mb-6 max-w-sm">{error}</p>
        <button
          onClick={loadProducts}
          className="px-6 py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Success banner */}
      {successMsg && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 text-sm text-green-700 font-medium animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" /> {successMsg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-black uppercase text-slate-900 tracking-tighter">Products</h2>
          <p className="font-mono text-xs text-stone-400 mt-1">Manage your product catalog</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadProducts}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm font-mono text-stone-600 hover:border-amber-400 hover:text-amber-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          <Link
            href="/admin/products/new"
            className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors shadow-lg shadow-amber-200"
          >
            <Plus className="w-4 h-4" /> Add Product
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total", value: products.length, color: "text-blue-600", bg: "bg-blue-100" },
          { label: "In Stock", value: inStock, color: "text-green-600", bg: "bg-green-100" },
          { label: "Out of Stock", value: outOfStock, color: "text-red-600", bg: "bg-red-100" },
          { label: "Avg Price", value: formatPrice(Math.round(avgPrice)), color: "text-amber-600", bg: "bg-amber-100" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-stone-200 p-4 flex items-center gap-3">
            <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center`}>
              <Package className={`w-5 h-5 ${s.color}`} />
            </div>
            <div>
              <p className="text-lg font-black text-slate-900">{s.value}</p>
              <p className="font-mono text-[10px] text-stone-400 uppercase">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 mb-4 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-stone-200 rounded-xl font-mono text-sm focus:outline-none focus:border-amber-400 text-slate-700 placeholder-stone-400"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="pl-9 pr-8 py-2.5 border border-stone-200 rounded-xl font-mono text-sm focus:outline-none focus:border-amber-400 text-slate-700 bg-white appearance-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="pl-4 pr-8 py-2.5 border border-stone-200 rounded-xl font-mono text-sm focus:outline-none focus:border-amber-400 text-slate-700 bg-white appearance-none cursor-pointer"
          >
            <option value="all">All Stock</option>
            <option value="instock">In Stock</option>
            <option value="out">Out of Stock</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-3">
        <p className="font-mono text-xs text-stone-400">
          Showing {filteredProducts.length} of {products.length} products
        </p>
        {search && (
          <button onClick={() => setSearch("")} className="font-mono text-xs text-amber-600 hover:text-amber-700 flex items-center gap-1">
            <X className="w-3 h-3" /> Clear search
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="p-4 font-mono text-[10px] text-stone-400 uppercase tracking-wider font-bold">Product</th>
                <th className="p-4 font-mono text-[10px] text-stone-400 uppercase tracking-wider font-bold">Category</th>
                <th className="p-4 font-mono text-[10px] text-stone-400 uppercase tracking-wider font-bold">Price</th>
                <th className="p-4 font-mono text-[10px] text-stone-400 uppercase tracking-wider font-bold">Rating</th>
                <th className="p-4 font-mono text-[10px] text-stone-400 uppercase tracking-wider font-bold">Status</th>
                <th className="p-4 font-mono text-[10px] text-stone-400 uppercase tracking-wider font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center">
                    <Package className="w-12 h-12 text-stone-200 mx-auto mb-3" />
                    <p className="font-bold text-slate-700 mb-1">No products found</p>
                    <p className="text-stone-400 text-sm">
                      {search ? "Try a different search term" : "Add your first product"}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="border-b border-stone-100 hover:bg-amber-50/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-stone-100 rounded-lg overflow-hidden shrink-0">
                          {product.image && (
                            <Image src={product.image} alt={product.name} width={48} height={48} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-slate-900">{product.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-mono text-[10px] text-stone-400">{product.gender}</span>
                            {product.new && (
                              <span className="font-mono text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">NEW</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-xs text-stone-500 bg-stone-100 px-2 py-1 rounded-md">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-black text-slate-900 text-sm">
                      {formatPrice(product.price)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="font-mono text-sm text-slate-700">{product.rating}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
                        product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {product.inStock ? (
                          <><CheckCircle2 className="w-3 h-3" /> In Stock</>
                        ) : (
                          <><XCircle className="w-3 h-3" /> Out of Stock</>
                        )}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setEditProduct(product)}
                          className="p-2 rounded-lg hover:bg-amber-100 text-stone-400 hover:text-amber-600 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteProduct(product)}
                          className="p-2 rounded-lg hover:bg-red-100 text-stone-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {editProduct && (
        <EditModal product={editProduct} onClose={() => setEditProduct(null)} onSave={handleSave} isSaving={isSaving} />
      )}
      {deleteProduct && (
        <DeleteModal product={deleteProduct} onClose={() => setDeleteProduct(null)} onConfirm={handleDelete} isDeleting={isDeleting} />
      )}
    </div>
  );
}
