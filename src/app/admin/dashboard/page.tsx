'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ShoppingBag,
  Users,
  Package,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Plus,
} from 'lucide-react';
import { useAuthStore } from '@/stores/auth.store';
import api from '@/lib/api';

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalProducts: number;
  pendingOrders: number;
  lowStockCount: number;
}

interface RecentOrder {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: number;
  createdAt: string;
  customer: {
    name: string;
    email: string;
  };
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
      router.push('/login');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const [statsRes, ordersRes] = await Promise.all([
          api.get('/dashboard/stats'),
          api.get('/dashboard/recent-orders?limit=10'),
        ]);
        setStats(statsRes.data);
        setRecentOrders(ordersRes.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [isAuthenticated, user, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">Failed to load dashboard data</p>
      </div>
    );
  }

  const statCards = [
    { title: 'Total Orders', value: stats.totalOrders, icon: ShoppingBag, color: 'text-sky-600', bg: 'bg-sky-50 dark:bg-sky-950' },
    { title: 'Total Revenue', value: `৳${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950' },
    { title: 'Total Customers', value: stats.totalCustomers, icon: Users, color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-950' },
    { title: 'Total Products', value: stats.totalProducts, icon: Package, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950' },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      PENDING_PAYMENT: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
      CONFIRMED: 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200',
      PROCESSING: 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200',
      SHIPPED: 'text-indigo-100 bg-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
      DELIVERED: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
      CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };
    return <Badge className={variants[status] || 'bg-slate-100 text-slate-800'}>{status.replace(/_/g, ' ')}</Badge>;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-serif">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, {user?.name || 'Admin'}</p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/admin/products/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, idx) => (
            <Card key={idx} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bg}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Alerts */}
        {(stats.pendingOrders > 0 || stats.lowStockCount > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {stats.pendingOrders > 0 && (
              <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950">
                <CardContent className="p-4 flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="font-medium text-amber-900 dark:text-amber-100">{stats.pendingOrders} pending orders</p>
                    <p className="text-sm text-amber-700 dark:text-amber-300">Require payment confirmation</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild className="ml-auto">
                    <Link href="/admin/orders">View</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
            {stats.lowStockCount > 0 && (
              <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950">
                <CardContent className="p-4 flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-medium text-red-900 dark:text-red-100">{stats.lowStockCount} low stock items</p>
                    <p className="text-sm text-red-700 dark:text-red-300">Need restocking soon</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild className="ml-auto">
                    <Link href="/admin/inventory">View</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Recent Orders */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/orders">
                View All <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Order</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Payment</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Total</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900">
                      <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                        <Link href={`/account/orders/${order.id}`} className="hover:text-primary">
                          {order.orderNumber}
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{order.customer?.name || 'Guest'}</td>
                      <td className="py-3 px-4">{getStatusBadge(order.status)}</td>
                      <td className="py-3 px-4">
                        <Badge variant={order.paymentStatus === 'PAID' ? 'default' : 'secondary'}>
                          {order.paymentStatus.replace(/_/g, ' ')}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right font-medium">৳{Number(order.total).toLocaleString()}</td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString('en-BD')}
                      </td>
                    </tr>
                  ))}
                  {recentOrders.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-muted-foreground">
                        No orders yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {[
            { title: 'Products', href: '/admin/products', icon: Package },
            { title: 'Categories', href: '/admin/categories', icon: TrendingUp },
            { title: 'Orders', href: '/admin/orders', icon: ShoppingBag },
            { title: 'Customers', href: '/admin/customers', icon: Users },
          ].map((link, idx) => (
            <Link key={idx} href={link.href}>
              <Card className="border-0 shadow-sm hover:shadow-md transition cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <link.icon className="h-5 w-5 text-primary" />
                  <span className="font-medium text-slate-900 dark:text-white">{link.title}</span>
                  <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
