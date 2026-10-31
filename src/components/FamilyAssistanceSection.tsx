import React from 'react';
import { ShieldCheck, Phone, CheckCircle, Sparkles } from 'lucide-react';

interface FamilyAssistanceSectionProps {
  onContact: () => void;
}

export const FamilyAssistanceSection: React.FC<FamilyAssistanceSectionProps> = ({
  onContact,
}) => {
  return (
    <section className="py-12 sm:py-16 bg-[#F8F6F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] border border-[#E6E1D7] rounded-[4px] p-6 sm:p-10 shadow-memorial grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column (8 cols): Our Promise & Guarantees */}
          <div className="lg:col-span-8 space-y-4">
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-[#899588] block">
                DIRECTOR’S ASSURANCE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#343835]">
                We’re Here to Help Your Family
              </h3>
              <p className="text-xs sm:text-sm text-[#444844] leading-relaxed max-w-2xl">
                If you need help choosing or personalizing a keepsake, the team at Willow & Pine Funeral Home is here to assist you. Every tribute in this private memorial shop was arranged to eliminate stressful logistics during this sacred time. Items chosen for the chapel ceremony are received, inspected, and placed by our memorial staff prior to guest arrivals. Inscriptions are proofread twice, and our director is on hand for any adjustments.
              </p>
            </div>

            {/* Checklist items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-[#566156]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#899588] shrink-0" />
                <span>Direct Delivery to Chapel or Family Residence</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#899588] shrink-0" />
                <span>Director-Verified Inscriptions & Proofs</span>
              </div>
              <div className="flex items-center gap-2 sm:col-span-2">
                <Phone className="w-4 h-4 text-[#899588] shrink-0" />
                <span>
                  24/7 Family Assistance:{' '}
                  <a href="tel:5558492100" className="text-[#343835] font-semibold underline underline-offset-2">
                    (555) 849-2100
                  </a>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Need Bespoke Guidance Card */}
          <div className="lg:col-span-4 bg-[#F5F3EE] border border-[#E6E1D7] rounded-[4px] p-6 text-center space-y-4 shadow-xs">
            <div className="w-12 h-12 mx-auto rounded-[4px] bg-[#FFFFFF] border border-[#E6E1D7] flex items-center justify-center text-[#899588]">
              <Sparkles className="w-5 h-5 text-[#899588]" />
            </div>

            <div className="space-y-1.5">
              <h4 className="font-serif text-lg font-medium text-[#343835]">
                Need Bespoke Guidance?
              </h4>
              <p className="text-xs text-[#566156] leading-relaxed">
                Arthur or immediate family members may contact Eleanor Vance, lead director, for customized inscription requests.
              </p>
            </div>

            <button
              onClick={onContact}
              className="w-full py-2.5 px-4 rounded-[4px] bg-[#343835] text-[#F8F6F1] hover:bg-[#4A504B] transition text-xs font-medium cursor-pointer shadow-xs flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#E0E3DF]" />
              <span>Contact Willow & Pine</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
