import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductFilters } from '@/components/product/ProductFilters';
import { useProducts, useCategoryTree, useBrands } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, X } from 'lucide-react';
import { notFound } from 'next/navigation';

interface SearchPageProps {
  searchParams: { q?: string; category?: string; brand?: string };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {query ? `Search results for "${query}"` : 'Search Products'}
          </h1>
          {query && (
            <Button variant="ghost" size="sm" asChild>
              <a href="/products">Clear search</a>
            </Button>
          )}
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 shrink-0">
            <Suspense fallback={<div>Loading filters...</div>}>
              <Filters />
            </Suspense>
          </aside>

          <div className="flex-1">
            <Suspense fallback={<div>Loading products...</div>}>
              <SearchResults query={query} categoryId={searchParams.category} brandId={searchParams.brand} />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}

function Filters() {
  const { data: categories } = useCategoryTree();
  const { data: brands } = useBrands();

  return (
    <div className="sticky top-24">
      <ProductFilters categories={categories || []} brands={brands || []} />
    </div>
  );
}

function SearchResults({ query, categoryId, brandId }: { query: string; categoryId?: string; brandId?: string }) {
  const { data: response, isLoading, error } = useProducts({
    search: query || undefined,
    categoryId: categoryId || undefined,
    brandId: brandId || undefined,
    status: 'ACTIVE',
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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

  const products = response?.data || []; if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No products found</p>
        <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
      </div>
    );
  }

  return <ProductGrid search={query} categoryId={categoryId} brandId={brandId} />;
}
