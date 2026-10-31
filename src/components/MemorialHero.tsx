import React, { useState } from 'react';
import { Calendar, MapPin, ShieldCheck, Flower2, Heart, Sparkles, Camera } from 'lucide-react';
import { SERVICE_DETAILS } from '../data/tributes';

interface MemorialHeroProps {
  onOpenServiceInfo: () => void;
  onOpenSanctuary: () => void;
}


const GRANDMOTHER_PORTRAITS = [
  {
    id: 'formal',
    title: 'Memorial Portrait',
    caption: 'Official Remembrance Portrait · In Her Rose Garden',
    url: './assets/aistudio/Margaret_Williams_Memorial_Photo_35c13dec.png',
  },
  {
    id: 'garden',
    title: 'In Her Garden',
    caption: 'West Grove Botanical Sanctuary · Tending the Roses (2024)',
    url: './assets/aistudio/Margaret_Williams_In_her_Garden_e5c434b0.png',
  },
  {
    id: 'family',
    title: '80th Jubilee',
    caption: 'Margaret’s 80th Birthday Celebration & Family Jubilee (2022)',
    url: './assets/aistudio/Margaret_Williams_80th_Jubilee_5cb628a2.png',
  },
];


export const MemorialHero: React.FC<MemorialHeroProps> = ({
  onOpenServiceInfo,
  onOpenSanctuary,
}) => {
  const [selectedPortraitIdx, setSelectedPortraitIdx] = useState(0);
  const activePortrait = GRANDMOTHER_PORTRAITS[selectedPortraitIdx];

  return (
    <section className="relative overflow-hidden bg-[#F8F6F1] border-b border-[#E6E1D7] pt-8 pb-12 sm:pt-12 sm:pb-16 lg:py-20">
      {/* Subtle organic botanical watermark background accent */}
      <div className="absolute right-0 top-0 w-96 h-96 opacity-10 pointer-events-none transform translate-x-20 -translate-y-10">
        <svg viewBox="0 0 200 200" fill="#899588">
          <circle cx="100" cy="100" r="90" fill="none" stroke="#899588" strokeWidth="1" strokeDasharray="4 6" />
          <path d="M100 20 C100 70 150 100 180 100 C130 100 100 150 100 180 C100 130 50 100 20 100 C70 100 100 50 100 20 Z" fill="#899588" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Dedication & Editorial Text (7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Provenance stamp / Micro-badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] border border-[#E6E1D7] rounded-[4px] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#899588]" />
              <span className="text-[11px] uppercase tracking-[0.1em] font-semibold text-[#899588]">
                IN LOVING MEMORY · 1942 – 2026
              </span>
            </div>

            {/* Display typography */}
            <div className="space-y-2">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#343835] font-normal tracking-tight leading-[1.15]">
                Remembering Margaret Williams
              </h1>
              <p className="text-sm sm:text-base text-[#A58A6D] font-serif italic tracking-wide">
                August 14, 1942 — October 21, 2026 · West Grove, Illinois
              </p>
            </div>

            {/* Pull Quote */}
            <blockquote className="border-l-2 border-[#899588] pl-4 sm:pl-5 text-base sm:text-lg text-[#444844] italic font-serif leading-relaxed">
              “To live in hearts we leave behind is not to die. A life woven with quiet grace, enduring warmth, and boundless devotion.”
            </blockquote>

            <p className="text-sm sm:text-[15px] text-[#444844] leading-relaxed max-w-2xl font-normal">
              Welcome to the official memorial boutique and commemorative archive for the family and friends of Margaret Williams. Curated in heartfelt cooperation with Willow & Pine Funeral Home, this sanctuary offers floral tributes, commemorative stone vessels, and archival keepsakes that will be personally arranged at Margaret’s service or hand-delivered to the Williams residence.
            </p>

            {/* Service Quick-Coordination Card */}
            <div className="p-4 sm:p-5 bg-[#FFFFFF] border border-[#E6E1D7] rounded-[4px] shadow-memorial space-y-3">
              <div className="flex items-center justify-between border-b border-[#E6E1D7] pb-2.5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#343835]">
                  <Calendar className="w-3.5 h-3.5 text-[#899588]" />
                  <span>Celebration of Life Service</span>
                </div>
                <span className="text-[11px] text-[#899588] font-medium tracking-wide">
                  Saturday, Nov 7 · 11:00 AM
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#444844]">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#A58A6D] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#1B1C19] block">Chapel of the Pines</span>
                    <span>Willow & Pine Funeral Home, West Grove</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#899588] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#1B1C19] block">Direct Chapel Placement</span>
                    <span>All tributes placed with personalized sympathy card</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenServiceInfo}
                className="px-6 py-3.5 rounded-[4px] bg-[#343835] text-[#F8F6F1] hover:bg-[#4A504B] transition text-xs uppercase tracking-[0.08em] font-medium cursor-pointer shadow-xs flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#899588]" />
                <span>View Service Details</span>
              </button>

              <button
                onClick={onOpenSanctuary}
                className="px-5 py-3.5 rounded-[4px] border border-[#B7A99A] text-[#343835] hover:bg-[#F2EFEA] transition text-xs uppercase tracking-[0.08em] font-medium cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#A58A6D]" />
                <span>Light a Candle</span>
              </button>

              <button
                onClick={onOpenSanctuary}
                className="px-4 py-3.5 text-[#566156] hover:text-[#1F2320] text-xs font-medium tracking-wide underline underline-offset-4 decoration-[#899588] transition cursor-pointer"
              >
                Sign Remembrance Book
              </button>
            </div>
          </div>

          {/* Right Column: Arched Memorial Portrait (5 cols on desktop) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[310px] sm:max-w-[340px]">
              {/* Outer Parchment Frame */}
              <div className="bg-[#FFFFFF] p-3 sm:p-4 rounded-[8px] border border-[#E6E1D7] shadow-memorial relative">
                {/* The Classic Memorial Arch as specified in design doc */}
                <div className="relative overflow-hidden arch-frame border border-[#E6E1D7] bg-[#F5F3EE] aspect-[4/5]">
                  <img
                    src={activePortrait.url}
                    alt={`Portrait of Margaret Williams - ${activePortrait.title}`}
                    className="w-full h-full object-cover object-[center_20%] contrast-[102%] brightness-[100%] transition-all duration-700 hover:scale-[1.02]"
                  />
                  {/* Subtle warm ivory film grain overlay */}
                  <div className="absolute inset-0 bg-[#A58A6D]/5 mix-blend-overlay pointer-events-none" />
                </div>

                {/* Commemorative Portrait Plaque */}
                <div className="mt-4 text-center space-y-1.5 pb-1">
                  <div className="flex items-center justify-center gap-2 text-[#899588]">
                    <span className="h-[1px] w-8 bg-[#E6E1D7]" />
                    <span className="text-[11px] uppercase tracking-[0.16em] font-medium">Margaret Williams</span>
                    <span className="h-[1px] w-8 bg-[#E6E1D7]" />
                  </div>
                  <p className="font-serif text-lg text-[#343835] tracking-wide font-medium">
                    1942 – 2026
                  </p>
                  <p className="text-xs text-[#566156] max-w-xs mx-auto leading-relaxed">
                    Cherished mother, grandmother of seven, botanist, and steadfast friend.
                  </p>
                  <p className="text-[11px] text-[#A58A6D] italic">
                    {activePortrait.caption}
                  </p>
                </div>

                {/* Archival Portrait Switcher */}
                <div className="pt-2 border-t border-[#E6E1D7]/70 flex items-center justify-center gap-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#747874] mr-1 flex items-center gap-1">
                    <Camera className="w-3 h-3 text-[#899588]" />
                    <span>Photos:</span>
                  </span>
                  {GRANDMOTHER_PORTRAITS.map((portrait, idx) => (
                    <button
                      key={portrait.id}
                      onClick={() => setSelectedPortraitIdx(idx)}
                      className={`px-2 py-0.5 text-[10px] rounded-[3px] border transition cursor-pointer ${
                        selectedPortraitIdx === idx
                          ? 'bg-[#899588] text-white border-[#899588]'
                          : 'bg-[#F8F6F1] border-[#E6E1D7] text-[#444844] hover:bg-[#F0EEE9]'
                      }`}
                    >
                      {portrait.title}
                    </button>
                  ))}
                </div>

                {/* Subtle botanical corner accent */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#FFFFFF] border border-[#E6E1D7] flex items-center justify-center text-[#899588] shadow-xs">
                  <Heart className="w-3.5 h-3.5 fill-[#899588]/20" />
                </div>
              </div>

              {/* Dignified Funeral Home Attestation Badge */}
              <div className="mt-3 text-center">
                <span className="text-[11px] text-[#A58A6D] tracking-wide font-medium">
                  🌿 Curated in partnership with Willow & Pine Funeral Home
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

