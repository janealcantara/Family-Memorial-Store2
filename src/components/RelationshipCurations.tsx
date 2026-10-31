import React, { useState } from 'react';
import { Users, Smile, Heart, Flower2, ArrowRight, X, Sparkles } from 'lucide-react';
import { TributeProduct, RelationshipCategory } from '../types';
import { TRIBUTE_PRODUCTS } from '../data/tributes';

interface RelationshipCurationsProps {
  onSelectProduct: (product: TributeProduct) => void;
}

interface RelationshipCardConfig {
  key: RelationshipCategory;
  categoryLabel: string;
  title: string;
  description: string;
  countLabel: string;
  icon: React.ReactNode;
}

export const RelationshipCurations: React.FC<RelationshipCurationsProps> = ({
  onSelectProduct,
}) => {
  const [activeRelationship, setActiveRelationship] = useState<RelationshipCategory | null>(null);

  const relationships: RelationshipCardConfig[] = [
    {
      key: 'children',
      categoryLabel: 'HEIRLOOM LINEAGE',
      title: 'For Her Children',
      description:
        'Tangible touchstones, fingerprint lockets, and custom engraved memory cases holding her signature recipes and handwritten notes.',
      countLabel: '4 Selected Keepsakes',
      icon: <Users className="w-5 h-5 text-[#899588]" />,
    },
    {
      key: 'grandchildren',
      categoryLabel: 'TENDER MEMORIES',
      title: 'For Her Grandchildren',
      description:
        'Glass pocket tokens, English rose seed planting sets, and heirloom miniature lockets to carry Grandma Margaret’s warmth into the future.',
      countLabel: '5 Selected Keepsakes',
      icon: <Smile className="w-5 h-5 text-[#899588]" />,
    },
    {
      key: 'spouse',
      categoryLabel: 'FIFTY-FOUR YEARS TOGETHER',
      title: 'For Her Spouse, Arthur',
      description:
        'Matching companion urns, solid bronze garden plaques, and dual-heart cremation jewelry created for Arthur’s quiet reflection.',
      countLabel: '3 Selected Keepsakes',
      icon: <Heart className="w-5 h-5 text-[#899588]" />,
    },
    {
      key: 'friends',
      categoryLabel: 'GARDEN CLUB & FRIENDS',
      title: 'For Friends & Loved Ones',
      description:
        'Memorial flora, botanical candles poured with wild rose essence, and memorial service tree dedications in Willowbrook Park.',
      countLabel: '6 Selected Keepsakes',
      icon: <Flower2 className="w-5 h-5 text-[#899588]" />,
    },
  ];

  const activeProducts = activeRelationship
    ? TRIBUTE_PRODUCTS.filter((p) => p.relationships?.includes(activeRelationship))
    : [];

  const currentConfig = relationships.find((r) => r.key === activeRelationship);

  return (
    <section className="py-12 sm:py-16 bg-[#F8F6F1] border-b border-[#E6E1D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Heading matching Screenshot 1 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#899588] block">
              TAILORED REMEMBRANCE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#343835] tracking-tight">
              Something Special for Everyone Who Loved Margaret
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#566156] max-w-md leading-relaxed">
            Thoughtfully chosen keepsakes inspired by the memories and special connections you shared with Margaret.
          </p>
        </div>

        {/* 4 Clickable Relationship Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {relationships.map((rel) => {
            const isSelected = activeRelationship === rel.key;
            return (
              <div
                key={rel.key}
                onClick={() => setActiveRelationship(isSelected ? null : rel.key)}
                className={`group bg-[#FFFFFF] border rounded-[4px] p-6 shadow-memorial hover:shadow-memorial-hover transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden ${
                  isSelected ? 'border-[#899588] ring-1 ring-[#899588]' : 'border-[#E6E1D7]'
                }`}
              >
                <div className="space-y-4">
                  {/* Icon Box */}
                  <div className="w-10 h-10 rounded-[4px] bg-[#F5F3EE] border border-[#E6E1D7] flex items-center justify-center group-hover:border-[#899588] transition">
                    {rel.icon}
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase tracking-[0.12em] font-semibold text-[#899588] block">
                      {rel.categoryLabel}
                    </span>
                    <h3 className="font-serif text-lg font-medium text-[#343835] group-hover:text-[#566156] transition">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-[#566156] leading-relaxed pt-1">
                      {rel.description}
                    </p>
                  </div>
                </div>

                {/* Footer Count & Click Action */}
                <div className="pt-6 mt-4 border-t border-[#E6E1D7] flex items-center justify-between text-xs font-medium">
                  <span className="text-[#747874] text-[11px]">{rel.countLabel}</span>
                  <span className="inline-flex items-center gap-1 text-[#899588] group-hover:text-[#343835] group-hover:translate-x-0.5 transition">
                    <span>{isSelected ? 'Viewing' : 'Explore'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Filtered Keepsake Drawer / Panel when a card is selected */}
        {activeRelationship && currentConfig && (
          <div className="bg-[#FFFFFF] border border-[#899588] rounded-[4px] p-6 sm:p-8 shadow-memorial space-y-6 animate-fade-in">
            <div className="flex items-start justify-between border-b border-[#E6E1D7] pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#899588]">
                  <Sparkles className="w-3.5 h-3.5 text-[#A58A6D]" />
                  <span>Curated Keepsakes · {currentConfig.title}</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#343835] font-normal mt-1">
                  Recommended for {currentConfig.title.replace('For ', '')}
                </h3>
                <p className="text-xs text-[#566156] mt-1 max-w-xl">
                  {currentConfig.description}
                </p>
              </div>

              <button
                onClick={() => setActiveRelationship(null)}
                className="text-xs text-[#747874] hover:text-[#1B1C19] flex items-center gap-1 border border-[#E6E1D7] px-2.5 py-1 rounded-[4px] cursor-pointer"
              >
                <span>Close</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Grid of filtered products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-[#FBF9F4] border border-[#E6E1D7] rounded-[4px] p-4 flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-3">
                    <div
                      onClick={() => onSelectProduct(prod)}
                      className="aspect-[4/3] rounded-[2px] overflow-hidden bg-[#EAE8E3] border border-[#E6E1D7] cursor-pointer"
                    >
                      <img
                        src={prod.imageUrl}
                        alt={prod.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      {prod.subtitle && (
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#899588] block">
                          {prod.subtitle}
                        </span>
                      )}
                      <h4
                        onClick={() => onSelectProduct(prod)}
                        className="font-serif text-base font-medium text-[#343835] cursor-pointer hover:text-[#566156] transition"
                      >
                        {prod.title}
                      </h4>
                      <p className="text-xs text-[#566156] line-clamp-2 mt-1">
                        {prod.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E6E1D7] flex items-center justify-between">
                    <span className="font-serif font-medium text-sm text-[#A58A6D]">
                      {prod.priceLabel || `$${prod.price}`}
                    </span>
                    <button
                      onClick={() => onSelectProduct(prod)}
                      className="px-3.5 py-1.5 rounded-[4px] bg-[#343835] text-[#F8F6F1] hover:bg-[#4A504B] text-xs font-medium cursor-pointer transition shadow-xs"
                    >
                      Personalize
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
