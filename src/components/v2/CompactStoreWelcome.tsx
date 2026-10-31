import React from 'react';
import { Heart, Share2 } from 'lucide-react';

interface CompactStoreWelcomeProps {
  onScrollToSection?: (sectionId: string) => void;
  onOpenShareModal: () => void;
}

export const CompactStoreWelcome: React.FC<CompactStoreWelcomeProps> = ({
  onOpenShareModal,
}) => {
  return (
    <section className="bg-[#FFFFFF] border-b border-[#E6E1D7] py-6 sm:py-8 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
          {/* Small Memorial Portrait (72px / 84px) */}
          <div className="relative shrink-0">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#899588] p-0.5 bg-[#F8F6F1] shadow-xs">
              <img
                src="/assets/aistudio/Margaret_Williams_Memorial_Photo_35c13dec.png"
                alt="Margaret Williams"
                className="w-full h-full object-cover rounded-full object-[center_20%]"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#899588] text-white flex items-center justify-center shadow-xs">
              <Heart className="w-2.5 h-2.5 fill-white" />
            </div>
          </div>

          {/* Personalized Welcome Text */}
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-[#899588] bg-[#F5F3EE] px-2 py-0.5 rounded-[2px] border border-[#E6E1D7]">
                Dedicated Memorial Store
              </span>
              <span className="text-[11px] text-[#A58A6D] hidden sm:inline">
                1942 – 2026
              </span>
            </div>
            <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl font-medium text-[#343835] tracking-tight">
              Margaret Williams Memorial Collection
            </h1>
            <p className="text-xs sm:text-sm text-[#566156] max-w-2xl leading-relaxed">
              Welcome to Margaret’s dedicated memorial store. Each keepsake, resting vessel, and heirloom below has been selected for her family and friends to cherish her memory.
            </p>

            {/* Share Memorial Store with Family Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenShareModal}
                aria-label="Share Memorial Store with Family"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[4px] border border-[#899588]/40 bg-[#FAF9F5] hover:bg-[#899588] text-[#343835] hover:text-white transition-all text-xs font-medium cursor-pointer shadow-2xs group"
              >
                <Share2 className="w-3.5 h-3.5 text-[#899588] group-hover:text-white transition-colors" />
                <span>Share Memorial Store with Family</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
