import React, { useState } from 'react';
import { Users, Smile, Heart, Flower2, ArrowRight } from 'lucide-react';
import { TributeProduct, RelationshipCategory } from '../../types';
import { TRIBUTE_PRODUCTS } from '../../data/tributes';
import { V2ProductCard } from './V2ProductCard';

interface V2RelationshipSectionProps {
  onSelectProduct: (product: TributeProduct) => void;
}

interface RelationshipTab {
  key: RelationshipCategory;
  title: string;
  shortDesc: string;
  badge: string;
  icon: React.ReactNode;
}

export const V2RelationshipSection: React.FC<V2RelationshipSectionProps> = ({
  onSelectProduct,
}) => {
  const [activeTab, setActiveTab] = useState<RelationshipCategory>('children');

  const tabs: RelationshipTab[] = [
    {
      key: 'children',
      title: 'For Her Children',
      shortDesc: 'Touchstones, recipe boxes & fingerprint lockets',
      badge: 'Lineage Keepsakes',
      icon: <Users className="w-4 h-4" />,
    },
    {
      key: 'grandchildren',
      title: 'For Her Grandchildren',
      shortDesc: 'Pocket tokens, rose seed packets & miniature lockets',
      badge: 'Tender Memories',
      icon: <Smile className="w-4 h-4" />,
    },
    {
      key: 'spouse',
      title: 'For Her Spouse, Arthur',
      shortDesc: 'Companion urns, garden dedication plaques & rings',
      badge: '54 Years Together',
      icon: <Heart className="w-4 h-4" />,
    },
    {
      key: 'friends',
      title: 'For Friends & Family',
      shortDesc: 'Botanical candles, bud vases & memorial flora',
      badge: 'Cherished Circle',
      icon: <Flower2 className="w-4 h-4" />,
    },
  ];

  const filteredProducts = TRIBUTE_PRODUCTS.filter((product) =>
    product.relationships?.includes(activeTab)
  );

  return (
    <section id="v2-relationships" className="pt-6 sm:pt-8 pb-10 sm:pb-14 bg-[#F8F6F1] border-b border-[#E6E1D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-5">
        {/* Active Selection Indicator on the right */}
        <div className="flex justify-end items-center">
          <div className="text-xs text-[#747874]">
            Showing <strong className="text-[#343835] font-semibold">{filteredProducts.length}</strong> keepsakes for{' '}
            <span className="text-[#899588] font-medium">{tabs.find((t) => t.key === activeTab)?.title}</span>
          </div>
        </div>

        {/* 4 Relationship Category Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`text-left p-3.5 sm:p-4 rounded-[4px] border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#FFFFFF] border-[#899588] shadow-sm ring-1 ring-[#899588]'
                    : 'bg-[#F2EFEA]/70 border-[#E6E1D7] hover:bg-[#FFFFFF] hover:border-[#899588]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`w-7 h-7 rounded-[4px] flex items-center justify-center ${
                        isActive ? 'bg-[#899588] text-white' : 'bg-[#E6E1D7]/60 text-[#566156]'
                      }`}
                    >
                      {tab.icon}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-[#899588]">
                      {tab.badge}
                    </span>
                  </div>
                  <h3 className="font-serif text-sm sm:text-base font-medium text-[#343835]">
                    {tab.title}
                  </h3>
                  <p className="text-[11px] text-[#566156] mt-0.5 line-clamp-1">
                    {tab.shortDesc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#E6E1D7]/60 flex items-center justify-between text-[11px]">
                  <span className={isActive ? 'font-medium text-[#899588]' : 'text-[#747874]'}>
                    {isActive ? 'Viewing Selection' : 'Browse Items'}
                  </span>
                  <ArrowRight
                    className={`w-3 h-3 transition-transform ${
                      isActive ? 'text-[#899588] translate-x-0.5' : 'text-[#A0A49F]'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Product Grid for Active Relationship - Responsive 5-Column Clean Layout */}
        <div className="memorial-product-grid">
          {filteredProducts.map((product) => (
            <V2ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
