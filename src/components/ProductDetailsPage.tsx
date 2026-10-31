import React, { useState, useEffect } from 'react';
import {
  TributeProduct,
  TributePersonalization,
} from '../types';
import { TRIBUTE_PRODUCTS } from '../data/tributes';
import {
  ArrowLeft,
  ShoppingBag,
  ZoomIn,
  Sparkles,
  X,
  ChevronRight,
  PenLine,
  Image as ImageIcon,
  Check,
  ShieldCheck,
  Heart,
  Package,
} from 'lucide-react';

interface ProductDetailsPageProps {
  product: TributeProduct;
  onBack: () => void;
  onSelectProduct: (product: TributeProduct) => void;
  onAddToCart: (
    product: TributeProduct,
    personalization: TributePersonalization,
    quantity: number
  ) => void;
  onOpenCart?: () => void;
  onOpenServiceInfo?: () => void;
}

const MARGARET_PORTRAITS = [
  {
    id: 'memorial',
    title: 'Memorial Portrait',
    url: './assets/aistudio/Margaret_Williams_Memorial_Photo_35c13dec.png',
  },
  {
    id: 'garden',
    title: 'In Her Garden',
    url: './assets/aistudio/Margaret_Williams_In_her_Garden_e5c434b0.png',
  },
  {
    id: 'jubilee',
    title: '80th Jubilee Celebration',
    url: './assets/aistudio/Margaret_Williams_80th_Jubilee_5cb628a2.png',
  },
];

// Warm, thoughtful 1-2 sentence descriptions focused on remembrance
const WARM_DESCRIPTIONS: Record<string, string> = {
  'heritage-rose-urn':
    'A graceful resting keepsake adorned with delicate rose etchings, created to honor Margaret’s love of English garden flowers and warm hospitality.',
  'matching-rose-pendant':
    'A tender wearable rose bloom designed to keep Margaret close to your heart each day, shared among daughters, granddaughters, and loved ones.',
  'botanical-guest-book':
    'An elegant keepsake book bound in sage cloth to collect heartfelt reflections, prayers, and cherished memories from family and friends.',
  'rose-petal-sharing-tube':
    'A gentle, eco-friendly way to scatter flower petals or ashes in Margaret’s favorite garden or cherished outdoor sanctuary.',
  'heritage-walnut-urn':
    'A warm, enduring resting vessel handcrafted from American walnut with inlaid wild roses, celebrating Margaret’s lifelong love of nature.',
  'tactile-fingerprint-teardrop':
    'A comforting physical touchstone carrying the gentle impression of Margaret’s hand, kept close through every journey and anniversary.',
  'forest-moss-velvet-chest':
    'A beautiful sanctuary to safeguard Margaret’s handwritten recipe cards, photographs, and family heirlooms for generations to come.',
  'botanical-stepping-stone':
    'A permanent stone keepsake for the garden pathway, marking a peaceful place of quiet reflection where love blooms endlessly.',
  'rose-bud-vase':
    'A luminous hand-blown glass vase designed to hold a fresh clipping from Margaret’s rose garden through the changing seasons.',
  'english-rose-seed-packets':
    'A living floral legacy for family and friends to plant in spring, bringing Margaret’s favorite blossoms back to life every year.',
  'cast-bronze-garden-plaque':
    'A perpetual outdoor tribute plaque crafted in solid bronze for Margaret’s favorite garden sitting bench or quiet reading spot.',
  'rose-petal-pendant':
    'A delicate botanical keepsake preserving memorial rose petals in crystal resin, carrying her memory wherever you go.',
  'botanical-monogram-signet':
    'An elegant heirloom signet ring hand-carved with Margaret’s monogram and delicate floral leaves for everyday remembrance.',
  'walnut-titanium-capsule':
    'An understated everyday companion crafted from natural walnut and titanium to safely carry a meaningful remembrance.',
  'white-haven-casket-spray':
    'A peaceful arrangement of ivory garden roses, lisianthus, and fragrant eucalyptus honoring Margaret with timeless beauty.',
  'ceramic-teardrop-keepsake-urn':
    'A palm-sized sharing keepsake crafted in celadon stoneware, providing family members a comforting personal remembrance for their home.',
  'beeswax-remembrance-pillar':
    'A clean-burning natural beeswax candle with embossed olive leaves, lit for quiet evenings of reflection and loving remembrance.',
  'botanical-pressed-glass-frame':
    'A vintage brass frame with genuine pressed garden botanicals, beautifully framing Margaret’s portrait or a meaningful message.',
};

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  product,
  onBack,
  onSelectProduct,
  onAddToCart,
}) => {
  // Main image & zoom
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Personalization states
  const [activeMode, setActiveMode] = useState<'text' | 'photo'>(
    product.allowsEngraving ? 'text' : product.allowsPhotoToken ? 'photo' : 'text'
  );
  const [line1, setLine1] = useState(product.defaultHonorific || 'Margaret');
  const [line2, setLine2] = useState(product.defaultDates || '1942 – 2026');
  const [line3, setLine3] = useState(product.defaultMessage || 'Forever Treasured');
  const [typestyle, setTypestyle] = useState<
    'classic_serif' | 'roman_caps' | 'italic_calligraphy'
  >('classic_serif');

  // Photo Token states
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState<string>(
    MARGARET_PORTRAITS[0].url
  );
  const [photoCropScale, setPhotoCropScale] = useState<number>(1.0);

  // Category-specific product options
  const isUrn = product.category === 'urns';
  const isJewelry = product.category === 'jewelry';
  const isGarden = product.category === 'garden';
  const isRing = isJewelry && (product.id.includes('ring') || product.title.toLowerCase().includes('ring'));
  const isPendant = isJewelry && !isRing;

  // Selected options
  const [selectedSize, setSelectedSize] = useState<string>(() => {
    if (isUrn) return 'Keepsake Size (3.5 cu in)';
    if (isGarden) return 'Standard 14″ Garden Size';
    if (product.category === 'stationery') return 'Standard 9″ × 11″ Register';
    return 'Standard Size';
  });

  const [selectedFinish, setSelectedFinish] = useState<string>(() => {
    if (isJewelry) return 'Solid Sterling Silver';
    if (isUrn) return 'Satin Brass & Sage Patina';
    if (isGarden) return 'Weathered Natural Limestone';
    return 'Artisanal Natural Finish';
  });

  const [selectedChainLength, setSelectedChainLength] = useState<string>('20″ Heirloom Chain');
  const [selectedRingSize, setSelectedRingSize] = useState<string>('Size 7');

  // Reset when product changes
  useEffect(() => {
    setQuantity(1);
    setLine1(product.defaultHonorific || 'Margaret');
    setLine2(product.defaultDates || '1942 – 2026');
    setLine3(product.defaultMessage || 'Forever Treasured');
    setActiveMode(
      product.allowsEngraving ? 'text' : product.allowsPhotoToken ? 'photo' : 'text'
    );
    if (isUrn) {
      setSelectedSize('Keepsake Size (3.5 cu in)');
      setSelectedFinish('Satin Brass & Sage Patina');
    } else if (isJewelry) {
      setSelectedFinish('Solid Sterling Silver');
      setSelectedChainLength('20″ Heirloom Chain');
      setSelectedRingSize('Size 7');
    } else if (isGarden) {
      setSelectedSize('Standard 14″ Garden Size');
      setSelectedFinish('Weathered Natural Limestone');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id, isUrn, isJewelry, isGarden]);

  const handleToggleSampleName = (sample: string) => {
    setLine1(sample);
  };

  const handleAddToCartClick = () => {
    const personalization: TributePersonalization = {
      deliveryDestination: 'family_residence',
      engravingLine1: product.allowsEngraving ? line1 : undefined,
      engravingLine2: product.allowsEngraving ? line2 : undefined,
      engravingLine3: product.allowsEngraving ? line3 : undefined,
      engravingText: product.allowsEngraving ? `${line1} · ${line2} · ${line3}` : undefined,
      engravingStyle: typestyle,
      photoTokenUrl: product.allowsPhotoToken && activeMode === 'photo' ? selectedPhotoUrl : undefined,
      photoCropScale,
      activeMode,
      selectedSize,
      selectedFinish,
      selectedChainLength: isPendant ? selectedChainLength : undefined,
      selectedRingSize: isRing ? selectedRingSize : undefined,
    };
    onAddToCart(product, personalization, quantity);
  };

  // Complementary pieces
  const complementaryProducts = (product.complementaryIds || [])
    .map((id) => TRIBUTE_PRODUCTS.find((p) => p.id === id))
    .filter((p): p is TributeProduct => p !== undefined)
    .slice(0, 3);

  const finalComplementary =
    complementaryProducts.length > 0
      ? complementaryProducts
      : TRIBUTE_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const warmDescription =
    WARM_DESCRIPTIONS[product.id] ||
    product.description ||
    'A thoughtfully crafted keepsake selected to honor Margaret’s memory and bring comfort to her family.';

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#1B1C19]">
      {/* Top Breadcrumb Navigation */}
      <div className="border-b border-[#E6E1D7] bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs text-[#5D655E]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={onBack}
              className="text-[#343835] hover:text-[#1B1C19] font-medium transition-colors flex items-center gap-1.5 group cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Store</span>
            </button>
            <ChevronRight className="w-3 h-3 text-[#A58A6D]" />
            <span className="capitalize text-[#717A72]">
              {product.categoryLabel.split('·')[0].trim().toLowerCase()}
            </span>
            <ChevronRight className="w-3 h-3 text-[#A58A6D]" />
            <span className="text-[#1B1C19] font-medium truncate max-w-[220px] sm:max-w-md">
              {product.title}
            </span>
          </nav>
          <div className="hidden sm:block text-[11px] text-[#717A72]">
            Margaret Williams Memorial Store
          </div>
        </div>
      </div>

      {/* Main Product Layout: 2-Column Desktop, Stacked Mobile */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: Single Large Product Image with Live Preview */}
          {/* ========================================================= */}
          <div className="lg:col-span-7">
            <div className="relative rounded-[4px] border border-[#E6E1D7] bg-[#F2EFE8] overflow-hidden shadow-sm aspect-square max-h-[600px] flex items-center justify-center group">
              {/* Product Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-[#343835]/85 backdrop-blur-sm text-[#F8F6F1] px-3 py-1 rounded-[2px] text-[10px] font-medium tracking-wider uppercase">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Single Large Product Image */}
              <img
                src={product.imageUrl}
                alt={product.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full transition-transform duration-500 group-hover:scale-[1.01] ${
                  product.imageUrl.includes('.png') || product.id === 'heritage-rose-urn'
                    ? 'object-contain p-6 sm:p-8'
                    : 'object-cover'
                }`}
              />

              {/* LIVE SIMULATED ENGRAVING PREVIEW OVERLAY */}
              {product.allowsEngraving && activeMode === 'text' && (
                <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none p-6 sm:p-10">
                  <div className="bg-[#1A1916]/35 backdrop-blur-[1px] px-6 py-5 rounded-[4px] max-w-[85%] text-center border border-[#A58A6D]/40 shadow-lg">
                    <p
                      className={`text-[#F5E8C7] drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] leading-tight ${
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
                      <p className="mt-1 text-xs sm:text-sm text-[#E2D2AA] font-serif tracking-widest drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                        {line2}
                      </p>
                    )}

                    {line3 && (
                      <p className="mt-1.5 text-xs sm:text-sm text-[#D5C294] font-serif italic drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                        “{line3}”
                      </p>
                    )}

                    <div className="mt-2.5 pt-2 border-t border-[#A58A6D]/30 flex items-center justify-center gap-1 text-[9px] uppercase tracking-widest text-[#E2D2AA]/85">
                      <Sparkles className="w-2.5 h-2.5 text-[#C9A86A]" />
                      <span>Live Inscription Preview</span>
                    </div>
                  </div>
                </div>
              )}

              {/* LIVE PHOTO TOKEN CAMEO OVERLAY */}
              {product.allowsPhotoToken && activeMode === 'photo' && (
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
                      Cameo Preview
                    </div>
                  </div>
                </div>
              )}

              {/* Zoom Button */}
              <button
                type="button"
                onClick={() => setIsZoomOpen(true)}
                className="absolute bottom-4 right-4 z-20 bg-white/90 hover:bg-white text-[#343835] p-2 rounded-[2px] shadow-sm border border-[#E6E1D7] transition-all hover:scale-105 cursor-pointer"
                title="Expand and zoom image"
                aria-label="Expand image"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Info, Product Options, Personalization, Cart */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Title, Warm Description & Price */}
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1B1C19] leading-tight mb-2.5">
                {product.title}
              </h1>

              {/* Short, Warm Product Description (1–2 sentences) */}
              <p className="text-sm text-[#4E564F] leading-relaxed mb-4">
                {warmDescription}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-2.5 pb-4 border-b border-[#E6E1D7]">
                <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#1B1C19] tabular-nums">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>

            {/* PRODUCT OPTIONS / ESSENTIAL SELECTIONS */}
            <div className="space-y-4">
              {/* Urn Size / Capacity Selection */}
              {isUrn && (
                <div>
                  <label className="block text-xs font-semibold text-[#343835] mb-1.5">
                    Select Size & Capacity
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Keepsake Size (3.5 cu in)', sub: 'Ideal for home or family sharing' },
                      { label: 'Full Adult Size (220 cu in)', sub: 'Complete family resting vessel' },
                    ].map((opt) => (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setSelectedSize(opt.label)}
                        className={`p-2.5 text-left rounded-[3px] border transition-all text-xs cursor-pointer ${
                          selectedSize === opt.label
                            ? 'bg-white border-[#343835] ring-1 ring-[#343835] shadow-sm'
                            : 'bg-[#FAF9F6] border-[#DCD6C9] hover:border-[#899588] text-[#5D655E]'
                        }`}
                      >
                        <span className="font-semibold text-[#1B1C19] block">{opt.label}</span>
                        <span className="text-[10px] text-[#717A72] block mt-0.5">{opt.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Metal Finish (Jewelry) */}
              {isJewelry && (
                <div>
                  <label className="block text-xs font-semibold text-[#343835] mb-1.5">
                    Metal Finish
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Solid Sterling Silver', 'Warm Bronze', 'Rose Gold Vermeil'].map((finish) => (
                      <button
                        key={finish}
                        type="button"
                        onClick={() => setSelectedFinish(finish)}
                        className={`py-2 px-2.5 text-center rounded-[3px] border transition-all text-xs cursor-pointer ${
                          selectedFinish === finish
                            ? 'bg-[#343835] text-white border-[#343835] font-medium shadow-sm'
                            : 'bg-[#FAF9F6] border-[#DCD6C9] hover:border-[#899588] text-[#4E564F]'
                        }`}
                      >
                        {finish}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chain Length (Pendants / Lockets) */}
              {isPendant && (
                <div>
                  <label className="block text-xs font-semibold text-[#343835] mb-1.5">
                    Chain Length
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['18″ Chain', '20″ Heirloom Chain', '24″ Long Chain'].map((len) => (
                      <button
                        key={len}
                        type="button"
                        onClick={() => setSelectedChainLength(len)}
                        className={`py-2 px-2.5 text-center rounded-[3px] border transition-all text-xs cursor-pointer ${
                          selectedChainLength === len
                            ? 'bg-[#343835] text-white border-[#343835] font-medium shadow-sm'
                            : 'bg-[#FAF9F6] border-[#DCD6C9] hover:border-[#899588] text-[#4E564F]'
                        }`}
                      >
                        {len}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Ring Size */}
              {isRing && (
                <div>
                  <label className="block text-xs font-semibold text-[#343835] mb-1.5">
                    Ring Size
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {['Size 6', 'Size 7', 'Size 8', 'Size 9', 'Size 10'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedRingSize(size)}
                        className={`py-2 text-center rounded-[3px] border transition-all text-xs cursor-pointer ${
                          selectedRingSize === size
                            ? 'bg-[#343835] text-white border-[#343835] font-semibold'
                            : 'bg-[#FAF9F6] border-[#DCD6C9] hover:border-[#899588] text-[#4E564F]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Garden Stone Finish & Size */}
              {isGarden && (
                <div>
                  <label className="block text-xs font-semibold text-[#343835] mb-1.5">
                    Material & Finish
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Weathered Natural Limestone', 'Polished Botanical Granite'].map((fin) => (
                      <button
                        key={fin}
                        type="button"
                        onClick={() => setSelectedFinish(fin)}
                        className={`p-2 text-left rounded-[3px] border transition-all text-xs cursor-pointer ${
                          selectedFinish === fin
                            ? 'bg-white border-[#343835] ring-1 ring-[#343835] font-medium'
                            : 'bg-[#FAF9F6] border-[#DCD6C9] hover:border-[#899588] text-[#5D655E]'
                        }`}
                      >
                        {fin}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* "MAKE IT PERSONAL" CUSTOMIZATION STUDIO */}
            {(product.allowsEngraving || product.allowsPhotoToken) && (
              <div className="bg-white border border-[#E0DBD0] rounded-[4px] p-5 shadow-sm space-y-4">
                {/* Heading & Subtitle */}
                <div className="pb-3 border-b border-[#EFECE5]">
                  <h2 className="font-serif text-lg font-semibold text-[#1B1C19]">
                    Make It Personal
                  </h2>
                  <p className="text-xs text-[#5D655E] mt-0.5">
                    Add a name, date, or message to make this keepsake your own.
                  </p>
                </div>

                {/* Mode Selector (Text Engraving vs. Photo Cameo) if both allowed */}
                {product.allowsEngraving && product.allowsPhotoToken && (
                  <div className="flex items-center gap-2 p-1 bg-[#F4F1EA] rounded-[3px] text-xs">
                    <button
                      type="button"
                      onClick={() => setActiveMode('text')}
                      className={`flex-1 py-1.5 px-3 rounded-[2px] font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        activeMode === 'text'
                          ? 'bg-white text-[#1B1C19] shadow-sm font-semibold'
                          : 'text-[#5D655E] hover:text-[#1B1C19]'
                      }`}
                    >
                      <PenLine className="w-3.5 h-3.5 text-[#899588]" />
                      <span>Engraved Inscription</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveMode('photo')}
                      className={`flex-1 py-1.5 px-3 rounded-[2px] font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        activeMode === 'photo'
                          ? 'bg-white text-[#1B1C19] shadow-sm font-semibold'
                          : 'text-[#5D655E] hover:text-[#1B1C19]'
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-[#899588]" />
                      <span>Photo Keepsake Cameo</span>
                    </button>
                  </div>
                )}

                {/* TEXT ENGRAVING FIELDS */}
                {activeMode === 'text' && product.allowsEngraving && (
                  <div className="space-y-3.5">
                    {/* Name or Nickname */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-semibold text-[#343835]">
                          Name or Nickname
                        </label>
                        <div className="flex items-center gap-1.5 text-[11px] text-[#7A644D]">
                          <span>Sample:</span>
                          <button
                            type="button"
                            onClick={() => handleToggleSampleName('Margaret')}
                            className="hover:underline font-medium cursor-pointer"
                          >
                            Margaret
                          </button>
                          <span>·</span>
                          <button
                            type="button"
                            onClick={() => handleToggleSampleName('Mama')}
                            className="hover:underline font-medium cursor-pointer"
                          >
                            Mama
                          </button>
                          <span>·</span>
                          <button
                            type="button"
                            onClick={() => handleToggleSampleName('Grandma M')}
                            className="hover:underline font-medium cursor-pointer"
                          >
                            Grandma M
                          </button>
                        </div>
                      </div>
                      <input
                        type="text"
                        maxLength={product.maxEngravingChars || 24}
                        value={line1}
                        onChange={(e) => setLine1(e.target.value)}
                        placeholder="e.g. Margaret or Mama"
                        className="w-full bg-[#FAF9F6] border border-[#DCD6C9] focus:border-[#343835] focus:bg-white text-[#1B1C19] px-3 py-2 rounded-[2px] text-xs focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Dates */}
                    <div>
                      <label className="block text-xs font-semibold text-[#343835] mb-1">
                        Dates
                      </label>
                      <input
                        type="text"
                        maxLength={24}
                        value={line2}
                        onChange={(e) => setLine2(e.target.value)}
                        placeholder="1942 – 2026"
                        className="w-full bg-[#FAF9F6] border border-[#DCD6C9] focus:border-[#343835] focus:bg-white text-[#1B1C19] px-3 py-2 rounded-[2px] text-xs focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Personal Message */}
                    <div>
                      <label className="block text-xs font-semibold text-[#343835] mb-1">
                        Personal Message
                      </label>
                      <input
                        type="text"
                        maxLength={36}
                        value={line3}
                        onChange={(e) => setLine3(e.target.value)}
                        placeholder="e.g. Forever in our hearts"
                        className="w-full bg-[#FAF9F6] border border-[#DCD6C9] focus:border-[#343835] focus:bg-white text-[#1B1C19] px-3 py-2 rounded-[2px] text-xs focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Choose a Font */}
                    <div>
                      <label className="block text-xs font-semibold text-[#343835] mb-1.5">
                        Choose a Font
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setTypestyle('classic_serif')}
                          className={`py-2 px-2 rounded-[2px] text-xs font-serif transition-all border cursor-pointer ${
                            typestyle === 'classic_serif'
                              ? 'bg-[#343835] text-white border-[#343835] shadow-sm'
                              : 'bg-[#FAF9F6] text-[#4E564F] border-[#DCD6C9] hover:border-[#899588]'
                          }`}
                        >
                          Classic Serif
                        </button>
                        <button
                          type="button"
                          onClick={() => setTypestyle('roman_caps')}
                          className={`py-2 px-2 rounded-[2px] text-xs font-serif uppercase tracking-wider transition-all border cursor-pointer ${
                            typestyle === 'roman_caps'
                              ? 'bg-[#343835] text-white border-[#343835] shadow-sm'
                              : 'bg-[#FAF9F6] text-[#4E564F] border-[#DCD6C9] hover:border-[#899588]'
                          }`}
                        >
                          Traditional Roman
                        </button>
                        <button
                          type="button"
                          onClick={() => setTypestyle('italic_calligraphy')}
                          className={`py-2 px-2 rounded-[2px] text-xs font-serif italic transition-all border cursor-pointer ${
                            typestyle === 'italic_calligraphy'
                              ? 'bg-[#343835] text-white border-[#343835] shadow-sm'
                              : 'bg-[#FAF9F6] text-[#4E564F] border-[#DCD6C9] hover:border-[#899588]'
                          }`}
                        >
                          Gentle Script
                        </button>
                      </div>
                    </div>

                    {/* Simple gentle illustration note */}
                    <p className="text-[11px] text-[#717A72] italic pt-1">
                      Preview for illustration. Final appearance may vary.
                    </p>
                  </div>
                )}

                {/* PHOTO TOKEN MODE */}
                {activeMode === 'photo' && product.allowsPhotoToken && (
                  <div className="space-y-3.5">
                    <p className="text-xs text-[#4E564F]">
                      Choose a cherished portrait of Margaret for the cameo inlay:
                    </p>

                    <div className="grid grid-cols-3 gap-2.5">
                      {MARGARET_PORTRAITS.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setSelectedPhotoUrl(p.url)}
                          className={`flex flex-col text-left rounded-[3px] overflow-hidden border p-1 transition-all cursor-pointer ${
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
                          <span className="mt-1 text-[10px] font-medium text-[#1B1C19] truncate">
                            {p.title}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Framing Zoom */}
                    <div>
                      <div className="flex justify-between text-xs text-[#5D655E] mb-1">
                        <span>Portrait Framing Zoom</span>
                        <span>{photoCropScale.toFixed(1)}×</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="2"
                        step="0.1"
                        value={photoCropScale}
                        onChange={(e) => setPhotoCropScale(parseFloat(e.target.value))}
                        className="w-full accent-[#343835] cursor-pointer"
                      />
                    </div>

                    <p className="text-[11px] text-[#717A72] italic pt-1">
                      Preview for illustration. Final appearance may vary.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* PURCHASE CONTROLS: Clean Quantity & "Add to Memorial Basket" */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Clean Quantity Stepper */}
                <div className="flex items-center border border-[#DCD6C9] rounded-[2px] bg-white h-11">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-9 h-full flex items-center justify-center text-[#5D655E] hover:text-[#1B1C19] disabled:opacity-40 transition-colors cursor-pointer"
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
                    className="w-9 h-full flex items-center justify-center text-[#5D655E] hover:text-[#1B1C19] transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <span className="text-base font-medium">+</span>
                  </button>
                </div>

                {/* Primary Action Button */}
                <button
                  type="button"
                  onClick={handleAddToCartClick}
                  className="flex-1 h-11 bg-[#1B1C19] hover:bg-[#343835] text-[#F8F6F1] font-medium text-xs sm:text-sm rounded-[2px] shadow-sm transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>Add to Memorial Basket</span>
                </button>
              </div>

              {/* Reassuring Packaging & Shipping Note */}
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#5D655E] pt-1">
                <Package className="w-3.5 h-3.5 text-[#899588]" />
                <span>Complimentary gift packaging &amp; safe home delivery included.</span>
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
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1B1C19]">
                Complementary Pieces Chosen for Margaret’s Family
              </h2>
            </div>
            <p className="text-xs text-[#5D655E] max-w-md">
              Thoughtfully coordinated pieces so children, grandchildren, and loved ones may each keep a tangible remembrance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {finalComplementary.map((comp) => (
              <div
                key={comp.id}
                className="bg-white border border-[#E6E1D7] rounded-[4px] overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#ECE8DE] relative">
                  <img
                    src={comp.imageUrl}
                    alt={comp.title}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                      comp.imageUrl.includes('.png') || comp.id === 'heritage-rose-urn'
                        ? 'object-contain p-2.5'
                        : 'object-cover'
                    }`}
                  />
                  {comp.badge && (
                    <span className="absolute top-3 right-3 bg-[#343835]/85 backdrop-blur-sm text-[#F8F6F1] px-2 py-0.5 rounded-[2px] text-[9px] font-medium tracking-wider uppercase">
                      {comp.badge}
                    </span>
                  )}
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#828B83] font-semibold block mb-1">
                      {comp.subtitle || comp.categoryLabel.split('·')[0]}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-semibold text-[#1B1C19] mb-1.5 group-hover:text-[#634832] transition-colors">
                      {comp.title}
                    </h3>
                    <p className="text-xs text-[#5D655E] line-clamp-2 leading-relaxed mb-3">
                      {WARM_DESCRIPTIONS[comp.id] || comp.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F0ECE2] flex items-center justify-between mt-auto">
                    <span className="font-serif text-base font-semibold text-[#1B1C19] tabular-nums">
                      ${comp.price.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectProduct(comp)}
                      className="text-xs font-semibold text-[#343835] hover:text-[#1B1C19] flex items-center gap-1 group/btn transition-colors cursor-pointer"
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
        {/* REASSURING FAMILY PROMISES (WARM, NO FUNERAL SERVICE)     */}
        {/* ========================================================= */}
        <section className="mt-12 bg-[#F3F0EA] border border-[#E6E1D7] rounded-[4px] p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-[#899588] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-sm font-semibold text-[#1B1C19] mb-1">
                  Thoughtful Home Delivery
                </h4>
                <p className="text-xs text-[#5D655E] leading-relaxed">
                  Every keepsake is packaged with care in protective presentation boxing and delivered safely to your home address.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#A58A6D] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-sm font-semibold text-[#1B1C19] mb-1">
                  Enduring Craftsmanship Guarantee
                </h4>
                <p className="text-xs text-[#5D655E] leading-relaxed">
                  Selected heirloom materials and precision personalization crafted to stand the test of time across family generations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-[#899588] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-sm font-semibold text-[#1B1C19] mb-1">
                  Compassionate Family Support
                </h4>
                <p className="text-xs text-[#5D655E] leading-relaxed">
                  Questions about inscriptions, sizing, or memorial selection? Our team is available anytime to assist with care.
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
              className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black text-white p-2 rounded-full border border-white/20 transition-colors cursor-pointer"
              aria-label="Close zoom"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-auto max-h-[82vh] object-contain rounded-[2px]"
            />
            <div className="p-3 text-center text-xs text-[#E6E1D7] flex items-center justify-between">
              <span>{product.title}</span>
              <span className="text-[10px] text-[#A58A6D]">Click outside or ✕ to close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
