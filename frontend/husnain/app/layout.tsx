import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CursorProvider from "@/components/ui/CursorProvider";
import StaggeredMenuWithCart from "@/components/ui/StaggeredMenu";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ThreadCo — Premium Fashion for Everyone",
  description: "Discover premium clothing for kids and adults. Quality streetwear, essentials, and seasonal collections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <CartProvider>
            <StaggeredMenuWithCart />
            <CursorProvider />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}