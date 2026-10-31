import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, PenTool, Image, Eye } from 'lucide-react';
import { TributeProduct } from '../../types';
import { TRIBUTE_PRODUCTS } from '../../data/tributes';

interface V2KeepsakesSectionProps {
  onSelectProduct: (product: TributeProduct) => void;
}

type KeepsakeSubCategory = 'all' | 'urns' | 'jewelry' | 'photo' | 'engraved';

export const V2KeepsakesSection: React.FC<V2KeepsakesSectionProps> = ({
  onSelectProduct,
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
    <section id="v2-keepsakes" className="py-10 sm:py-14 bg-[#F8F6F1] border-b border-[#E6E1D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-[#899588] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#899588]" />
              <span>Personalized Heirlooms</span>
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#343835] tracking-tight">
              Personalized Keepsakes
            </h2>
            <p className="text-xs sm:text-sm text-[#566156]">
              Urns, cremation jewelry, photo memory chests, and precision laser-engraved tributes.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#899588] font-medium bg-[#FFFFFF] px-3 py-1.5 rounded-[4px] border border-[#E6E1D7] shadow-xs">
            <PenTool className="w-3.5 h-3.5" />
            <span>Interactive Live Inscription & Photo Cameo Preview</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categoryTabs.map((tab) => {
            const isActive = activeCategory === tab.key;
            return (
              <button
                key={tab.key}
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

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-[#FFFFFF] border border-[#E6E1D7] rounded-[4px] p-5 shadow-memorial hover:shadow-memorial-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                {/* Product Image */}
                <div
                  onClick={() => onSelectProduct(product)}
                  className="relative aspect-[4/3] rounded-[2px] overflow-hidden bg-[#F5F3EE] border border-[#E6E1D7]/70 cursor-pointer"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <div className="absolute top-2 left-2 bg-[#FFFFFF]/95 backdrop-blur-xs text-[#343835] text-[10px] font-medium px-2 py-0.5 rounded-[2px] border border-[#E6E1D7] shadow-xs">
                      {product.badge}
                    </div>
                  )}

                  <div className="absolute bottom-2 right-2 flex items-center gap-1">
                    {product.allowsPhotoToken && (
                      <span className="bg-[#343835]/80 text-[#F8F6F1] text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded-[2px] backdrop-blur-xs flex items-center gap-1">
                        <Image className="w-2.5 h-2.5" />
                        <span>Photo</span>
                      </span>
                    )}
                    {product.allowsEngraving && (
                      <span className="bg-[#343835]/80 text-[#F8F6F1] text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded-[2px] backdrop-blur-xs">
                        Engravable
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#899588]">
                      {product.subtitle || product.categoryLabel.split('·')[0]}
                    </span>
                    {product.dimensions && (
                      <span className="text-[10px] text-[#747874]">{product.dimensions}</span>
                    )}
                  </div>

                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="font-serif text-lg font-normal text-[#343835] mt-1 group-hover:text-[#899588] transition cursor-pointer"
                  >
                    {product.title}
                  </h3>

                  <p className="text-xs text-[#566156] mt-1.5 line-clamp-2 leading-relaxed">
                    {product.craftNotes || product.description}
                  </p>
                </div>
              </div>

              {/* Price & Action */}
              <div className="mt-5 pt-3.5 border-t border-[#E6E1D7] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#747874] block">Price</span>
                  <span className="font-serif text-lg font-medium text-[#343835]">
                    ${product.price}
                  </span>
                </div>

                <button
                  onClick={() => onSelectProduct(product)}
                  className="px-4 py-2 bg-[#343835] hover:bg-[#899588] text-white text-xs font-medium rounded-[4px] transition cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <span>Personalize & Order</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
