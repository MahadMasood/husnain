"use client";
import Link from 'next/link';
import AdminGuard from '@/components/admin/AdminGuard';
import { LayoutDashboard, Package, ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  return (
    <AdminGuard>
      {isLoginPage ? (
        children
      ) : (
        <div className="flex min-h-screen bg-stone-100">
          {/* Sidebar */}
          <aside className="w-64 bg-slate-900 text-white flex flex-col">
            <div className="p-6">
              <h2 className="text-2xl font-black tracking-tighter uppercase text-amber-500">ThreadCo Admin</h2>
            </div>
            <nav className="flex-1 px-4 space-y-2">
              <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors">
                <LayoutDashboard size={20} />
                <span className="font-medium">Dashboard</span>
              </Link>
              <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors">
                <Package size={20} />
                <span className="font-medium">Products</span>
              </Link>
              <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors">
                <ShoppingCart size={20} />
                <span className="font-medium">Orders</span>
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col overflow-hidden">
            <header className="h-16 bg-white border-b border-stone-200 flex items-center px-8 shadow-sm">
              <h1 className="text-xl font-bold text-slate-800">Admin Portal</h1>
            </header>
            <div className="flex-1 overflow-auto p-8">
              {children}
            </div>
          </main>
        </div>
      )}
    </AdminGuard>
  );
}
