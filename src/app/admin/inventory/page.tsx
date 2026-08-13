'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/stores/auth.store';
import api from '@/lib/api';
import { Loader2, AlertTriangle } from 'lucide-react';

interface InventoryItem {
  id: string;
  onHand: number;
  reserved: number;
  available: number;
  reorderLevel: number;
  variant: {
    sku: string;
    product: {
      name: string;
      slug: string;
    };
  };
  warehouse: {
    name: string;
  };
}

export default function AdminInventoryPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
      router.push('/login');
      return;
    }

    const fetchInventory = async () => {
      try {
        const { data } = await api.get('/inventory');
        setInventory(data || []);
      } catch (error) {
        console.error('Failed to fetch inventory', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInventory();
  }, [isAuthenticated, user, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-serif">Inventory</h1>
          <div className="flex items-center gap-2 text-amber-600">
            <AlertTriangle className="h-5 w-5" />
            <span className="text-sm font-medium">{inventory.filter(i => i.available <= i.reorderLevel).length} low stock items</span>
          </div>
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Product</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">SKU</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Warehouse</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">On Hand</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Reserved</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Available</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900">
                      <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">{item.variant.product.name}</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400 font-mono text-xs">{item.variant.sku}</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{item.warehouse.name}</td>
                      <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">{item.onHand}</td>
                      <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">{item.reserved}</td>
                      <td className="py-3 px-4 text-right font-medium">
                        <span className={item.available <= item.reorderLevel ? 'text-red-600' : 'text-slate-900 dark:text-white'}>
                          {item.available}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {item.available <= item.reorderLevel ? (
                          <Badge variant="destructive">Low Stock</Badge>
                        ) : (
                          <Badge variant="default">In Stock</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                  {inventory.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-muted-foreground">No inventory records found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
