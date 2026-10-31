import React from 'react';
import { Phone, MapPin, Heart, ShieldCheck, Mail } from 'lucide-react';
import { SERVICE_DETAILS } from '../data/tributes';

interface FooterProps {
  onOpenServiceInfo: () => void;
  onNavigateTab: (tab: 'home' | 'keepsakes' | 'service' | 'sanctuary') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenServiceInfo, onNavigateTab }) => {
  return (
    <footer className="bg-[#F0EEE9] border-t border-[#E6E1D7] text-[#444844] pt-12 pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Dedication */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-[4px] border border-[#E6E1D7] bg-[#FFFFFF] flex items-center justify-center text-[#899588]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-4 h-4 text-[#899588]"
                >
                  <path d="M12 2L12 22" />
                  <path d="M12 6C9 6 6 8 6 11C6 14 9 16 12 16" />
                  <path d="M12 10C15 10 18 12 18 15C18 18 15 20 12 20" />
                </svg>
              </div>
              <span className="font-serif text-lg font-normal text-[#343835]">
                Memorial Store
              </span>
            </div>
            <p className="text-xs text-[#566156] leading-relaxed">
              Dedicated to the loving memory of Margaret Williams (1942–2026). Curated in formal collaboration with Willow & Pine Funeral Home.
            </p>
            <div className="text-[11px] text-[#A58A6D] font-medium pt-1">
              🌿 Curated in partnership with Willow & Pine Funeral Home
            </div>
          </div>

          {/* Service Logistics */}
          <div className="space-y-2 text-xs">
            <h4 className="font-serif text-sm font-medium text-[#343835] uppercase tracking-wider">
              Memorial Service
            </h4>
            <p className="text-[#1B1C19] font-medium">Saturday, November 7, 2026</p>
            <p className="text-[#566156]">Chapel of the Pines · 11:00 AM CST</p>
            <p className="text-[#747874] text-[11px] pt-1">
              Placement deadline for florals: 9:30 AM CST
            </p>
            <button
              onClick={onOpenServiceInfo}
              className="text-[#899588] hover:text-[#343835] underline underline-offset-2 transition pt-1 cursor-pointer"
            >
              View Full Ceremony Schedule →
            </button>
          </div>

          {/* Quick Memorial Links */}
          <div className="space-y-2 text-xs">
            <h4 className="font-serif text-sm font-medium text-[#343835] uppercase tracking-wider">
              Sanctuary Sections
            </h4>
            <ul className="space-y-1.5 text-[#566156]">
              <li>
                <button
                  onClick={() => onNavigateTab('home')}
                  className="hover:text-[#1B1C19] transition cursor-pointer"
                >
                  Memorial Dedication & Keepsakes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('service')}
                  className="hover:text-[#1B1C19] transition cursor-pointer"
                >
                  Ceremony Schedule & Directions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('sanctuary')}
                  className="hover:text-[#1B1C19] transition cursor-pointer"
                >
                  Candle Sanctuary & Guestbook
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenServiceInfo}
                  className="hover:text-[#1B1C19] transition cursor-pointer"
                >
                  Download Memorial Service Program
                </button>
              </li>
            </ul>
          </div>

          {/* Chapel Concierge & Assistance */}
          <div className="space-y-2 text-xs">
            <h4 className="font-serif text-sm font-medium text-[#343835] uppercase tracking-wider">
              Chapel Concierge
            </h4>
            <div className="flex items-center gap-2 text-[#444844]">
              <Phone className="w-3.5 h-3.5 text-[#899588] shrink-0" />
              <a href="tel:5558492100" className="hover:text-[#1B1C19] transition">
                (555) 849-2100 (24-Hour)
              </a>
            </div>
            <div className="flex items-start gap-2 text-[#444844]">
              <MapPin className="w-3.5 h-3.5 text-[#899588] shrink-0 mt-0.5" />
              <span>4200 Pine Hollow Road, West Grove, IL 60090</span>
            </div>
            <div className="flex items-center gap-2 text-[#444844]">
              <Mail className="w-3.5 h-3.5 text-[#899588] shrink-0" />
              <span>tributes@willowandpinefunerals.com</span>
            </div>
          </div>
        </div>

        {/* Bottom Hairline & Dignified Copyright */}
        <div className="pt-8 border-t border-[#E6E1D7] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#747874]">
          <div className="flex items-center gap-2">
            <span>© 2026 Willow & Pine Funeral Home & The Williams Family.</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-[#899588]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#899588]" />
              <span>Dignified Escort Guaranteed</span>
            </span>
            <span>·</span>
            <span className="italic font-serif">In loving memory of Margaret Williams</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
