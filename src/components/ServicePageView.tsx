import React from 'react';
import { Calendar, MapPin, Phone, ShieldCheck, Download, Flower2, Heart, Clock, User } from 'lucide-react';
import { SERVICE_DETAILS } from '../data/tributes';

interface ServicePageViewProps {
  onOrderFlowers: () => void;
  onOpenSanctuary: () => void;
}

export const ServicePageView: React.FC<ServicePageViewProps> = ({
  onOrderFlowers,
  onOpenSanctuary,
}) => {
  return (
    <div className="py-12 sm:py-16 bg-[#F8F6F1]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Memorial Dedication Banner */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-semibold text-[#899588]">
            <span>Memorial Sanctuary & Schedule</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#343835]">
            Margaret Williams
          </h1>
          <p className="font-serif italic text-base sm:text-lg text-[#A58A6D]">
            August 14, 1942 – October 21, 2026
          </p>
          <div className="w-16 h-[1px] bg-[#899588] mx-auto mt-2" />
        </div>

        {/* Life Tribute & Biography Card */}
        <div className="bg-[#FFFFFF] border border-[#E6E1D7] rounded-[4px] p-6 sm:p-10 shadow-memorial space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5">
              <div className="arch-frame overflow-hidden aspect-[4/5] border border-[#E6E1D7] bg-[#F5F3EE] shadow-sm">
                <img
                  src="./assets/aistudio/Margaret_Williams_In_her_Garden_e5c434b0.png"
                  alt="Margaret Williams in her rose garden (1942–2026)"
                  className="w-full h-full object-cover object-[center_20%] contrast-[102%]"
                />
              </div>
              <p className="text-center text-[11px] text-[#747874] mt-2 italic">
                Margaret tending the blooms at the West Grove Rose Garden, autumn 2024
              </p>
            </div>

            <div className="md:col-span-7 space-y-4">
              <h2 className="font-serif text-2xl text-[#343835] font-normal">
                A Life of Quiet Beauty & Endless Devotion
              </h2>
              <p className="text-xs sm:text-sm text-[#444844] leading-relaxed">
                Margaret was born in Oak Park, Illinois, and lived a life defined by gentle curiosity, deep faith, and an abiding passion for horticulture. Over her forty-year tenure as a teacher and active steward of the West Grove Horticultural Guild, she instilled in generations of students a reverence for the natural world.
              </p>
              <p className="text-xs sm:text-sm text-[#444844] leading-relaxed">
                She is survived by her devoted husband of fifty-six years, Arthur; her children, Katherine, David, and Sarah; and seven beloved grandchildren who knew her as their gentle mentor and master baker.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={onOrderFlowers}
                  className="px-5 py-2.5 rounded-[4px] bg-[#343835] text-[#F8F6F1] hover:bg-[#4A504B] text-xs uppercase tracking-wider font-medium transition cursor-pointer flex items-center gap-2"
                >
                  <Flower2 className="w-4 h-4 text-[#899588]" />
                  <span>Send Tribute Flowers</span>
                </button>
                <button
                  onClick={onOpenSanctuary}
                  className="px-4 py-2.5 rounded-[4px] border border-[#B7A99A] text-[#343835] hover:bg-[#F2EFEA] text-xs uppercase tracking-wider font-medium transition cursor-pointer"
                >
                  Sign Memory Book
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Ceremonial Itinerary */}
        <div className="space-y-6">
          <div className="border-b border-[#E6E1D7] pb-3">
            <h3 className="font-serif text-2xl text-[#343835] font-normal">
              Schedule of Memorial Ceremonies
            </h3>
            <p className="text-xs text-[#566156]">
              All gatherings take place at Willow & Pine Funeral Home or Serenity Ridge Memorial Gardens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICE_DETAILS.events.map((evt, idx) => (
              <div
                key={idx}
                className="bg-[#FFFFFF] border border-[#E6E1D7] rounded-[4px] p-6 shadow-memorial space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#899588] bg-[#F8F6F1] px-2 py-0.5 rounded-[2px] border border-[#E6E1D7]">
                      Event {idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-[#A58A6D]">{evt.time}</span>
                  </div>

                  <h4 className="font-serif text-lg text-[#343835] font-medium">
                    {evt.title}
                  </h4>

                  <div className="space-y-1 text-xs text-[#566156]">
                    <div className="flex items-center gap-1.5 font-medium text-[#1B1C19]">
                      <Calendar className="w-3.5 h-3.5 text-[#899588]" />
                      <span>{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#899588]" />
                      <span>{evt.location}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#747874] pt-2 leading-relaxed border-t border-[#E6E1D7]/60">
                    {evt.notes}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Willow & Pine Funeral Home Location & Logistics */}
        <div className="bg-[#FFFFFF] border border-[#E6E1D7] rounded-[4px] p-6 sm:p-8 shadow-memorial space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6E1D7] pb-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#899588] block">
                Partner Funeral Home
              </span>
              <h3 className="font-serif text-xl text-[#343835] font-medium">
                {SERVICE_DETAILS.locationName}
              </h3>
              <p className="text-xs text-[#566156]">{SERVICE_DETAILS.address}</p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`tel:${SERVICE_DETAILS.phone.replace(/\D/g, '')}`}
                className="px-4 py-2 border border-[#899588] text-[#343835] text-xs font-medium rounded-[4px] hover:bg-[#F2EFEA] transition flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#899588]" />
                <span>Call Chapel Concierge</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#444844]">
            <div className="space-y-1.5">
              <h5 className="font-semibold text-[#1B1C19] uppercase tracking-wider text-[11px]">
                Chapel Accessibility
              </h5>
              <p className="text-[12px] leading-relaxed">
                Wheelchair-accessible ramps, assisted listening devices, and reserved family seating are provided at the Chapel of the Pines entrance.
              </p>
            </div>
            <div className="space-y-1.5">
              <h5 className="font-semibold text-[#1B1C19] uppercase tracking-wider text-[11px]">
                Florist Placement
              </h5>
              <p className="text-[12px] leading-relaxed">
                Tributes ordered online are placed directly inside the chapel by our in-house floral stewards prior to family arrival.
              </p>
            </div>
            <div className="space-y-1.5">
              <h5 className="font-semibold text-[#1B1C19] uppercase tracking-wider text-[11px]">
                Parking & Procession
              </h5>
              <p className="text-[12px] leading-relaxed">
                Dedicated attendee parking is located on the North Grounds. Procession escort to Serenity Ridge will be organized after the service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
