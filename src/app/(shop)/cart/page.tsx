import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { CartPageClient } from "./CartPageClient";

export const metadata: Metadata = {
  title: "Shopping Cart - Aparto",
  description: "View and manage your shopping cart",
};

export default function CartPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CartPageClient />
      </main>
    </div>
  );
}
