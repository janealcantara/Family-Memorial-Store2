import React, { useState } from 'react';
import { Users, Smile, Heart, Flower2, ArrowRight } from 'lucide-react';
import { TributeProduct, RelationshipCategory } from '../../types';
import { TRIBUTE_PRODUCTS } from '../../data/tributes';

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

        {/* Product Cards for Active Relationship */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-[#FFFFFF] border border-[#E6E1D7] rounded-[4px] p-4 shadow-memorial hover:shadow-memorial-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
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
                  {product.allowsEngraving && (
                    <div className="absolute bottom-2 right-2 bg-[#343835]/80 text-[#F8F6F1] text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded-[2px] backdrop-blur-xs">
                      Engravable
                    </div>
                  )}
                </div>

                {/* Details */}
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#899588] block">
                    {product.subtitle || product.categoryLabel.split('·')[0]}
                  </span>
                  <h4
                    onClick={() => onSelectProduct(product)}
                    className="font-serif text-base font-normal text-[#343835] mt-1 group-hover:text-[#899588] transition cursor-pointer line-clamp-1"
                  >
                    {product.title}
                  </h4>
                  <p className="text-xs text-[#566156] mt-1 line-clamp-2 leading-relaxed">
                    {product.craftNotes || product.description}
                  </p>
                </div>
              </div>

              {/* Price & Action Button */}
              <div className="mt-4 pt-3 border-t border-[#E6E1D7] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#747874] block">Price</span>
                  <span className="font-serif text-base font-medium text-[#343835]">
                    ${product.price}
                  </span>
                </div>

                <button
                  onClick={() => onSelectProduct(product)}
                  className="px-3.5 py-1.5 bg-[#F5F3EE] hover:bg-[#899588] hover:text-white text-[#343835] text-xs font-medium rounded-[4px] border border-[#E6E1D7] transition cursor-pointer flex items-center gap-1.5"
                >
                  <span>Personalize</span>
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
