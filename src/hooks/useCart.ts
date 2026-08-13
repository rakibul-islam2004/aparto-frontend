"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { ProductMedia } from "@/types";

interface CartItem {
  id: string;
  variantId: string;
  quantity: number;
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

export function useCart() {
  const queryClient = useQueryClient();

  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const { data } = await api.get<{ id: string; items: CartItem[] }>("/cart");
      return data;
    },
  });

  const addItemMutation = useMutation({
    mutationFn: async (payload: { variantId: string; quantity?: number }) => {
      const { data } = await api.post("/cart/items", payload);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const updateItemMutation = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      const { data } = await api.patch(`/cart/items/${itemId}`, { quantity });
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const removeItemMutation = useMutation({
    mutationFn: async (itemId: string) => {
      const { data } = await api.delete(`/cart/items/${itemId}`);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      const { data } = await api.delete("/cart");
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  return {
    cart: cartQuery.data,
    isLoading: cartQuery.isLoading,
    addItem: addItemMutation.mutateAsync,
    updateItem: updateItemMutation.mutateAsync,
    removeItem: removeItemMutation.mutateAsync,
    clearCart: clearCartMutation.mutateAsync,
    isAdding: addItemMutation.isPending,
    isUpdating: updateItemMutation.isPending,
  };
}
