import React, { useState } from 'react';
import { X, Check, ShieldCheck, HeartHandshake, Sparkles, MapPin, Feather } from 'lucide-react';
import { TributeProduct, TributePersonalization } from '../types';

interface ProductDetailModalProps {
  product: TributeProduct | null;
  onClose: () => void;
  onAddToCart: (product: TributeProduct, personalization: TributePersonalization) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = [product.imageUrl, ...(product.secondaryImages || [])];

  // Personalization State
  const [deliveryDestination, setDeliveryDestination] = useState<'willow_and_pine' | 'family_residence'>('willow_and_pine');
  const [customAddress, setCustomAddress] = useState('');
  const [engravingText, setEngravingText] = useState(
    product.allowsEngraving ? 'Margaret Williams · In Everlasting Love' : ''
  );
  const [engravingStyle, setEngravingStyle] = useState<'classic_serif' | 'italic_calligraphy' | 'roman_caps'>('classic_serif');
  const [ribbonColor, setRibbonColor] = useState<'Muted Sage' | 'Warm Sand' | 'Alabaster Silk'>(
    (product.defaultRibbon as any) || 'Muted Sage'
  );
  const [botanicalSprig, setBotanicalSprig] = useState<'Olive Branch' | 'Wild Pine' | 'Lavender Sprig'>('Olive Branch');
  const [cardRecipient, setCardRecipient] = useState('The Williams Family');
  const [cardMessage, setCardMessage] = useState(
    'Wishing you comfort, peace, and loving memories to hold forever in your hearts.'
  );
  const [cardSignature, setCardSignature] = useState('With deepest sympathy');
  const [cardTheme, setCardTheme] = useState<'Letterpress Ivy' | 'Serene Alabaster' | 'Gold Foil Script'>('Letterpress Ivy');

  const maxChars = product.maxEngravingChars || 40;

  const handleConfirm = () => {
    onAddToCart(product, {
      deliveryDestination,
      customAddress: deliveryDestination === 'family_residence' ? customAddress : undefined,
      engravingText: product.allowsEngraving ? engravingText : undefined,
      engravingStyle: product.allowsEngraving ? engravingStyle : undefined,
      ribbonColor: product.allowsRibbon ? ribbonColor : undefined,
      botanicalSprig,
      cardRecipient,
      cardMessage,
      cardSignature,
      cardTheme,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 sm:p-6 overflow-y-auto bg-[#1F2320]/60 backdrop-blur-xs transition-opacity animate-fade-in">
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#FFFFFF] border border-[#E6E1D7] rounded-[4px] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6E1D7] bg-[#FBF9F4]">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.08em] font-medium text-[#899588]">
            <span>{product.categoryLabel}</span>
            <span>·</span>
            <span className="text-[#A58A6D]">Memorial Tribute Suite</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="w-8 h-8 rounded-[4px] border border-[#E6E1D7] flex items-center justify-center text-[#566156] hover:bg-[#F0EEE9] hover:text-[#1B1C19] transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body: Two-column asymmetrical arrangement (7 cols visual + 5 cols controls) */}
        <div className="overflow-y-auto flex-1 p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Visual Column (7 Cols on LG) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Main Artwork Preview */}
              <div className="relative bg-[#F5F3EE] p-3 border border-[#E6E1D7] rounded-[4px]">
                <div
                  className={`relative overflow-hidden aspect-[4/3] bg-[#EAE8E3] ${
                    product.archImage ? 'arch-frame' : 'rounded-[4px]'
                  }`}
                >
                  <img
                    src={images[activeImageIndex] || product.imageUrl}
                    alt={product.title}
                    className={`w-full h-full object-center ${
                      (images[activeImageIndex] || product.imageUrl).includes('.png') || product.id === 'heritage-rose-urn'
                        ? 'object-contain p-4'
                        : 'object-cover'
                    }`}
                  />
                  <div className="absolute inset-0 bg-[#A58A6D]/5 mix-blend-overlay pointer-events-none" />
                </div>

                {/* Multiple image thumbnails */}
                {images.length > 1 && (
                  <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-16 h-14 rounded-[2px] overflow-hidden border-2 transition cursor-pointer shrink-0 ${
                          activeImageIndex === idx ? 'border-[#899588]' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Title, Pricing & Description */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#E6E1D7] pb-3">
                  <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#343835]">
                    {product.title}
                  </h2>
                  <div className="font-serif text-2xl text-[#A58A6D] font-medium">
                    ${product.price}
                  </div>
                </div>

                <p className="text-sm sm:text-[15px] text-[#444844] leading-relaxed">
                  {product.description}
                </p>

                {/* Crafting Specifications & Dimensions */}
                <div className="p-4 bg-[#F8F6F1] border border-[#E6E1D7] rounded-[4px] space-y-2 text-xs text-[#444844]">
                  <div>
                    <span className="font-semibold text-[#1B1C19] block uppercase tracking-wider text-[10px]">
                      Dimensions & Specifications
                    </span>
                    <span>{product.dimensions}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#1B1C19] block uppercase tracking-wider text-[10px]">
                      Materials & Botanicals
                    </span>
                    <span>{product.materials}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#1B1C19] block uppercase tracking-wider text-[10px]">
                      Artisanal Crafting Notes
                    </span>
                    <span>{product.craftNotes}</span>
                  </div>
                  {product.careInstructions && (
                    <div>
                      <span className="font-semibold text-[#1B1C19] block uppercase tracking-wider text-[10px]">
                        Service Placement Care
                      </span>
                      <span>{product.careInstructions}</span>
                    </div>
                  )}
                </div>

                {/* Live Brass Engraving Preview (If engravable) */}
                {product.allowsEngraving && (
                  <div className="space-y-2">
                    <span className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[#899588] block">
                      Live Memorial Inscription Plate Preview
                    </span>
                    <div className="p-4 bg-gradient-to-r from-[#EDE8DF] via-[#F4EFE6] to-[#EDE8DF] border-2 border-[#D8D1C5] rounded-[4px] text-center shadow-inner relative">
                      <div className="absolute top-1 left-2 text-[9px] text-[#A58A6D] font-serif uppercase tracking-widest opacity-60">
                        WILLOW & PINE ARCHIVAL BRASS
                      </div>
                      <div
                        className={`text-sm sm:text-base text-[#2F1E09] tracking-wide pt-2 pb-1 ${
                          engravingStyle === 'classic_serif'
                            ? 'font-serif font-medium'
                            : engravingStyle === 'italic_calligraphy'
                            ? 'font-serif italic'
                            : 'font-sans uppercase tracking-[0.16em] font-semibold text-xs'
                        }`}
                      >
                        {engravingText || 'Your Custom Inscription Here'}
                      </div>
                      <div className="text-[10px] text-[#747874] tracking-widest uppercase">
                        HONORING MARGARET WILLIAMS · 1942–2026
                      </div>
                    </div>
                  </div>
                )}

                {/* Live Sympathy Card Preview */}
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[#899588] block">
                    Handwritten Sympathy Card Preview
                  </span>
                  <div className="p-4 bg-[#FFFFFF] border border-[#E6E1D7] rounded-[4px] shadow-xs space-y-2">
                    <div className="flex items-center justify-between border-b border-[#E6E1D7]/60 pb-1.5 text-[11px] text-[#899588]">
                      <span className="uppercase tracking-widest font-serif">{cardTheme}</span>
                      <span>Enclosed with Tribute</span>
                    </div>
                    <div className="text-xs text-[#1B1C19] font-medium">To: {cardRecipient || 'The Williams Family'}</div>
                    <p className="font-serif italic text-sm text-[#444844] leading-relaxed pl-2 border-l border-[#899588]/40">
                      “{cardMessage || 'In loving memory of Margaret.'}”
                    </p>
                    <div className="text-right text-xs text-[#566156] font-medium pt-1">
                      — {cardSignature || 'A Friend'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bespoke Personalization Controls Column (5 Cols on LG) */}
            <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-[#E6E1D7] lg:pl-8">
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-medium text-[#343835]">
                  Bespoke Personalization
                </h3>
                <p className="text-xs text-[#566156]">
                  Configure tribute details, condolence letter, and coordinated destination.
                </p>
              </div>

              {/* 1. Destination Selection (Concentric Radios as per Design Spec) */}
              <div className="space-y-2.5">
                <label className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[#899588] block">
                  Delivery Destination
                </label>
                <div className="space-y-2">
                  {/* Destination 1: Willow & Pine Funeral Home */}
                  <label
                    onClick={() => setDeliveryDestination('willow_and_pine')}
                    className={`flex items-start gap-3 p-3 rounded-[4px] border transition cursor-pointer ${
                      deliveryDestination === 'willow_and_pine'
                        ? 'bg-[#F5F3EE] border-[#899588]'
                        : 'bg-[#FFFFFF] border-[#E6E1D7] hover:border-[#D8D1C5]'
                    }`}
                  >
                    {/* Concentric radio marker (18px diameter with 10px inner disc) */}
                    <div className="w-[18px] h-[18px] rounded-full border border-[#E6E1D7] flex items-center justify-center shrink-0 mt-0.5 bg-white">
                      {deliveryDestination === 'willow_and_pine' && (
                        <div className="w-[10px] h-[10px] rounded-full bg-[#899588]" />
                      )}
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-xs font-semibold text-[#1B1C19] block">
                        Willow & Pine Funeral Home (Recommended)
                      </span>
                      <span className="text-[11px] text-[#566156] block leading-snug">
                        Chapel of the Pines · Coordinated for Margaret&apos;s Service on Saturday, Nov 7.
                      </span>
                    </div>
                  </label>

                  {/* Destination 2: Family Residence */}
                  <label
                    onClick={() => setDeliveryDestination('family_residence')}
                    className={`flex items-start gap-3 p-3 rounded-[4px] border transition cursor-pointer ${
                      deliveryDestination === 'family_residence'
                        ? 'bg-[#F5F3EE] border-[#899588]'
                        : 'bg-[#FFFFFF] border-[#E6E1D7] hover:border-[#D8D1C5]'
                    }`}
                  >
                    <div className="w-[18px] h-[18px] rounded-full border border-[#E6E1D7] flex items-center justify-center shrink-0 mt-0.5 bg-white">
                      {deliveryDestination === 'family_residence' && (
                        <div className="w-[10px] h-[10px] rounded-full bg-[#899588]" />
                      )}
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-xs font-semibold text-[#1B1C19] block">
                        Deliver to Williams Family Residence
                      </span>
                      <span className="text-[11px] text-[#566156] block leading-snug">
                        Hand-delivered with condolences directly to Arthur Williams & family.
                      </span>
                    </div>
                  </label>
                </div>

                {deliveryDestination === 'family_residence' && (
                  <div className="pt-2 animate-fade-in">
                    <input
                      type="text"
                      placeholder="Enter residence address (e.g. 742 Oak Ridge Lane, West Grove, IL)"
                      value={customAddress}
                      onChange={(e) => setCustomAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#D8D1C5] rounded-[4px] text-[#343835] focus:outline-none focus:border-[#899588] focus:ring-2 focus:ring-[#899588]/20"
                    />
                  </div>
                )}
              </div>

              {/* 2. Custom Engraving (If allowed) */}
              {product.allowsEngraving && (
                <div className="space-y-2.5 pt-2 border-t border-[#E6E1D7]">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[#899588]">
                      Custom Plate Inscription
                    </label>
                    <span className="text-[10px] text-[#A58A6D] font-medium">
                      {engravingText.length} / {maxChars} characters
                    </span>
                  </div>

                  <input
                    type="text"
                    maxLength={maxChars}
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value)}
                    placeholder="e.g. Mama, Grandma Margaret, In Everlasting Love"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FFFFFF] border border-[#D8D1C5] rounded-[4px] text-[#343835] focus:outline-none focus:border-[#899588] focus:ring-2 focus:ring-[#899588]/20 transition"
                  />

                  {/* Quick Family Inscription Presets */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] text-[#747874] uppercase tracking-wider">Quick:</span>
                    {['Mama', 'Grandma Margaret', 'Margaret Williams', 'Forever in Our Hearts'].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setEngravingText(preset)}
                        className="px-2 py-0.5 text-[10px] rounded-[3px] bg-[#F5F3EE] hover:bg-[#EAE8E3] text-[#444844] border border-[#E6E1D7] transition cursor-pointer"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>

                  {/* Typography Style Selector */}
                  <div className="grid grid-cols-3 gap-1.5 pt-1">
                    {[
                      { key: 'classic_serif', label: 'Classic Serif' },
                      { key: 'italic_calligraphy', label: 'Italic Calligraphy' },
                      { key: 'roman_caps', label: 'Roman Caps' },
                    ].map((style) => (
                      <button
                        key={style.key}
                        onClick={() => setEngravingStyle(style.key as any)}
                        className={`py-1.5 px-2 text-[10px] tracking-wider uppercase rounded-[4px] border transition cursor-pointer ${
                          engravingStyle === style.key
                            ? 'bg-[#899588] text-white border-[#899588]'
                            : 'bg-white border-[#E6E1D7] text-[#444844] hover:bg-[#F0EEE9]'
                        }`}
                      >
                        {style.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Hand-torn Silk Ribbon (If allowed) */}
              {product.allowsRibbon && (
                <div className="space-y-2 pt-2 border-t border-[#E6E1D7]">
                  <label className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[#899588] block">
                    Hand-Torn Silk Ribbon Accent
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { name: 'Muted Sage', bg: '#899588', text: '#FFFFFF' },
                      { name: 'Warm Sand', bg: '#A58A6D', text: '#FFFFFF' },
                      { name: 'Alabaster Silk', bg: '#F5F3EE', text: '#343835', border: true },
                    ].map((r) => (
                      <button
                        key={r.name}
                        onClick={() => setRibbonColor(r.name as any)}
                        className={`py-2 px-2.5 rounded-[4px] text-xs font-medium border flex items-center justify-center gap-1.5 transition cursor-pointer ${
                          ribbonColor === r.name
                            ? 'border-[#343835] ring-1 ring-[#343835]'
                            : 'border-[#E6E1D7] hover:border-[#899588]'
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{
                            backgroundColor: r.bg,
                            border: r.border ? '1px solid #D8D1C5' : 'none',
                          }}
                        />
                        <span className="text-[11px] truncate">{r.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Sympathy Card Inscription */}
              <div className="space-y-3 pt-2 border-t border-[#E6E1D7]">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[#899588]">
                    Sympathy Card & Condolence Note
                  </label>
                  <span className="text-[10px] text-[#A58A6D] font-medium">Included Complimentary</span>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    value={cardRecipient}
                    onChange={(e) => setCardRecipient(e.target.value)}
                    placeholder="Recipient (e.g. The Williams Family)"
                    className="w-full px-3 py-1.5 text-xs bg-[#FFFFFF] border border-[#D8D1C5] rounded-[4px] text-[#343835] focus:outline-none focus:border-[#899588] focus:ring-2 focus:ring-[#899588]/20"
                  />

                  <textarea
                    rows={3}
                    value={cardMessage}
                    onChange={(e) => setCardMessage(e.target.value)}
                    placeholder="Write your heartfelt memory or condolence message..."
                    className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#D8D1C5] rounded-[4px] text-[#343835] focus:outline-none focus:border-[#899588] focus:ring-2 focus:ring-[#899588]/20 leading-relaxed"
                  />

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={cardSignature}
                      onChange={(e) => setCardSignature(e.target.value)}
                      placeholder="Sign your name (e.g. Eleanor Vance & Family)"
                      className="w-full px-3 py-1.5 text-xs bg-[#FFFFFF] border border-[#D8D1C5] rounded-[4px] text-[#343835] focus:outline-none focus:border-[#899588] focus:ring-2 focus:ring-[#899588]/20"
                    />
                  </div>
                </div>
              </div>

              {/* Action Button (Strict to Design Spec: #343835, vertical padding 0.875rem, horizontal padding 1.75rem) */}
              <div className="pt-4 border-t border-[#E6E1D7] space-y-2">
                <button
                  onClick={handleConfirm}
                  className="w-full bg-[#343835] text-[#F8F6F1] hover:bg-[#4A504B] transition py-[0.875rem] px-[1.75rem] rounded-[4px] text-xs uppercase tracking-[0.08em] font-medium cursor-pointer shadow-xs flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-[#899588]" />
                  <span>Confirm Tribute & Add to Basket · ${product.price}</span>
                </button>

                <p className="text-[11px] text-center text-[#747874] italic">
                  Coordinated directly with Willow & Pine Funeral Home. No rush or surprise fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
