"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { ProductMedia } from "@/types";

interface WishlistItem {
  id: string;
  variantId: string;
  createdAt: string;
  variant?: {
    id: string;
    sku: string;
    price: number;
    salePrice?: number;
    product: {
      id: string;
      name: string;
      slug: string;
      media: ProductMedia[];
    };
  };
}

export function useWishlist() {
  const queryClient = useQueryClient();

  const wishlistQuery = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const { data } = await api.get<WishlistItem[]>("/wishlist");
      return data;
    },
  });

  const addItemMutation = useMutation({
    mutationFn: async (variantId: string) => {
      const { data } = await api.post("/wishlist/items", { variantId });
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wishlist"] }),
  });

  const removeItemMutation = useMutation({
    mutationFn: async (variantId: string) => {
      const { data } = await api.delete(`/wishlist/items/${variantId}`);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wishlist"] }),
  });

  return {
    items: wishlistQuery.data || [],
    isLoading: wishlistQuery.isLoading,
    addItem: addItemMutation.mutateAsync,
    removeItem: removeItemMutation.mutateAsync,
    isAdding: addItemMutation.isPending,
    isRemoving: removeItemMutation.isPending,
  };
}
