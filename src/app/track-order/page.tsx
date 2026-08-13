'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Search, Loader2, ChevronRight } from 'lucide-react';
import api from '@/lib/api';

interface TrackingResult {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: number;
  createdAt: string;
  shippingAddress: Record<string, any>;
  items: {
    quantity: number;
    price: number;
    total: number;
    variant?: {
      sku: string;
      product: {
        name: string;
        slug: string;
        media?: { url: string }[];
      };
    };
  }[];
}

const statusSteps = [
  { key: 'PENDING_PAYMENT', label: 'Pending Payment' },
  { key: 'CONFIRMED', label: 'Confirmed' },
  { key: 'PROCESSING', label: 'Processing' },
  { key: 'PACKED', label: 'Packed' },
  { key: 'SHIPPED', label: 'Shipped' },
  { key: 'IN_TRANSIT', label: 'In Transit' },
  { key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery' },
  { key: 'DELIVERED', label: 'Delivered' },
];

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;

    setIsSearching(true);
    setError('');
    setResult(null);

    try {
      const { data } = await api.get<TrackingResult>(`/orders/track/${orderNumber.trim()}`);
      setResult(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Order not found. Please check your order number.');
    } finally {
      setIsSearching(false);
    }
  };

  const currentStepIndex = result ? statusSteps.findIndex((s) => s.key === result.status) : -1;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <ShoppingBag className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-serif">Track Your Order</h1>
          <p className="text-muted-foreground mt-2">Enter your order number to check the latest status</p>
        </div>

        <Card className="border-0 shadow-sm mb-8">
          <CardContent className="p-6">
            <form onSubmit={handleTrack} className="flex gap-3">
              <Input
                placeholder="Enter order number (e.g. ORD-ABC123)"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isSearching}>
                {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                <span className="ml-2">Track</span>
              </Button>
            </form>
            {error && (
              <p className="text-red-600 text-sm mt-3">{error}</p>
            )}
          </CardContent>
        </Card>

        {result && (
          <div className="space-y-6">
            {/* Order Info */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Order Number</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{result.orderNumber}</p>
                  </div>
                  <Badge variant={result.paymentStatus === 'PAID' ? 'default' : 'secondary'}>
                    {result.paymentStatus.replace(/_/g, ' ')}
                  </Badge>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="text-xl font-bold text-primary">৳{Number(result.total).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Order Date</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {new Date(result.createdAt).toLocaleDateString('en-BD')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status Timeline */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-6">Delivery Status</h3>
                <div className="relative">
                  <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-slate-800" />
                  {statusSteps.map((step, idx) => {
                    const isCompleted = idx <= currentStepIndex && currentStepIndex >= 0;
                    const isCurrent = idx === currentStepIndex;
                    return (
                      <div key={step.key} className="relative flex items-start gap-4 pb-6 last:pb-0">
                        <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          isCompleted
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                        }`}>
                          {isCompleted ? <ChevronRight className="h-4 w-4" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                        </div>
                        <div className="pt-1">
                          <p className={`font-medium ${isCurrent ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>
                            {step.label}
                          </p>
                          {isCurrent && (
                            <p className="text-sm text-muted-foreground mt-0.5">Current status</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Order Items</h3>
                <div className="space-y-3">
                  {result.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 dark:text-white">
                          {item.variant?.product?.name || `Item ${idx + 1}`}
                        </p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-medium text-slate-900 dark:text-white">৳{Number(item.total).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            {result.shippingAddress && (
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Shipping Address</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {result.shippingAddress.fullName}, {result.shippingAddress.addressLine}, {result.shippingAddress.area}, {result.shippingAddress.city}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{result.shippingAddress.phone}</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
