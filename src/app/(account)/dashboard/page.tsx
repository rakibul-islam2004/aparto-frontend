'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/stores/auth.store';
import { orderService } from '@/services/order.service';
import api from '@/lib/api';
import {
  ShoppingBag,
  User,
  MapPin,
  Heart,
  Settings,
  ChevronRight,
  Loader2,
} from 'lucide-react';

interface OrderSummary {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: number;
  createdAt: string;
}

interface Address {
  id: string;
  fullName: string;
  phone: string;
  addressLine: string;
  area: string;
  city: string;
  isDefault: boolean;
}

export default function AccountDashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/account');
      return;
    }

    const fetchData = async () => {
      try {
        const [ordersRes, addressesRes] = await Promise.all([
          api.get('/orders?limit=5'),
          api.get('/users/me/addresses'),
        ]);
        setOrders(ordersRes.data.data || []);
        setAddresses(addressesRes.data || []);
      } catch (error) {
        console.error('Failed to fetch account data', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      PENDING_PAYMENT: 'bg-amber-100 text-amber-800',
      CONFIRMED: 'bg-sky-100 text-sky-800',
      PROCESSING: 'bg-violet-100 text-violet-800',
      SHIPPED: 'bg-indigo-100 text-indigo-800',
      DELIVERED: 'bg-emerald-100 text-emerald-800',
      CANCELLED: 'bg-red-100 text-red-800',
    };
    return <Badge className={variants[status] || 'bg-slate-100 text-slate-800'}>{status.replace(/_/g, ' ')}</Badge>;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{user?.name || 'User'}</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <nav className="space-y-1">
                  {[
                    { title: 'Dashboard', href: '/account', icon: Settings },
                    { title: 'Orders', href: '/account/orders', icon: ShoppingBag },
                    { title: 'Wishlist', href: '/wishlist', icon: Heart },
                    { title: 'Addresses', href: '/account/addresses', icon: MapPin },
                  ].map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Recent Orders */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/account/orders">
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {orders.length > 0 ? (
                  <div className="space-y-3">
                    {orders.map((order) => (
                      <Link
                        key={order.id}
                        href={`/account/orders/${order.id}`}
                        className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-slate-900 dark:text-white">{order.orderNumber}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString('en-BD')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-slate-900 dark:text-white">৳{Number(order.total).toLocaleString()}</p>
                          <div className="flex gap-2 mt-1">
                            {getStatusBadge(order.status)}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No orders yet</p>
                    <Button asChild>
                      <Link href="/products">Start Shopping</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Default Address */}
            {addresses.length > 0 && (
              <Card className="border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Default Address</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/account/addresses">
                      Manage <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {addresses.find(a => a.isDefault) ? (
                    <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                      <p className="font-medium text-slate-900 dark:text-white">{addresses.find(a => a.isDefault)?.fullName}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {addresses.find(a => a.isDefault)?.addressLine}, {addresses.find(a => a.isDefault)?.area}, {addresses.find(a => a.isDefault)?.city}
                      </p>
                      <p className="text-sm text-muted-foreground">{addresses.find(a => a.isDefault)?.phone}</p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No default address set</p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
