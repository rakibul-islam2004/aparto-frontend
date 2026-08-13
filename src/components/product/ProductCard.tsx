import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import type { Product, ProductVariant } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, isAdding } = useCart();
  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlist();

  const primaryVariant = product.variants?.[0];
  const primaryMedia = product.media?.find((m) => m.isPrimary) || product.media?.[0];
  const isInWishlist = wishlistItems.some((item) => item.variantId === primaryVariant?.id);

  const handleAddToCart = async () => {
    if (!primaryVariant) return;
    await addItem({ variantId: primaryVariant.id, quantity: 1 });
  };

  const handleToggleWishlist = async () => {
    if (!primaryVariant) return;
    if (isInWishlist) {
      await removeFromWishlist(primaryVariant.id);
    } else {
      await addToWishlist(primaryVariant.id);
    }
  };

  const hasSale = primaryVariant && primaryVariant.salePrice && Number(primaryVariant.salePrice) < Number(primaryVariant.price);

  return (
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-900">
      <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
        {primaryMedia ? (
          <Image
            src={primaryMedia.url}
            alt={primaryMedia.altText || product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No Image
          </div>
        )}

        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {hasSale && <Badge variant="sale">Sale</Badge>}
        </div>

        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow-sm"
            onClick={handleToggleWishlist}
          >
            <Heart className={`h-4 w-4 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-medium text-sm text-slate-900 dark:text-slate-100 line-clamp-2 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>

          {product.category && (
            <Link href={`/categories/${product.category.slug}`}>
              <p className="text-xs text-muted-foreground hover:text-primary transition-colors">
                {product.category.name}
              </p>
            </Link>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-col">
              {hasSale && primaryVariant?.salePrice ? (
                <>
                  <span className="text-lg font-bold text-primary">
                    ৳{Number(primaryVariant.salePrice).toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground line-through">
                    ৳{Number(primaryVariant.price).toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-primary">
                  ৳{primaryVariant ? Number(primaryVariant.price).toLocaleString() : "N/A"}
                </span>
              )}
            </div>

            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={isAdding || !primaryVariant}
              className="shrink-0"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              {isAdding ? "Adding..." : "Add"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
