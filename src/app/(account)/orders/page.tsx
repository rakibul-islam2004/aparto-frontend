import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { orderService } from "@/services/order.service";
import { useAuthStore } from "@/stores/auth.store";
import { Package, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "My Orders - Aparto",
  description: "View your order history",
};

export default function OrdersPage() {
  // This would be a client component in real implementation
  // For now, showing the structure

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Orders</h1>
        <p className="text-slate-500 mt-2">Track, return, or buy things again</p>
      </div>

      <Card>
        <CardContent className="p-8 text-center">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
          <p className="text-muted-foreground mb-4">When you place an order, it will appear here.</p>
          <Button asChild>
            <Link href="/products">Start Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
