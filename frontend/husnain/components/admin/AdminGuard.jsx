"use client";
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function AdminGuard({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user || !user.isAdmin) {
        if (pathname !== '/admin/login') {
          router.push('/admin/login');
        }
      } else if (pathname === '/admin/login') {
        // If they are logged in and on the login page, push to admin
        router.push('/admin');
      }
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <p className="text-xl font-mono text-stone-500">Verifying Admin Access...</p>
      </div>
    );
  }

  // If on login page and not logged in, just render (it will render the login form)
  if (pathname === '/admin/login' && (!user || !user.isAdmin)) {
    return <>{children}</>;
  }

  // If not logged in and not on login page, render loading while it redirects
  if (!user || !user.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <p className="text-xl font-mono text-stone-500">Redirecting to login...</p>
      </div>
    );
  }

  return <>{children}</>;
}
