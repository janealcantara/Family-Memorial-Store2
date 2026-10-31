import React from 'react';
import { Check, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { TributeProduct } from '../types';
import { TRIBUTE_PRODUCTS } from '../data/tributes';

interface SelectedForFamilySectionProps {
  onSelectProduct: (product: TributeProduct) => void;
}

export const SelectedForFamilySection: React.FC<SelectedForFamilySectionProps> = ({
  onSelectProduct,
}) => {
  const urnProduct = TRIBUTE_PRODUCTS.find((p) => p.id === 'heritage-walnut-urn');
  const fingerprintProduct = TRIBUTE_PRODUCTS.find((p) => p.id === 'tactile-fingerprint-teardrop');
  const chestProduct = TRIBUTE_PRODUCTS.find((p) => p.id === 'forest-moss-velvet-chest');

  return (
    <section className="py-12 sm:py-16 bg-[#F8F6F1] border-b border-[#E6E1D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header row matching Screenshot 3 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#899588] block">
              🌿 TRIBUTE THEME II
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#343835] tracking-tight">
              Chosen with Your Family in Mind
            </h2>
            <p className="text-xs sm:text-sm text-[#566156] leading-relaxed max-w-xl">
              Personal keepsakes inspired by Margaret’s life, her memories, and the people she loved.
            </p>
          </div>

          <div className="shrink-0 text-xs text-[#899588] font-medium flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#899588]" />
            <span>Willow & Pine Certified Filling Service Included</span>
          </div>
        </div>

        {/* Asymmetrical Layout: 1 Large Left Card + 2 Stacked Right Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Left Featured Urn (7 cols) */}
          {urnProduct && (
            <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E6E1D7] rounded-[4px] p-6 shadow-memorial hover:shadow-memorial-hover transition-all duration-300 flex flex-col md:flex-row gap-6">
              {/* Product Photo with Badges */}
              <div className="md:w-1/2 relative bg-[#F5F3EE] rounded-[4px] overflow-hidden border border-[#E6E1D7] aspect-[4/5] md:aspect-auto">
                <div className="absolute top-2 left-2 z-10 text-[9px] uppercase tracking-wider text-[#747874] bg-[#FFFFFF]/90 px-2 py-0.5 rounded-[2px] border border-[#E6E1D7]">
                  Margaret Williams Memorial Store
                </div>
                <img
                  src={urnProduct.imageUrl}
                  alt={urnProduct.title}
                  className={`w-full h-full ${urnProduct.imageUrl.includes('.png') ? 'object-contain p-2' : 'object-cover'}`}
                />
                <div className="absolute bottom-2 left-2 z-10 bg-[#343835] text-[#F8F6F1] px-2.5 py-1 rounded-[2px] text-[10px] uppercase tracking-wider font-semibold shadow-xs">
                  Primary Service Vessel
                </div>
              </div>

              {/* Urn Content & Actions */}
              <div className="md:w-1/2 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <span className="text-[10px] uppercase tracking-[0.12em] font-semibold text-[#899588] block">
                    {urnProduct.subtitle}
                  </span>
                  <h3
                    onClick={() => onSelectProduct(urnProduct)}
                    className="font-serif text-xl sm:text-2xl font-medium text-[#343835] cursor-pointer hover:text-[#566156] transition leading-snug"
                  >
                    {urnProduct.title}
                  </h3>
                  <p className="text-xs text-[#566156] leading-relaxed">
                    {urnProduct.craftNotes}
                  </p>

                  {/* Bullet Checklist */}
                  {urnProduct.bulletPoints && (
                    <div className="pt-2 space-y-1.5 text-xs text-[#444844]">
                      {urnProduct.bulletPoints.map((pt, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#899588] shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price & CTA Button */}
                <div className="pt-4 border-t border-[#E6E1D7] space-y-3">
                  <div>
                    <span className="text-[11px] text-[#747874] block uppercase tracking-wider">
                      Standard Lineage Price
                    </span>
                    <span className="font-serif text-2xl font-medium text-[#343835]">
                      ${urnProduct.price}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectProduct(urnProduct)}
                    className="w-full py-3 px-4 rounded-[4px] bg-[#343835] text-[#F8F6F1] hover:bg-[#4A504B] transition text-xs uppercase tracking-wider font-medium cursor-pointer shadow-xs flex items-center justify-center gap-2"
                  >
                    <span>Personalize Vessel</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E0E3DF]" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Right Column: 2 Stacked Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            {/* Top Right: Fingerprint Teardrop */}
            {fingerprintProduct && (
              <div
                onClick={() => onSelectProduct(fingerprintProduct)}
                className="group bg-[#FFFFFF] border border-[#E6E1D7] rounded-[4px] p-5 shadow-memorial hover:shadow-memorial-hover transition-all duration-300 flex items-center gap-4 cursor-pointer"
              >
                <div className="w-24 h-24 rounded-[4px] overflow-hidden bg-[#F5F3EE] border border-[#E6E1D7] shrink-0">
                  <img
                    src={fingerprintProduct.imageUrl}
                    alt={fingerprintProduct.title}
                    className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                      fingerprintProduct.imageUrl.includes('.png') ? 'object-contain p-1.5' : 'object-cover'
                    }`}
                  />
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#899588]">
                      {fingerprintProduct.badge}
                    </span>
                    <span className="font-serif text-base font-medium text-[#343835]">
                      ${fingerprintProduct.price}
                    </span>
                  </div>

                  <h4 className="font-serif text-base font-medium text-[#343835] group-hover:text-[#566156] transition leading-snug">
                    {fingerprintProduct.title}
                  </h4>
                  <p className="text-xs text-[#566156] line-clamp-2">
                    {fingerprintProduct.craftNotes}
                  </p>

                  <span className="text-xs font-semibold text-[#899588] group-hover:text-[#343835] inline-flex items-center gap-1 pt-1">
                    <span>Configure Metal & Chain</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            )}

            {/* Bottom Right: Memory Chest */}
            {chestProduct && (
              <div
                onClick={() => onSelectProduct(chestProduct)}
                className="group bg-[#FFFFFF] border border-[#E6E1D7] rounded-[4px] p-5 shadow-memorial hover:shadow-memorial-hover transition-all duration-300 flex items-center gap-4 cursor-pointer"
              >
                <div className="w-24 h-24 rounded-[4px] overflow-hidden bg-[#F5F3EE] border border-[#E6E1D7] shrink-0">
                  <img
                    src={chestProduct.imageUrl}
                    alt={chestProduct.title}
                    className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                      chestProduct.imageUrl.includes('.png') ? 'object-contain p-1.5' : 'object-cover'
                    }`}
                  />
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#899588]">
                      {chestProduct.badge}
                    </span>
                    <span className="font-serif text-base font-medium text-[#343835]">
                      ${chestProduct.price}
                    </span>
                  </div>

                  <h4 className="font-serif text-base font-medium text-[#343835] group-hover:text-[#566156] transition leading-snug">
                    {chestProduct.title}
                  </h4>
                  <p className="text-xs text-[#566156] line-clamp-2">
                    {chestProduct.craftNotes}
                  </p>

                  <span className="text-xs font-semibold text-[#899588] group-hover:text-[#343835] inline-flex items-center gap-1 pt-1">
                    <span>View Compartments</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
