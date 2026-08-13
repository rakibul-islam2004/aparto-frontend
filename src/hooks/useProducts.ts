"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { catalogService } from "@/services/catalog.service";
import type { Product, Category, Brand } from "@/types";

export function useProducts(filters?: { categoryId?: string; brandId?: string; status?: string; search?: string; page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => catalogService.getProducts(filters),
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["products", slug],
    queryFn: () => catalogService.getProductBySlug(slug),
    enabled: !!slug,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => catalogService.getCategories(),
  });
}

export function useCategoryTree() {
  return useQuery({
    queryKey: ["categories", "tree"],
    queryFn: () => catalogService.getCategoryTree(),
  });
}

export function useBrands() {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () => catalogService.getBrands(),
  });
}
