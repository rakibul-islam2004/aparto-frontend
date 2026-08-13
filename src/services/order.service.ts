import api from "@/lib/api";
import type { Order, OrderItem, Address } from "@/types";

export interface CreateOrderPayload {
  shippingAddress: Record<string, any>;
  billingAddress?: Record<string, any>;
  shipping?: number;
  couponCode?: string;
  notes?: string;
}

export const orderService = {
  async createOrder(payload: CreateOrderPayload) {
    const { data } = await api.post<Order>("/orders", payload);
    return data;
  },

  async initiatePayment(orderId: string, gateway: string) {
    const { data } = await api.post<{ payment: any; redirectUrl: string }>("/payments/initiate", {
      orderId,
      gateway,
    });
    return data;
  },

  async getOrders(filters?: { status?: string; page?: number; limit?: number }) {
    const params = new URLSearchParams();
    if (filters?.status) params.set("status", filters.status);
    if (filters?.page) params.set("page", filters.page.toString());
    if (filters?.limit) params.set("limit", filters.limit.toString());

    const { data } = await api.get<{ data: Order[]; total: number; page: number; limit: number; totalPages: number }>(`/orders?${params.toString()}`);
    return data;
  },

  async getOrder(id: string) {
    const { data } = await api.get<Order>(`/orders/${id}`);
    return data;
  },

  async getOrderByNumber(orderNumber: string) {
    const { data } = await api.get<Order>(`/orders/number/${orderNumber}`);
    return data;
  },

  async cancelOrder(id: string) {
    const { data } = await api.patch<Order>(`/orders/${id}/cancel`);
    return data;
  },
};
