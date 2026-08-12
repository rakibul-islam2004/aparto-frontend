"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";

export function CartPageClient() {
  const { cart, isLoading, updateItem, removeItem, clearCart } = useCart();
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild size="lg">
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  const subtotal = cart.items.reduce(
    (sum, item) => sum + (item.variant?.price || 0) * item.quantity,
    0
  );
  const shipping = subtotal > 5000 ? 0 : 150;
  const total = subtotal + shipping;

  const handleUpdateQuantity = async (itemId: string, currentQuantity: number, delta: number) => {
    setUpdatingItems((prev) => new Set(prev).add(itemId));
    const newQuantity = currentQuantity + delta;
    if (newQuantity <= 0) {
      await removeItem(itemId);
    } else {
      await updateItem(itemId, newQuantity);
    }
    setUpdatingItems((prev) => {
      const next = new Set(prev);
      next.delete(itemId);
      return next;
    });
  };

  const handleRemoveItem = async (itemId: string) => {
    setUpdatingItems((prev) => new Set(prev).add(itemId));
    await removeItem(itemId);
    setUpdatingItems((prev) => {
      const next = new Set(prev);
      next.delete(itemId);
      return next;
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Shopping Cart ({cart.items.length})
          </h1>
          <Button variant="ghost" size="sm" onClick={clearCart}>
            <Trash2 className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        </div>

        <div className="space-y-4">
          {cart.items.map((item) => {
            const isUpdating = updatingItems.has(item.id);
            const primaryMedia = item.variant?.product?.media?.find((m) => m.isPrimary) || item.variant?.product?.media?.[0];

            return (
              <Card key={item.id} className={`transition-opacity ${isUpdating ? "opacity-50" : ""}`}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                      {primaryMedia ? (
                        <img
                          src={primaryMedia.url}
                          alt={primaryMedia.altText || item.variant?.product?.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
                          No Image
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-4">
                        <div>
                          <Link href={`/products/${item.variant?.product?.slug}`}>
                            <h3 className="font-medium text-slate-900 dark:text-slate-100 hover:text-primary transition-colors line-clamp-2">
                              {item.variant?.product?.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">
                            SKU: {item.variant?.sku}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold text-slate-900 dark:text-white">
                            ৳{((item.variant?.price || 0) * item.quantity).toLocaleString()}
                          </p>
                          {item.variant?.salePrice && Number(item.variant.salePrice) < Number(item.variant.price) && (
                            <p className="text-xs text-muted-foreground line-through">
                              ৳{(Number(item.variant.price) * item.quantity).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                            disabled={isUpdating}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                            disabled={isUpdating}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={isUpdating}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `৳${shipping}`}</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">৳{total.toLocaleString()}</span>
              </div>
              <Button asChild className="w-full mt-4" size="lg">
                <Link href="/checkout">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Free shipping on orders over ৳5,000
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
