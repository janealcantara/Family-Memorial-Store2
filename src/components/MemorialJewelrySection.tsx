import React from 'react';
import { Eye, Sparkles } from 'lucide-react';
import { TributeProduct } from '../types';
import { TRIBUTE_PRODUCTS } from '../data/tributes';

interface MemorialJewelrySectionProps {
  onSelectProduct: (product: TributeProduct) => void;
}

export const MemorialJewelrySection: React.FC<MemorialJewelrySectionProps> = ({
  onSelectProduct,
}) => {
  const jewelryProducts = [
    TRIBUTE_PRODUCTS.find((p) => p.id === 'rose-petal-pendant'),
    TRIBUTE_PRODUCTS.find((p) => p.id === 'botanical-monogram-signet'),
    TRIBUTE_PRODUCTS.find((p) => p.id === 'walnut-titanium-capsule'),
  ].filter(Boolean) as TributeProduct[];

  return (
    <section className="py-12 sm:py-16 bg-[#F8F6F1] border-b border-[#E6E1D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header row matching Screenshot 4 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#899588] block">
              💎 TRIBUTE THEME III
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#343835] tracking-tight">
              Little Ways to Keep Margaret Close
            </h2>
            <p className="text-xs sm:text-sm text-[#566156] leading-relaxed max-w-xl">
              Personal keepsakes you can carry, wear, or treasure as a reminder of the moments you shared.
            </p>
          </div>

          <div className="shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#FFFFFF] border border-[#E6E1D7] text-[#343835] text-xs font-medium shadow-xs">
              <Eye className="w-3.5 h-3.5 text-[#899588]" />
              <span>Complimentary Digital Inscription Preview Available</span>
            </span>
          </div>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jewelryProducts.map((prod) => (
            <div
              key={prod.id}
              className="group bg-[#FFFFFF] border border-[#E6E1D7] rounded-[4px] p-5 shadow-memorial hover:shadow-memorial-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                {/* Product Photo with Badge */}
                <div
                  onClick={() => onSelectProduct(prod)}
                  className="relative aspect-[4/3] rounded-[2px] overflow-hidden bg-[#F5F3EE] border border-[#E6E1D7] cursor-pointer"
                >
                  <img
                    src={prod.imageUrl}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {prod.badge && (
                    <div className="absolute top-2.5 right-2.5 bg-[#FFFFFF]/90 backdrop-blur-xs text-[#343835] px-2 py-0.5 rounded-[2px] text-[10px] font-semibold border border-[#E6E1D7] shadow-xs">
                      {prod.badge}
                    </div>
                  )}
                </div>

                {/* Subtitle & Title */}
                <div className="space-y-1">
                  {prod.subtitle && (
                    <span className="text-[10px] uppercase tracking-[0.1em] font-semibold text-[#899588] block">
                      {prod.subtitle}
                    </span>
                  )}
                  <h3
                    onClick={() => onSelectProduct(prod)}
                    className="font-serif text-lg font-medium text-[#343835] group-hover:text-[#566156] transition cursor-pointer leading-snug"
                  >
                    {prod.title}
                  </h3>
                  <p className="text-xs text-[#566156] leading-relaxed pt-0.5">
                    {prod.description}
                  </p>
                </div>

                {/* Specific Micro-Note */}
                {prod.note && (
                  <div className="text-[11px] text-[#A58A6D] font-medium pt-1 flex items-center gap-1.5">
                    <span>{prod.note}</span>
                  </div>
                )}
              </div>

              {/* Price & Action */}
              <div className="pt-4 mt-4 border-t border-[#E6E1D7] flex items-center justify-between">
                <div>
                  <span className="font-serif font-medium text-base text-[#343835]">
                    {prod.priceLabel || `$${prod.price}`}
                  </span>
                </div>
                <button
                  onClick={() => onSelectProduct(prod)}
                  className="px-4 py-1.5 rounded-[4px] border border-[#B7A99A] text-[#343835] hover:bg-[#343835] hover:text-[#F8F6F1] text-xs font-medium transition cursor-pointer"
                >
                  Personalize
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
