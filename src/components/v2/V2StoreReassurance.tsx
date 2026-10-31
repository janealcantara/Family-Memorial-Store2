import React from 'react';
import { ShieldCheck, Truck, PenTool, Phone } from 'lucide-react';

export const V2StoreReassurance: React.FC = () => {
  return (
    <section className="bg-[#F8F6F1] border-b border-[#E6E1D7] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3.5 p-3">
            <div className="w-9 h-9 rounded-[4px] bg-[#F5F3EE] border border-[#E6E1D7] flex items-center justify-center shrink-0 text-[#899588]">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-medium text-[#343835]">
                Direct Service or Home Delivery
              </h4>
              <p className="text-xs text-[#566156] mt-0.5 leading-relaxed">
                Orders can be coordinated directly with Willow & Pine Funeral Home for chapel placement or delivered privately to family residences.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3">
            <div className="w-9 h-9 rounded-[4px] bg-[#F5F3EE] border border-[#E6E1D7] flex items-center justify-center shrink-0 text-[#899588]">
              <PenTool className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-medium text-[#343835]">
                Complimentary Master Proofing
              </h4>
              <p className="text-xs text-[#566156] mt-0.5 leading-relaxed">
                All custom engravings, inscriptions, and biometric fingerprint casts are proofed with the family before physical casting.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3">
            <div className="w-9 h-9 rounded-[4px] bg-[#F5F3EE] border border-[#E6E1D7] flex items-center justify-center shrink-0 text-[#899588]">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-medium text-[#343835]">
                Dedicated Memorial Steward
              </h4>
              <p className="text-xs text-[#566156] mt-0.5 leading-relaxed">
                Questions about urn sizing, custom wording, or timeline coordination? Call our family concierge line at (555) 849-2100.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
