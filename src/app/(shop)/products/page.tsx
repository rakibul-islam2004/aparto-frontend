import { Suspense } from "react";
import { ProductGrid } from "@/components/product/ProductCard";
import { ProductFilters } from "@/components/product/ProductFilters";
import { useProducts, useCategoryTree, useBrands } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="flex gap-8">
      <aside className="hidden lg:block w-64 shrink-0">
        <Suspense fallback={<div>Loading filters...</div>}>
          <Filters />
        </Suspense>
      </aside>

      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            All Products
          </h1>
          <Button variant="outline" size="sm" className="lg:hidden">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        <Suspense fallback={<div>Loading products...</div>}>
          <ProductGrid />
        </Suspense>
      </div>
    </div>
  );
}

function Filters() {
  const { data: categories } = useCategoryTree();
  const { data: brands } = useBrands();

  return (
    <div className="sticky top-24">
      <ProductFilters
        categories={categories || []}
        brands={brands || []}
      />
    </div>
  );
}
