import React from 'react';
import { Info, Sparkles } from 'lucide-react';
import { TributeProduct } from '../types';
import { TRIBUTE_PRODUCTS } from '../data/tributes';

interface GardenInspiredSectionProps {
  onSelectProduct: (product: TributeProduct) => void;
}

export const GardenInspiredSection: React.FC<GardenInspiredSectionProps> = ({
  onSelectProduct,
}) => {
  const gardenProducts = [
    TRIBUTE_PRODUCTS.find((p) => p.id === 'botanical-stepping-stone'),
    TRIBUTE_PRODUCTS.find((p) => p.id === 'rose-bud-vase'),
    TRIBUTE_PRODUCTS.find((p) => p.id === 'english-rose-seed-packets'),
    TRIBUTE_PRODUCTS.find((p) => p.id === 'cast-bronze-garden-plaque'),
  ].filter(Boolean) as TributeProduct[];

  return (
    <section className="py-12 sm:py-16 bg-[#F8F6F1] border-b border-[#E6E1D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header row matching Screenshot 2 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#899588] block">
              🌿 TRIBUTE THEME I
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#343835] tracking-tight">
              Inspired by Her Love of Gardening & Roses
            </h2>
            <p className="text-xs sm:text-sm text-[#566156] leading-relaxed max-w-xl">
              Margaret found happiness among the flowers. These keepsakes celebrate the gardens she tended and the beauty she shared with everyone around her.
            </p>
          </div>

          <div className="shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#D7E3D4]/50 border border-[#899588]/40 text-[#2F402E] text-xs font-medium">
              <span>🌿 Curated with Willowbrook Horticultural Society</span>
            </span>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gardenProducts.map((prod) => (
            <div
              key={prod.id}
              className="group bg-[#FFFFFF] border border-[#E6E1D7] rounded-[4px] p-4 shadow-memorial hover:shadow-memorial-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Product Image with Top Badge */}
                <div
                  onClick={() => onSelectProduct(prod)}
                  className="relative aspect-[4/3] rounded-[2px] overflow-hidden bg-[#F5F3EE] border border-[#E6E1D7]/70 cursor-pointer"
                >
                  <img
                    src={prod.imageUrl}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {prod.badge && (
                    <div className="absolute top-2 left-2 bg-[#FFFFFF]/90 backdrop-blur-xs text-[#343835] px-2 py-0.5 rounded-[2px] text-[10px] font-semibold border border-[#E6E1D7] shadow-xs">
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
                    className="font-serif text-base sm:text-[17px] font-medium text-[#343835] group-hover:text-[#566156] transition cursor-pointer leading-snug"
                  >
                    {prod.title}
                  </h3>
                  <p className="text-xs text-[#566156] line-clamp-2 leading-relaxed pt-0.5">
                    {prod.description}
                  </p>
                </div>

                {/* Why Selected Box */}
                {prod.whySelected && (
                  <div className="p-2.5 bg-[#F5F3EE]/80 rounded-[4px] border border-[#E6E1D7]/70 text-[11px] text-[#444844] flex items-start gap-1.5 leading-snug">
                    <Info className="w-3.5 h-3.5 text-[#899588] shrink-0 mt-0.5" />
                    <span>
                      <strong className="font-semibold text-[#1B1C19]">Why selected:</strong>{' '}
                      {prod.whySelected.replace('Why selected: ', '')}
                    </span>
                  </div>
                )}
              </div>

              {/* Price & Action */}
              <div className="pt-4 mt-3 border-t border-[#E6E1D7] flex items-center justify-between">
                <div>
                  <span className="font-serif font-medium text-base text-[#A58A6D]">
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
