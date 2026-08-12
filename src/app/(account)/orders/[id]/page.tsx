import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Order Details - Aparto",
};

export default function OrderDetailPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/account/orders">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Orders
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order #ORD-1234567890</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Order details will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
