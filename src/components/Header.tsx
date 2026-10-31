import React from 'react';
import { ShoppingBag, Phone } from 'lucide-react';

interface HeaderProps {
  activeTab: 'home' | 'keepsakes' | 'service' | 'sanctuary';
  setActiveTab: (tab: 'home' | 'keepsakes' | 'service' | 'sanctuary') => void;
  cartCount: number;
  onOpenCart: () => void;
  onScrollToV2Section?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  onScrollToV2Section,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#F8F6F1]/95 backdrop-blur-md border-b border-[#E6E1D7] transition-all">
      {/* Top Coordination Strip */}
      <div className="bg-[#343835] text-[#F8F6F1] px-4 py-2 text-xs tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[11px] text-[#C4C7C3]">
            <span>Willow &amp; Pine Funeral Home</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-[#C4C7C3]">
            <a
              href="tel:5558492100"
              className="flex items-center gap-1.5 hover:text-white transition text-[#E0E3DF]"
            >
              <Phone className="w-3.5 h-3.5 text-[#A58A6D]" />
              <span className="hidden sm:inline text-[#C4C7C3]">Family Concierge:</span>
              <span className="font-medium text-white">(555) 849-2100</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Editorial Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex items-center justify-between">
        {/* Brand & Crest - clicking returns to homepage */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            title="Memorial Store - Return to Homepage"
            aria-label="Memorial Store - Return to Homepage"
            className="group flex items-center gap-3.5 text-left cursor-pointer"
          >
            {/* Hand-drawn style botanical crest */}
            <div className="w-10 h-10 rounded-[4px] border border-[#E6E1D7] bg-[#FFFFFF] flex items-center justify-center text-[#899588] group-hover:border-[#899588] transition shadow-xs">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-[#899588]"
              >
                <path d="M12 2L12 22" />
                <path d="M12 6C9 6 6 8 6 11C6 14 9 16 12 16" />
                <path d="M12 10C15 10 18 12 18 15C18 18 15 20 12 20" />
                <path d="M9 4C8 5.5 8 7 9 8" />
                <path d="M15 12C16 13.5 16 15 15 16" />
              </svg>
            </div>

            <div>
              <span className="block font-serif text-xl sm:text-2xl font-normal tracking-tight text-[#343835]">
                Memorial Store
              </span>
              <span className="block text-[11px] uppercase tracking-[0.12em] text-[#899588] font-medium">
                Margaret Williams Memorial Store
              </span>
            </div>
          </button>
        </div>

        {/* Navigation Tabs - Shopping Focused */}
        <nav className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => {
              if (activeTab !== 'home') {
                setActiveTab('home');
              }
              onScrollToV2Section?.('v2-relationships');
            }}
            className="px-4 py-1.5 text-xs uppercase tracking-[0.08em] font-medium rounded-[4px] text-[#343835] hover:bg-[#F0EEE9] hover:text-[#1F2320] transition cursor-pointer"
          >
            By Relationship
          </button>
          <button
            onClick={() => {
              setActiveTab('keepsakes');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-4 py-1.5 text-xs uppercase tracking-[0.08em] font-medium rounded-[4px] transition cursor-pointer ${
              activeTab === 'keepsakes'
                ? 'bg-[#EAE6DE] text-[#1B1C19] font-semibold'
                : 'text-[#343835] hover:bg-[#F0EEE9] hover:text-[#1F2320]'
            }`}
          >
            Keepsakes &amp; Urns
          </button>
        </nav>

        {/* Actions - Memorial Basket */}
        <div className="flex items-center">
          <button
            onClick={onOpenCart}
            aria-label="View Memorial Basket"
            className="relative flex items-center gap-2.5 px-4 py-2 rounded-[4px] bg-[#343835] text-[#F8F6F1] hover:bg-[#4A504B] transition text-xs font-medium cursor-pointer shadow-xs"
          >
            <ShoppingBag className="w-4 h-4 text-[#E0E3DF]" />
            <span className="font-medium">Memorial Basket</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#899588] text-white text-[11px] font-semibold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Row */}
      <div className="lg:hidden flex items-center justify-around border-t border-[#E6E1D7] bg-[#F5F3EE] px-3 py-2 text-[11px] sm:text-xs uppercase tracking-wider font-medium text-[#343835]">
        <button
          onClick={() => {
            if (activeTab !== 'home') {
              setActiveTab('home');
            }
            onScrollToV2Section?.('v2-relationships');
          }}
          className="px-3 py-1.5 text-center rounded-[3px] text-[#444844] hover:text-[#1B1C19] transition cursor-pointer"
        >
          By Relationship
        </button>
        <button
          onClick={() => {
            setActiveTab('keepsakes');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`px-3 py-1.5 text-center rounded-[3px] transition cursor-pointer ${
            activeTab === 'keepsakes'
              ? 'text-[#1B1C19] font-bold bg-[#EAE6DE]'
              : 'text-[#444844] hover:text-[#1B1C19]'
          }`}
        >
          Keepsakes &amp; Urns
        </button>
        <button
          onClick={onOpenCart}
          className="px-3 py-1.5 text-center rounded-[3px] text-[#899588] font-bold hover:text-[#566156] transition cursor-pointer"
        >
          Basket {cartCount > 0 ? `(${cartCount})` : ''}
        </button>
      </div>
    </header>
  );
};


