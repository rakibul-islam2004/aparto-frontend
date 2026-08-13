import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { ProductGrid } from '@/components/product/ProductGrid';
import { useCategoryTree, useProducts } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, Loader2 } from 'lucide-react';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface CategoryPageProps {
  params: { slug: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/categories/slug/${params.slug}`, {
    next: { revalidate: 60 },
  })
    .then((res) => {
      if (!res.ok) return null;
      return res.json();
    })
    .catch(() => null);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-medium">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white font-serif">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-muted-foreground mt-2 max-w-3xl">{category.description}</p>
          )}
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-64 shrink-0">
            <Suspense fallback={<div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Loading filters...</div>}>
              <CategoryFilters categoryId={category.id} />
            </Suspense>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Products
              </h2>
              <Button variant="outline" size="sm" className="lg:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            <Suspense fallback={<div className="flex items-center justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
              <CategoryProductGrid categoryId={category.id} />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}

function CategoryFilters({ categoryId }: { categoryId: string }) {
  return (
    <div className="sticky top-24">
      <p className="text-sm text-muted-foreground mb-4">Filters for this category coming soon.</p>
    </div>
  );
}

function CategoryProductGrid({ categoryId }: { categoryId: string }) {
  const { data: response, isLoading, error } = useProducts({ categoryId, page: 1, limit: 12 });
  const products = response?.data || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Failed to load products</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No products found in this category</p>
        <Button asChild>
          <a href="/products">Browse All Products</a>
        </Button>
      </div>
    );
  }

  return <ProductGrid categoryId={categoryId} />;
}
