"use client";

import { useCategoryTree, useBrands } from "@/hooks/useProducts";
import { ProductFilters } from "@/components/product/ProductFilters";

export function Filters() {
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
