import React from 'react';
import { Flower2, ArrowRight, Sparkles, Sprout } from 'lucide-react';
import { TributeProduct } from '../../types';
import { TRIBUTE_PRODUCTS } from '../../data/tributes';

interface V2GardenSectionProps {
  onSelectProduct: (product: TributeProduct) => void;
}

export const V2GardenSection: React.FC<V2GardenSectionProps> = ({
  onSelectProduct,
}) => {
  const gardenProducts = [
    TRIBUTE_PRODUCTS.find((p) => p.id === 'botanical-stepping-stone'),
    TRIBUTE_PRODUCTS.find((p) => p.id === 'rose-bud-vase'),
    TRIBUTE_PRODUCTS.find((p) => p.id === 'english-rose-seed-packets'),
    TRIBUTE_PRODUCTS.find((p) => p.id === 'cast-bronze-garden-plaque'),
  ].filter(Boolean) as TributeProduct[];

  return (
    <section id="v2-gardening" className="py-10 sm:py-14 bg-[#FFFFFF] border-b border-[#E6E1D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-[#899588] flex items-center gap-1.5">
              <Sprout className="w-3.5 h-3.5 text-[#899588]" />
              <span>Inspired by Margaret's Interests</span>
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#343835] tracking-tight">
              Gardening, Roses & Nature
            </h2>
            <p className="text-xs sm:text-sm text-[#566156]">
              Handcrafted outdoor monuments, living plantable seeds, and botanical glass honoring Margaret’s lifelong love of gardens.
            </p>
          </div>

          <div className="shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#D7E3D4]/50 border border-[#899588]/40 text-[#2F402E] text-xs font-medium">
              <span>🌿 Willowbrook Horticultural Selection</span>
            </span>
          </div>
        </div>

        {/* 4 Clean E-Commerce Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {gardenProducts.map((prod) => (
            <div
              key={prod.id}
              className="group bg-[#FBF9F5] border border-[#E6E1D7] rounded-[4px] p-4 shadow-xs hover:shadow-memorial transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Product Image */}
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
                    <div className="absolute top-2 left-2 bg-[#FFFFFF]/95 backdrop-blur-xs text-[#343835] text-[10px] font-medium px-2 py-0.5 rounded-[2px] border border-[#E6E1D7] shadow-xs">
                      {prod.badge}
                    </div>
                  )}
                  {prod.allowsEngraving && (
                    <div className="absolute bottom-2 right-2 bg-[#343835]/80 text-[#F8F6F1] text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded-[2px] backdrop-blur-xs">
                      Engravable
                    </div>
                  )}
                </div>

                {/* Details */}
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#899588] block">
                    {prod.subtitle || prod.categoryLabel.split('·')[0]}
                  </span>
                  <h4
                    onClick={() => onSelectProduct(prod)}
                    className="font-serif text-base font-normal text-[#343835] mt-1 group-hover:text-[#899588] transition cursor-pointer line-clamp-1"
                  >
                    {prod.title}
                  </h4>
                  <p className="text-xs text-[#566156] mt-1 line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>
                </div>
              </div>

              {/* Price & Action Button */}
              <div className="mt-4 pt-3 border-t border-[#E6E1D7] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#747874] block">Price</span>
                  <span className="font-serif text-base font-medium text-[#343835]">
                    ${prod.price}
                  </span>
                </div>

                <button
                  onClick={() => onSelectProduct(prod)}
                  className="px-3.5 py-1.5 bg-[#FFFFFF] hover:bg-[#899588] hover:text-white text-[#343835] text-xs font-medium rounded-[4px] border border-[#E6E1D7] transition cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <span>Customize</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
