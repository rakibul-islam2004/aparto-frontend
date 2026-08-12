export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  role: Role;
  emailVerified: boolean;
  phoneVerified: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
  profile?: CustomerProfile;
}

export interface CustomerProfile {
  id: string;
  userId: string;
  avatar?: string;
  dateOfBirth?: string;
  preferences?: Record<string, any>;
}

export interface Address {
  id: string;
  userId: string;
  type: AddressType;
  fullName: string;
  phone: string;
  addressLine: string;
  area: string;
  city: string;
  postalCode?: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  prefix: string;
  parentId?: string;
  roomType?: RoomType;
  image?: string;
  icon?: string;
  description?: string;
  isActive: boolean;
  sortOrder: number;
  children?: Category[];
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductMedia {
  id: string;
  productId: string;
  type: MediaType;
  url: string;
  altText?: string;
  sortOrder: number;
  isPrimary: boolean;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  barcode?: string;
  attributes: Record<string, any>;
  price: number;
  salePrice?: number;
  cost: number;
  weight?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  brandId?: string;
  categoryId: string;
  tags: string[];
  status: ProductStatus;
  roomTypes: RoomType[];
  createdAt: string;
  updatedAt: string;
  category?: Category;
  brand?: Brand;
  variants?: ProductVariant[];
  media?: ProductMedia[];
}

export interface CartItem {
  id: string;
  cartId: string;
  variantId: string;
  quantity: number;
  variant?: ProductVariant;
  product?: Product;
}

export interface Cart {
  id: string;
  userId?: string;
  sessionId?: string;
  items: CartItem[];
}

export interface WishlistItem {
  id: string;
  userId: string;
  variantId: string;
  variant?: ProductVariant;
  product?: Product;
}

export interface OrderItem {
  id: string;
  orderId: string;
  variantId: string;
  quantity: number;
  price: number;
  total: number;
  variant?: ProductVariant;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  paidAmount: number;
  dueAmount: number;
  couponCode?: string;
  shippingAddress: Record<string, any>;
  billingAddress: Record<string, any>;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  items?: OrderItem[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  CATALOG_MANAGER = "CATALOG_MANAGER",
  INVENTORY_MANAGER = "INVENTORY_MANAGER",
  ORDER_MANAGER = "ORDER_MANAGER",
  CUSTOMER_SUPPORT = "CUSTOMER_SUPPORT",
  MARKETING_MANAGER = "MARKETING_MANAGER",
  ACCOUNTS_FINANCE = "ACCOUNTS_FINANCE",
  CUSTOMER = "CUSTOMER",
}

export enum AddressType {
  BILLING = "BILLING",
  SHIPPING = "SHIPPING",
  BOTH = "BOTH",
}

export enum RoomType {
  BATHROOM = "BATHROOM",
  BEDROOM = "BEDROOM",
  KITCHEN = "KITCHEN",
  LIVING_ROOM = "LIVING_ROOM",
  BALCONY = "BALCONY",
  HOME_OFFICE = "HOME_OFFICE",
}

export enum MediaType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}

export enum ProductStatus {
  DRAFT = "DRAFT",
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  ARCHIVED = "ARCHIVED",
}

export enum OrderStatus {
  DRAFT = "DRAFT",
  PENDING_PAYMENT = "PENDING_PAYMENT",
  CONFIRMED = "CONFIRMED",
  PROCESSING = "PROCESSING",
  PACKED = "PACKED",
  READY_FOR_PICKUP = "READY_FOR_PICKUP",
  SHIPPED = "SHIPPED",
  IN_TRANSIT = "IN_TRANSIT",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  RETURNED = "RETURNED",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PARTIALLY_PAID = "PARTIALLY_PAID",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
  PARTIALLY_REFUNDED = "PARTIALLY_REFUNDED",
}
