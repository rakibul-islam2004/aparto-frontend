"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { categoriesApi, brandsApi, productsApi } from "@/services/catalog.service";
import type { Category, Brand, Product } from "@/types";

interface ProductFiltersProps {
  categories: Category[];
  brands: Brand[];
  initialFilters?: {
    categoryId?: string;
    brandId?: string;
    search?: string;
  };
}

export function ProductFilters({ categories, brands, initialFilters }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(initialFilters?.search || "");
  const [selectedCategory, setSelectedCategory] = useState(initialFilters?.categoryId || "");
  const [selectedBrands, setSelectedBrands] = useState<string[]>(initialFilters?.brandId ? [initialFilters.brandId] : []);

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };

  const toggleBrand = (brandId: string) => {
    const newSelected = selectedBrands.includes(brandId)
      ? selectedBrands.filter((id) => id !== brandId)
      : [...selectedBrands, brandId];
    setSelectedBrands(newSelected);
    updateFilters("brandId", newSelected.join(","));
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedBrands([]);
    router.push(window.location.pathname);
  };

  const hasActiveFilters = search || selectedCategory || selectedBrands.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
            Search
          </label>
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              updateFilters("search", e.target.value);
            }}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              updateFilters("categoryId", e.target.value);
            }}
            className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
            Brands
          </label>
          <div className="space-y-2">
            {brands.map((brand) => (
              <div key={brand.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand.id}`}
                  checked={selectedBrands.includes(brand.id)}
                  onCheckedChange={() => toggleBrand(brand.id)}
                />
                <label
                  htmlFor={`brand-${brand.id}`}
                  className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  {brand.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
