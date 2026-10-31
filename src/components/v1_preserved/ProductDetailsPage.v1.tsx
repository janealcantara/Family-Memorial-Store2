import React, { useState, useEffect } from 'react';
import {
  TributeProduct,
  TributePersonalization,
} from '../../types';
import { TRIBUTE_PRODUCTS } from '../../data/tributes';
import {
  ArrowLeft,
  ShoppingBag,
  Heart,
  ZoomIn,
  Truck,
  ShieldCheck,
  Award,
  Clock,
  Phone,
  Info,
  Check,
  RefreshCw,
  PenLine,
  Image as ImageIcon,
  Compass,
  Ruler,
  Lock,
  ChevronRight,
  Sparkles,
  X,
  Upload,
} from 'lucide-react';

interface ProductDetailsPageProps {
  product: TributeProduct;
  onBack: () => void;
  onSelectProduct: (product: TributeProduct) => void;
  onAddToCart: (product: TributeProduct, personalization: TributePersonalization, quantity: number) => void;
  onOpenCart?: () => void;
  onOpenServiceInfo?: () => void;
}

const MARGARET_PORTRAITS = [
  {
    id: 'memorial',
    title: 'Memorial Portrait',
    url: './assets/aistudio/Margaret_Williams_Memorial_Photo_35c13dec.png',
    tag: 'Formal Memorial',
  },
  {
    id: 'garden',
    title: 'In Her Garden',
    url: './assets/aistudio/Margaret_Williams_In_her_Garden_e5c434b0.png',
    tag: 'Rose Garden',
  },
  {
    id: 'jubilee',
    title: '80th Jubilee Celebration',
    url: './assets/aistudio/Margaret_Williams_80th_Jubilee_5cb628a2.png',
    tag: 'Milestone Jubilee',
  },
];

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  product,
  onBack,
  onSelectProduct,
  onAddToCart,
  onOpenServiceInfo,
}) => {
  // Gallery states
  const galleryItems = product.galleryThumbnails && product.galleryThumbnails.length > 0
    ? product.galleryThumbnails
    : [
        { label: '1. Primary View', url: product.imageUrl, angle: 'Front archival view' },
        ...(product.secondaryImages || []).map((url: string, i: number) => ({
          label: `${i + 2}. Alternate View`,
          url,
          angle: 'Alternate angle',
        })),
      ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isWishlistSaved, setIsWishlistSaved] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [syncNotice, setSyncNotice] = useState(false);

  // Personalization states
  const [activeMode, setActiveMode] = useState<'text' | 'photo'>(
    product.allowsEngraving ? 'text' : product.allowsPhotoToken ? 'photo' : 'text'
  );
  const [line1, setLine1] = useState(product.defaultHonorific || 'Margaret');
  const [line2, setLine2] = useState(product.defaultDates || '1942 – 2026');
  const [line3, setLine3] = useState(product.defaultMessage || 'Forever Treasured');
  const [typestyle, setTypestyle] = useState<'classic_serif' | 'roman_caps' | 'italic_calligraphy'>('classic_serif');

  // Photo Token states
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState<string>(
    MARGARET_PORTRAITS[0].url
  );
  const [photoCropScale, setPhotoCropScale] = useState<number>(1.0);

  // Reset/sync when product changes
  useEffect(() => {
    setActiveImageIndex(0);
    setQuantity(1);
    setIsWishlistSaved(false);
    setLine1(product.defaultHonorific || 'Margaret');
    setLine2(product.defaultDates || '1942 – 2026');
    setLine3(product.defaultMessage || 'Forever Treasured');
    setActiveMode(product.allowsEngraving ? 'text' : product.allowsPhotoToken ? 'photo' : 'text');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  const handleToggleDemoSwitch = () => {
    if (line1 === "'Mama'" || line1 === 'Mama') {
      setLine1('Mary');
    } else if (line1 === 'Mary') {
      setLine1("'Mama'");
    } else {
      setLine1((prev: string) => (prev === 'Margaret' ? "'Mama'" : 'Margaret'));
    }
    triggerSyncFlash();
  };

  const triggerSyncFlash = () => {
    setSyncNotice(true);
    setTimeout(() => setSyncNotice(false), 1200);
  };

  const handleAddToCartClick = () => {
    const personalization: TributePersonalization = {
      deliveryDestination: 'willow_and_pine',
      engravingLine1: line1,
      engravingLine2: line2,
      engravingLine3: line3,
      engravingText: `${line1} | ${line2} | ${line3}`,
      engravingStyle: typestyle,
      photoTokenUrl: product.allowsPhotoToken ? selectedPhotoUrl : undefined,
      photoCropScale,
      activeMode,
    };
    onAddToCart(product, personalization, quantity);
  };

  // Complementary products lookup
  const complementaryProducts = (product.complementaryIds || [])
    .map((id: string) => TRIBUTE_PRODUCTS.find((p: TributeProduct) => p.id === id))
    .filter((p): p is TributeProduct => p !== undefined)
    .slice(0, 3);

  // Fallback complementary if none specified
  const finalComplementary = complementaryProducts.length > 0
    ? complementaryProducts
    : TRIBUTE_PRODUCTS.filter((p: TributeProduct) => p.id !== product.id).slice(0, 3);

  const activeMainImage = galleryItems[activeImageIndex]?.url || product.imageUrl;

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#1B1C19]">
      {/* Top Breadcrumb & Back Bar */}
      <div className="border-b border-[#E6E1D7] bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs text-[#5D655E]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={onBack}
              className="text-[#343835] hover:text-[#1B1C19] font-medium transition-colors flex items-center gap-1 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>Memorial Home</span>
            </button>
            <ChevronRight className="w-3 h-3 text-[#A58A6D]" />
            <span className="capitalize">{product.categoryLabel.split('·')[0].trim().toLowerCase()}</span>
            <ChevronRight className="w-3 h-3 text-[#A58A6D]" />
            <span className="text-[#1B1C19] font-semibold truncate max-w-[240px] sm:max-w-md">
              {product.title}
            </span>
          </nav>

          <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#717A72]">
            <span>MARGARET WILLIAMS MEMORIAL STORE</span>
            <span aria-hidden="true">·</span>
            <span>WILLOW & PINE CHAPEL DIRECT</span>
          </div>
        </div>
      </div>

      {/* Main Product Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: Gallery, Simulated Laser Inscription, Specs */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Primary Image Viewport */}
            <div className="relative rounded-[4px] border border-[#E6E1D7] bg-[#F2EFE8] overflow-hidden shadow-sm aspect-square max-h-[580px] flex items-center justify-center group">
              {/* Material / Collection Badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-[#343835]/90 backdrop-blur-sm text-[#F8F6F1] px-3 py-1 rounded-[2px] text-[10px] font-semibold tracking-wider uppercase border border-[#343835]">
                  {product.badge || 'Artisanal Memorial'}
                </span>
              </div>

              {/* Main Image */}
              <img
                src={activeMainImage}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />

              {/* LIVE SIMULATED ENGRAVING / LASER OVERLAY */}
              {/* Only shown when first/front thumbnail is selected and product allows engraving */}
              {activeImageIndex === 0 && product.allowsEngraving && activeMode === 'text' && (
                <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none p-8">
                  <div className="bg-[#1A1916]/30 backdrop-blur-[1px] px-6 py-5 rounded-[4px] max-w-[80%] text-center border border-[#A58A6D]/40 shadow-lg">
                    {/* Laser engraving simulation in warm metallic tones */}
                    <p
                      className={`text-[#F5E8C7] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-tight ${
                        typestyle === 'roman_caps'
                          ? 'font-serif text-lg sm:text-2xl tracking-[0.25em] uppercase font-medium'
                          : typestyle === 'italic_calligraphy'
                          ? 'font-serif text-2xl sm:text-3xl italic tracking-wide'
                          : 'font-serif text-xl sm:text-2xl font-semibold tracking-normal'
                      }`}
                    >
                      {line1 || 'Margaret'}
                    </p>

                    {line2 && (
                      <p className="mt-1 text-xs sm:text-sm text-[#E2D2AA] font-serif tracking-widest drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                        {line2}
                      </p>
                    )}

                    {line3 && (
                      <p className="mt-1.5 text-xs sm:text-sm text-[#D5C294] font-serif italic drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                        “{line3}”
                      </p>
                    )}

                    <div className="mt-2.5 pt-2 border-t border-[#A58A6D]/30 flex items-center justify-center gap-1.5 text-[9px] uppercase tracking-widest text-[#E2D2AA]/90">
                      <Sparkles className="w-2.5 h-2.5 text-[#C9A86A]" />
                      <span>Simulated Laser Etch Preview</span>
                    </div>
                  </div>
                </div>
              )}

              {/* LIVE PHOTO TOKEN CAMEO OVERLAY */}
              {activeImageIndex === 0 && product.allowsPhotoToken && activeMode === 'photo' && (
                <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none p-6">
                  <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-2 bg-gradient-to-br from-[#D4AF37] via-[#A58A6D] to-[#6A5738] shadow-2xl border-2 border-[#F5E8C7]">
                    <div className="w-full h-full rounded-full overflow-hidden border border-[#A58A6D]/60 relative bg-black">
                      <img
                        src={selectedPhotoUrl}
                        alt="Memorial Cameo"
                        className="w-full h-full object-cover"
                        style={{ transform: `scale(${photoCropScale})` }}
                      />
                    </div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#343835] text-[#F8F6F1] px-2.5 py-0.5 rounded-[2px] text-[9px] font-medium tracking-wider whitespace-nowrap shadow border border-[#899588]">
                      Cameo Inset Preview
                    </div>
                  </div>
                </div>
              )}

              {/* Status Indicator pill (Bottom Left) */}
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 bg-[#F8F6F1]/95 backdrop-blur-sm px-2.5 py-1 rounded-[2px] text-[10px] font-semibold text-[#343835] border border-[#E6E1D7] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>
                  {activeMode === 'text' && product.allowsEngraving
                    ? 'LASER PREVIEW MODE: ACTIVE'
                    : activeMode === 'photo' && product.allowsPhotoToken
                    ? 'PHOTO TOKEN MODE: ACTIVE'
                    : 'ARCHIVAL GALLERY INSPECTION'}
                </span>
              </div>

              {/* Zoom Button (Bottom Right) */}
              <button
                type="button"
                onClick={() => setIsZoomOpen(true)}
                className="absolute bottom-4 right-4 z-20 bg-white/90 hover:bg-white text-[#343835] p-2 rounded-[2px] shadow-md border border-[#E6E1D7] transition-all hover:scale-105"
                title="Expand and zoom image"
                aria-label="Expand image"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Thumbnail Navigation Row */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
              {galleryItems.map((thumb: any, idx: number) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`flex flex-col text-left rounded-[3px] overflow-hidden border transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#343835] ring-2 ring-[#343835]/15 shadow-sm bg-[#EFECE5]'
                      : 'border-[#E6E1D7] hover:border-[#A58A6D] bg-[#F8F6F1]'
                  }`}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#ECE8DE]">
                    <img
                      src={thumb.url}
                      alt={thumb.label}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-1.5 sm:p-2 bg-[#FAF8F5]">
                    <p className="text-[11px] font-semibold text-[#1B1C19] truncate leading-tight">
                      {thumb.label}
                    </p>
                    <p className="text-[9px] text-[#717A72] truncate hidden sm:block">
                      {thumb.angle}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Master Guild Memorial Craftsmanship Section */}
            <div className="bg-[#F3F0EA] border border-[#E6E1D7] rounded-[4px] p-5 sm:p-6 mt-1 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-[#343835]">
                <Compass className="w-4 h-4 text-[#A58A6D]" />
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#1B1C19]">
                  Master Guild Memorial Craftsmanship
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#4E564F] leading-relaxed mb-4">
                {product.craftNotes || product.description}
              </p>

              {/* Specifications Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3.5 border-t border-[#E0DBD0] text-xs text-[#5D655E]">
                {product.capacity && (
                  <div className="flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-[#A58A6D] shrink-0" />
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-[#828B83] font-medium">Capacity</span>
                      <span className="font-semibold text-[#1B1C19]">{product.capacity}</span>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Ruler className="w-3.5 h-3.5 text-[#A58A6D] shrink-0" />
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-[#828B83] font-medium">Dimensions</span>
                    <span className="font-semibold text-[#1B1C19]">{product.dimensions}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#A58A6D] shrink-0" />
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-[#828B83] font-medium">Protection</span>
                    <span className="font-semibold text-[#1B1C19]">{product.sealType || 'Airtight Seal'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Info, Live Personalization Studio, Purchase */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Header info: Ref code & Immediate Fulfillment */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                <span className="text-[11px] font-mono tracking-wider uppercase text-[#717A72] font-semibold">
                  {product.tributeRef || `TRIBUTE REF #${product.id.substring(0, 8).toUpperCase()}`}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#2D5A3A] bg-[#E8F0EA] px-2.5 py-0.5 rounded-[2px] border border-[#C5D8C9]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A3A]" />
                  Immediate Service Fulfillment
                </span>
              </div>

              {/* Title & Subtitle */}
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#1B1C19] leading-tight mb-2.5">
                {product.title}
              </h1>
              <p className="text-xs sm:text-sm text-[#4E564F] leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Price Row */}
              <div className="flex items-baseline gap-2.5 pb-4 border-b border-[#E6E1D7]">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1B1C19] tabular-nums">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xs text-[#717A72]">
                  Includes artisan personalization & presentation chest
                </span>
              </div>
            </div>

            {/* Direct Service Hall Hand-Delivery Available callout */}
            <div className="bg-[#F4F1EA] border border-[#E2DDD3] rounded-[4px] p-3.5 flex items-start gap-3">
              <Truck className="w-5 h-5 text-[#899588] shrink-0 mt-0.5" />
              <div className="text-xs text-[#4E564F]">
                <p className="font-semibold text-[#1B1C19] mb-0.5">
                  Direct Service Hall Hand-Delivery Available
                </p>
                <p className="leading-relaxed">
                  Handcrafted by Heritage Memorial Artisans; estimated dispatch 4–6 business days or directly delivered to Willow & Pine prior to services on Tuesday.
                </p>
              </div>
            </div>

            {/* LIVE PERSONALIZATION STUDIO */}
            {(product.allowsEngraving || product.allowsPhotoToken) ? (
              <div className="bg-white border border-[#E0DBD0] rounded-[4px] p-5 shadow-sm">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#EFECE5]">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#A58A6D]" />
                    <h2 className="font-serif text-base font-bold text-[#1B1C19]">
                      Live Personalization Studio
                    </h2>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#899588] bg-[#F4F1EA] px-2 py-0.5 rounded-[2px] border border-[#E2DDD3]">
                    Interactive Preview
                  </span>
                </div>

                {/* Mode Tabs if both or either allowed */}
                <div className="flex items-center gap-2 p-1 bg-[#F4F1EA] rounded-[3px] mb-4 text-xs">
                  {product.allowsEngraving && (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveMode('text');
                        triggerSyncFlash();
                      }}
                      className={`flex-1 py-1.5 px-3 rounded-[2px] font-medium transition-all flex items-center justify-center gap-1.5 ${
                        activeMode === 'text'
                          ? 'bg-white text-[#1B1C19] shadow-sm font-semibold'
                          : 'text-[#5D655E] hover:text-[#1B1C19]'
                      }`}
                    >
                      <PenLine className="w-3.5 h-3.5 text-[#899588]" />
                      <span>Custom Engraving (Text)</span>
                    </button>
                  )}
                  {product.allowsPhotoToken && (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveMode('photo');
                        triggerSyncFlash();
                      }}
                      className={`flex-1 py-1.5 px-3 rounded-[2px] font-medium transition-all flex items-center justify-center gap-1.5 ${
                        activeMode === 'photo'
                          ? 'bg-white text-[#1B1C19] shadow-sm font-semibold'
                          : 'text-[#5D655E] hover:text-[#1B1C19]'
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-[#899588]" />
                      <span>Photo Keepsake Token</span>
                    </button>
                  )}
                </div>

                {/* TEXT ENGRAVING MODE */}
                {activeMode === 'text' && product.allowsEngraving && (
                  <div className="space-y-3.5">
                    {/* Line 1 with Demo Switch */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-semibold text-[#343835]">
                          Inscription Line 1 (Name / Honorific)
                        </label>
                        <button
                          type="button"
                          onClick={handleToggleDemoSwitch}
                          className="text-[11px] font-medium text-[#7A644D] hover:text-[#4A3D31] flex items-center gap-1 bg-[#FAF6F0] px-2 py-0.5 rounded-[2px] border border-[#E9DEC9] transition-colors"
                        >
                          <RefreshCw className="w-2.5 h-2.5" />
                          <span>Demo Switch: “Mama” ↔ “Mary”</span>
                        </button>
                      </div>
                      <input
                        type="text"
                        maxLength={product.maxEngravingChars || 24}
                        value={line1}
                        onChange={(e) => {
                          setLine1(e.target.value);
                          triggerSyncFlash();
                        }}
                        placeholder="e.g. 'Mama' or Margaret Williams"
                        className="w-full bg-[#FAF9F6] border border-[#DCD6C9] focus:border-[#343835] focus:bg-white text-[#1B1C19] px-3 py-2 rounded-[2px] text-xs focus:outline-none transition-colors"
                      />
                      <div className="flex justify-end mt-1">
                        <span className="text-[10px] text-[#828B83]">
                          Max {product.maxEngravingChars || 24} chars
                        </span>
                      </div>
                    </div>

                    {/* Line 2: Commemorative Dates */}
                    <div>
                      <label className="block text-xs font-semibold text-[#343835] mb-1">
                        Line 2: Commemorative Dates
                      </label>
                      <input
                        type="text"
                        maxLength={24}
                        value={line2}
                        onChange={(e) => {
                          setLine2(e.target.value);
                          triggerSyncFlash();
                        }}
                        placeholder="1942 – 2026"
                        className="w-full bg-[#FAF9F6] border border-[#DCD6C9] focus:border-[#343835] focus:bg-white text-[#1B1C19] px-3 py-2 rounded-[2px] text-xs focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Line 3: Short Message or Scripture */}
                    <div>
                      <label className="block text-xs font-semibold text-[#343835] mb-1">
                        Line 3: Short Message or Scripture
                      </label>
                      <input
                        type="text"
                        maxLength={32}
                        value={line3}
                        onChange={(e) => {
                          setLine3(e.target.value);
                          triggerSyncFlash();
                        }}
                        placeholder="e.g. In God's Garden"
                        className="w-full bg-[#FAF9F6] border border-[#DCD6C9] focus:border-[#343835] focus:bg-white text-[#1B1C19] px-3 py-2 rounded-[2px] text-xs focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Inscription Typestyle */}
                    <div>
                      <label className="block text-xs font-semibold text-[#343835] mb-1.5">
                        Inscription Typestyle
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setTypestyle('classic_serif');
                            triggerSyncFlash();
                          }}
                          className={`py-2 px-2.5 rounded-[2px] text-xs font-serif transition-all border ${
                            typestyle === 'classic_serif'
                              ? 'bg-[#343835] text-white border-[#343835] shadow-sm'
                              : 'bg-[#FAF9F6] text-[#4E564F] border-[#DCD6C9] hover:border-[#899588]'
                          }`}
                        >
                          Elegant Serif
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setTypestyle('roman_caps');
                            triggerSyncFlash();
                          }}
                          className={`py-2 px-2.5 rounded-[2px] text-xs font-serif uppercase tracking-wider transition-all border ${
                            typestyle === 'roman_caps'
                              ? 'bg-[#343835] text-white border-[#343835] shadow-sm'
                              : 'bg-[#FAF9F6] text-[#4E564F] border-[#DCD6C9] hover:border-[#899588]'
                          }`}
                        >
                          ROMAN CLASSIC
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setTypestyle('italic_calligraphy');
                            triggerSyncFlash();
                          }}
                          className={`py-2 px-2.5 rounded-[2px] text-xs font-serif italic transition-all border ${
                            typestyle === 'italic_calligraphy'
                              ? 'bg-[#343835] text-white border-[#343835] shadow-sm'
                              : 'bg-[#FAF9F6] text-[#4E564F] border-[#DCD6C9] hover:border-[#899588]'
                          }`}
                        >
                          Modern Script
                        </button>
                      </div>
                    </div>

                    {/* Refresh Preview button */}
                    <div className="pt-2 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={triggerSyncFlash}
                        className="py-1.5 px-3 rounded-[2px] bg-[#EFECE5] hover:bg-[#E5E1D8] text-[#343835] text-xs font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${syncNotice ? 'animate-spin' : ''}`} />
                        <span>Refresh Live Inscription</span>
                      </button>

                      <div className="flex items-center gap-1.5 text-[11px] text-[#2D5A3A] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A3A]" />
                        <span>Real-Time Sync</span>
                      </div>
                    </div>

                    {/* Artisan Disclaimer */}
                    <div className="p-2.5 rounded-[2px] bg-[#F7F5EE] border border-[#E6E1D7] flex items-start gap-2 text-[11px] text-[#717A72] leading-relaxed">
                      <Info className="w-4 h-4 text-[#A58A6D] shrink-0 mt-0.5" />
                      <p>
                        AI-generated inscription preview simulates laser etching on satin brass. Final heirloom piece is precision crafted by master artisans and inspected by Willow & Pine staff before service staging.
                      </p>
                    </div>
                  </div>
                )}

                {/* PHOTO TOKEN MODE */}
                {activeMode === 'photo' && product.allowsPhotoToken && (
                  <div className="space-y-4">
                    <p className="text-xs text-[#4E564F]">
                      Choose an archival portrait of Margaret for the precision photo medallion inlay:
                    </p>

                    <div className="grid grid-cols-3 gap-2.5">
                      {MARGARET_PORTRAITS.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            setSelectedPhotoUrl(p.url);
                            triggerSyncFlash();
                          }}
                          className={`flex flex-col text-left rounded-[3px] overflow-hidden border p-1 transition-all ${
                            selectedPhotoUrl === p.url
                              ? 'border-[#343835] ring-2 ring-[#343835]/15 bg-[#EFECE5]'
                              : 'border-[#DCD6C9] hover:border-[#899588] bg-white'
                          }`}
                        >
                          <div className="aspect-square w-full rounded-[2px] overflow-hidden bg-black/5">
                            <img
                              src={p.url}
                              alt={p.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="mt-1 text-[10px] font-semibold text-[#1B1C19] truncate">
                            {p.title}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Crop scale slider */}
                    <div>
                      <div className="flex justify-between text-xs text-[#5D655E] mb-1">
                        <span>Cameo Framing Zoom</span>
                        <span>{photoCropScale.toFixed(1)}x</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="2"
                        step="0.1"
                        value={photoCropScale}
                        onChange={(e) => setPhotoCropScale(parseFloat(e.target.value))}
                        className="w-full accent-[#343835]"
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Non-customizable products note */
              <div className="bg-white border border-[#E0DBD0] rounded-[4px] p-5 shadow-sm text-xs text-[#5D655E] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#899588] shrink-0" />
                <div>
                  <p className="font-semibold text-[#1B1C19] mb-1">
                    Authentic Masterwork Preservation
                  </p>
                  <p className="leading-relaxed">
                    This memorial piece is hand-finished in its purest archival form without surface engraving to maintain structural integrity and natural patina.
                  </p>
                </div>
              </div>
            )}

            {/* Quantity Selector and Primary Add to Cart */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Stepper */}
                <div className="flex items-center border border-[#DCD6C9] rounded-[2px] bg-white h-11">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-9 h-full flex items-center justify-center text-[#5D655E] hover:text-[#1B1C19] disabled:opacity-40 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <span className="text-base font-medium">−</span>
                  </button>
                  <span className="w-10 text-center font-semibold text-xs tabular-nums text-[#1B1C19]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-full flex items-center justify-center text-[#5D655E] hover:text-[#1B1C19] transition-colors"
                    aria-label="Increase quantity"
                  >
                    <span className="text-base font-medium">+</span>
                  </button>
                </div>

                {/* Main Add to Memorial Basket Button */}
                <button
                  type="button"
                  onClick={handleAddToCartClick}
                  className="flex-1 h-11 bg-[#1B1C19] hover:bg-[#343835] text-[#F8F6F1] font-medium text-xs sm:text-sm rounded-[2px] shadow-sm transition-all flex items-center justify-center gap-2 group"
                >
                  <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>Add to Family Memorial Cart</span>
                </button>
              </div>

              {/* Secondary Actions */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setIsWishlistSaved(!isWishlistSaved)}
                  className={`py-2 px-3 rounded-[2px] border text-xs font-medium transition-colors flex items-center justify-center gap-1.5 ${
                    isWishlistSaved
                      ? 'bg-[#F2ECE4] border-[#A58A6D] text-[#634832]'
                      : 'bg-white border-[#DCD6C9] hover:border-[#899588] text-[#4E564F]'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlistSaved ? 'fill-[#A58A6D] text-[#A58A6D]' : ''}`} />
                  <span>{isWishlistSaved ? 'Saved to Wishlist' : 'Save to Family Wishlist'}</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenServiceInfo}
                  className="py-2 px-3 rounded-[2px] border border-[#DCD6C9] bg-white hover:bg-[#F8F6F1] text-[#4E564F] text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#899588]" />
                  <span>Confirm with Director</span>
                </button>
              </div>

              {/* Verified Proof Banner */}
              <div className="flex items-center justify-between pt-3 border-t border-[#E6E1D7] text-[11px] text-[#717A72]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#2D5A3A]" />
                  <span className="text-[#2D5A3A] font-semibold">Proofed by Willow & Pine Care Steward</span>
                </div>
                <span className="font-mono text-[10px] text-[#828B83]">WP-VERIFIED</span>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* COMPLEMENTARY PIECES CHOSEN FOR MARGARET'S FAMILY         */}
        {/* ========================================================= */}
        <section className="mt-16 pt-12 border-t border-[#E6E1D7]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <span className="text-[10px] uppercase font-semibold tracking-widest text-[#717A72] block mb-1">
                HARMONIOUS REMEMBRANCE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B1C19]">
                Complementary Pieces Chosen for Margaret’s Family
              </h2>
            </div>
            <p className="text-xs text-[#5D655E] max-w-md">
              Pieces designed in continuous motif with the Heritage Rose motif, crafted so children, grandchildren, and loved ones may each keep a tangible remembrance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {finalComplementary.map((comp: TributeProduct) => (
              <div
                key={comp.id}
                className="bg-white border border-[#E6E1D7] rounded-[4px] overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#ECE8DE] relative">
                  <img
                    src={comp.imageUrl}
                    alt={comp.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {comp.badge && (
                    <span className="absolute top-3 right-3 bg-[#343835]/85 backdrop-blur-sm text-[#F8F6F1] px-2 py-0.5 rounded-[2px] text-[9px] font-semibold tracking-wider uppercase">
                      {comp.badge}
                    </span>
                  )}
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#828B83] font-semibold block mb-1">
                      {comp.subtitle || comp.categoryLabel.split('·')[0]}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#1B1C19] mb-1.5 group-hover:text-[#634832] transition-colors">
                      {comp.title}
                    </h3>
                    <p className="text-xs text-[#5D655E] line-clamp-2 leading-relaxed mb-3">
                      {comp.craftNotes || comp.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F0ECE2] flex items-center justify-between mt-auto">
                    <span className="font-serif text-base font-bold text-[#1B1C19] tabular-nums">
                      ${comp.price.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectProduct(comp)}
                      className="text-xs font-semibold text-[#343835] hover:text-[#1B1C19] flex items-center gap-1 group/btn transition-colors"
                    >
                      <span>View Keepsake</span>
                      <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* BOTTOM SERVICE & TIMELINE ASSURANCES                      */}
        {/* ========================================================= */}
        <section className="mt-12 bg-[#F3F0EA] border border-[#E6E1D7] rounded-[4px] p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#899588] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-sm font-bold text-[#1B1C19] mb-1">
                  Service Timeline Protection
                </h4>
                <p className="text-xs text-[#5D655E] leading-relaxed">
                  Urgent engraving jobs for Margaret’s memorial service take priority in our studio. If needed within 48 hours, our concierge directly expedites delivery to Willow & Pine.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-[#A58A6D] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-sm font-bold text-[#1B1C19] mb-1">
                  Forever Inscription Guarantee
                </h4>
                <p className="text-xs text-[#5D655E] leading-relaxed">
                  Laser and diamond chisel engravings are deep-set into solid brass, resisting tarnishing and atmospheric exposure indefinitely.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#899588] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-sm font-bold text-[#1B1C19] mb-1">
                  Respectful Family Assistance
                </h4>
                <p className="text-xs text-[#5D655E] leading-relaxed">
                  Uncertain about wording or phrasing? Call our compassionate directors at (800) 555-0192 for complimentary inscription guidance.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* High-Resolution Zoom Lightbox */}
      {isZoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setIsZoomOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-[#1A1916] rounded-[4px] overflow-hidden border border-[#A58A6D]/40 p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black text-white p-2 rounded-full border border-white/20 transition-colors"
              aria-label="Close zoom"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activeMainImage}
              alt={product.title}
              className="w-full h-auto max-h-[82vh] object-contain rounded-[2px]"
            />
            <div className="p-3 text-center text-xs text-[#E6E1D7] flex items-center justify-between">
              <span>{product.title} — {galleryItems[activeImageIndex]?.label}</span>
              <span className="text-[10px] text-[#A58A6D]">Click outside or ✕ to close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
