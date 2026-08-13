import api from "@/lib/api";
import type { Category, Brand, Product, ProductVariant } from "@/types";

export interface ProductsFilters {
  categoryId?: string;
  brandId?: string;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export const catalogService = {
  async getCategories() {
    const { data } = await api.get<Category[]>("/categories");
    return data;
  },

  async getCategoryTree() {
    const { data } = await api.get<Category[]>("/categories/tree");
    return data;
  },

  async getCategoryBySlug(slug: string) {
    const { data } = await api.get<Category>(`/categories/slug/${slug}`);
    return data;
  },

  async getCategoriesByRoomType(roomType: string) {
    const { data } = await api.get<Category[]>(`/categories/room/${roomType}`);
    return data;
  },

  async getBrands() {
    const { data } = await api.get<Brand[]>("/brands");
    return data;
  },

  async getBrandBySlug(slug: string) {
    const { data } = await api.get<Brand>(`/brands/slug/${slug}`);
    return data;
  },

  async getProducts(filters?: ProductsFilters) {
    const params = new URLSearchParams();
    if (filters?.categoryId) params.set("categoryId", filters.categoryId);
    if (filters?.brandId) params.set("brandId", filters.brandId);
    if (filters?.status) params.set("status", filters.status);
    if (filters?.search) params.set("search", filters.search);
    if (filters?.page) params.set("page", filters.page.toString());
    if (filters?.limit) params.set("limit", filters.limit.toString());

    const { data } = await api.get<{ data: Product[]; total: number; page: number; limit: number; totalPages: number }>(`/products?${params.toString()}`);
    return data;
  },

  async getProductBySlug(slug: string) {
    const { data } = await api.get<Product>(`/products/slug/${slug}`);
    return data;
  },

  async getProduct(id: string) {
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
  },

  async createProduct(payload: Partial<Product>) {
    const { data } = await api.post<Product>("/products", payload);
    return data;
  },

  async updateProduct(id: string, payload: Partial<Product>) {
    const { data } = await api.patch<Product>(`/products/${id}`, payload);
    return data;
  },

  async deleteProduct(id: string) {
    const { data } = await api.delete(`/products/${id}`);
    return data;
  },

  async createVariant(productId: string, payload: Partial<ProductVariant>) {
    const { data } = await api.post<ProductVariant>(`/products/${productId}/variants`, payload);
    return data;
  },

  async updateVariant(productId: string, variantId: string, payload: Partial<ProductVariant>) {
    const { data } = await api.patch<ProductVariant>(`/products/${productId}/variants/${variantId}`, payload);
    return data;
  },

  async getReviews(productId: string, page = 1, limit = 10) {
    const { data } = await api.get<{ data: any[]; total: number; page: number; limit: number; totalPages: number }>(`/reviews/product/${productId}?page=${page}&limit=${limit}`);
    return data;
  },

  async createReview(payload: { productId: string; rating: number; title?: string; comment?: string }) {
    const { data } = await api.post("/reviews", payload);
    return data;
  },
};
