'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';
import { useAuthStore } from '@/stores/auth.store';
import { ShoppingBag, Heart, Trash2, Loader2, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { items, isLoading, removeItem } = useWishlist();
  const { addItem: addToCart } = useCart();
  const [removingItems, setRemovingItems] = useState<Set<string>>(new Set());
  const [addingToCart, setAddingToCart] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/wishlist');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Please login to view wishlist</h2>
          <Button asChild>
            <Link href="/login?redirect=/wishlist">Login to continue</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const handleRemove = async (variantId: string) => {
    setRemovingItems((prev) => new Set(prev).add(variantId));
    await removeItem(variantId);
    setRemovingItems((prev) => {
      const next = new Set(prev);
      next.delete(variantId);
      return next;
    });
  };

  const handleAddToCart = async (variantId: string) => {
    setAddingToCart((prev) => new Set(prev).add(variantId));
    await addToCart({ variantId, quantity: 1 });
    setAddingToCart((prev) => {
      const next = new Set(prev);
      next.delete(variantId);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-serif">My Wishlist</h1>
          <span className="text-muted-foreground">{items.length} items</span>
        </div>

        {items.length === 0 ? (
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="text-center">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-6">Save items you love to your wishlist</p>
              <Button asChild size="lg">
                <Link href="/products">Explore Products</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item) => {
              const variant = item.variant;
              const product = variant?.product;
              const primaryMedia = product?.media?.find((m) => m.isPrimary) || product?.media?.[0];
              const hasSale = variant?.salePrice && Number(variant.salePrice) < Number(variant.price);
              const isRemoving = removingItems.has(item.variantId);
              const isAdding = addingToCart.has(item.variantId);

              return (
                <Card key={item.id} className={`border-0 shadow-sm transition-opacity ${isRemoving ? 'opacity-50' : ''}`}>
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
                      {primaryMedia ? (
                        <img
                          src={primaryMedia.url}
                          alt={primaryMedia.altText || product?.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">No Image</div>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 bg-white/90 hover:bg-white shadow-sm"
                        onClick={() => variant?.id && handleRemove(variant.id)}
                        disabled={isRemoving}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                    <div className="p-4 space-y-2">
                      <Link href={`/products/${product?.slug}`}>
                        <h3 className="font-medium text-sm text-slate-900 dark:text-slate-100 line-clamp-2 hover:text-primary transition">
                          {product?.name}
                        </h3>
                      </Link>
                      <div className="flex items-center justify-between pt-2">
                        <div>
                          {hasSale ? (
                            <>
                              <span className="text-lg font-bold text-primary">৳{Number(variant?.salePrice).toLocaleString()}</span>
                              <span className="text-xs text-muted-foreground line-through ml-2">৳{Number(variant?.price).toLocaleString()}</span>
                            </>
                          ) : (
                            <span className="text-lg font-bold text-primary">৳{variant ? Number(variant.price).toLocaleString() : 'N/A'}</span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          onClick={() => variant?.id && handleAddToCart(variant.id)}
                          disabled={isAdding || !variant}
                        >
                          <ShoppingBag className="h-4 w-4 mr-1" />
                          {isAdding ? 'Adding...' : 'Add'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
