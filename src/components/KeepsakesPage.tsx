import React, { useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { TributeProduct } from '../types';
import { TRIBUTE_PRODUCTS } from '../data/tributes';
import { V2ProductCard } from './v2/V2ProductCard';

interface KeepsakesPageProps {
  onSelectProduct: (product: TributeProduct) => void;
  onBackToHome: () => void;
}

type KeepsakeSubCategory = 'all' | 'urns' | 'jewelry' | 'photo' | 'engraved';

export const KeepsakesPage: React.FC<KeepsakesPageProps> = ({
  onSelectProduct,
  onBackToHome,
}) => {
  const [activeCategory, setActiveCategory] = useState<KeepsakeSubCategory>('all');

  const keepsakeIds = [
    'heritage-walnut-urn',
    'heritage-rose-urn',
    'tactile-fingerprint-teardrop',
    'forest-moss-velvet-chest',
    'rose-petal-pendant',
    'botanical-monogram-signet',
    'ceramic-teardrop-keepsake-urn',
    'botanical-pressed-glass-frame',
    'walnut-titanium-capsule',
  ];

  const allKeepsakes = keepsakeIds
    .map((id) => TRIBUTE_PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as TributeProduct[];

  const filteredProducts = allKeepsakes.filter((product) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'urns') return product.category === 'urns';
    if (activeCategory === 'jewelry') return product.category === 'jewelry';
    if (activeCategory === 'photo') {
      return (
        product.allowsPhotoToken ||
        product.id === 'forest-moss-velvet-chest' ||
        product.id === 'botanical-pressed-glass-frame'
      );
    }
    if (activeCategory === 'engraved') return product.allowsEngraving;
    return true;
  });

  const categoryTabs = [
    { key: 'all' as KeepsakeSubCategory, label: 'All Keepsakes', count: allKeepsakes.length },
    {
      key: 'urns' as KeepsakeSubCategory,
      label: 'Urns & Vessels',
      count: allKeepsakes.filter((p) => p.category === 'urns').length,
    },
    {
      key: 'jewelry' as KeepsakeSubCategory,
      label: 'Memorial Jewelry',
      count: allKeepsakes.filter((p) => p.category === 'jewelry').length,
    },
    {
      key: 'photo' as KeepsakeSubCategory,
      label: 'Photo Gifts & Boxes',
      count: allKeepsakes.filter(
        (p) =>
          p.allowsPhotoToken ||
          p.id === 'forest-moss-velvet-chest' ||
          p.id === 'botanical-pressed-glass-frame'
      ).length,
    },
    {
      key: 'engraved' as KeepsakeSubCategory,
      label: 'Engraved Memorial Items',
      count: allKeepsakes.filter((p) => p.allowsEngraving).length,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#1B1C19]">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="border-b border-[#E6E1D7] bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs text-[#5D655E]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={onBackToHome}
              className="text-[#343835] hover:text-[#1B1C19] font-medium transition-colors flex items-center gap-1.5 group cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>Store Home</span>
            </button>
            <ChevronRight className="w-3 h-3 text-[#A58A6D]" />
            <span className="text-[#1B1C19] font-medium">Keepsakes &amp; Urns</span>
          </nav>
          <div className="hidden sm:block text-[11px] text-[#717A72]">
            Margaret Williams Memorial Store
          </div>
        </div>
      </div>

      {/* Main Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-7 sm:space-y-8">
        {/* Page Header */}
        <div className="space-y-1.5">
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#343835] tracking-tight">
            Keepsakes &amp; Urns
          </h1>
          <p className="text-xs sm:text-sm text-[#566156] max-w-2xl leading-relaxed">
            Explore keepsakes, jewelry, urns, and personalized items selected for Margaret&apos;s family.
          </p>
        </div>

        {/* Product Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categoryTabs.map((tab) => {
            const isActive = activeCategory === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveCategory(tab.key)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-[4px] border transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#343835] text-white border-[#343835] shadow-xs'
                    : 'bg-[#FFFFFF] text-[#444844] border-[#E6E1D7] hover:bg-[#F2EFEA]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#F0EEE9] text-[#747874]'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 5-Column Responsive Product Grid */}
        <div className="memorial-product-grid pt-2">
          {filteredProducts.map((product) => (
            <V2ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
