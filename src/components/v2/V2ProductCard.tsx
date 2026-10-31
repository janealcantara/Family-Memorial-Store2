import React from 'react';
import { TributeProduct } from '../../types';

interface V2ProductCardProps {
  product: TributeProduct;
  onSelectProduct: (product: TributeProduct) => void;
}

export const V2ProductCard: React.FC<V2ProductCardProps> = ({
  product,
  onSelectProduct,
}) => {
  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group flex flex-col justify-between cursor-pointer transition-transform"
    >
      <div>
        {/* 1. Large centered product image on soft neutral warm beige background */}
        <div className="aspect-[4/5] w-full rounded-[4px] overflow-hidden bg-[#EAE6DE] flex items-center justify-center mb-2.5 sm:mb-3 relative">
          <img
            src={product.imageUrl}
            alt={product.title}
            loading="lazy"
            className={`w-full h-full transition-transform duration-500 group-hover:scale-[1.03] ${
              product.imageUrl.includes('.png') || product.id === 'heritage-rose-urn'
                ? 'object-contain p-2.5'
                : 'object-cover'
            }`}
          />
        </div>

        {/* 2. Product Name directly underneath image */}
        <h4 className="font-serif text-[14px] sm:text-[15px] font-normal text-[#1B1C19] group-hover:text-[#899588] transition-colors line-clamp-2 min-h-[2.5rem] leading-snug">
          {product.title}
        </h4>

        {/* 3. Price simply displayed underneath name */}
        <div className="text-xs sm:text-sm text-[#5D655E] mt-1 tabular-nums font-normal">
          ${product.price}
        </div>
      </div>

      {/* 4. Minimal Understated 'Personalize →' Button */}
      <div className="mt-2.5 pt-0.5">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelectProduct(product);
          }}
          className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-[#2F3330] hover:text-[#1B1C19] py-1 px-2.5 rounded-[3px] border border-[#D8D3C7] bg-[#FAF8F5] hover:bg-[#EAE6DE] transition-all cursor-pointer"
        >
          <span>Personalize</span>
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </button>
      </div>
    </div>
  );
};
