export type ProductCategory = 'all' | 'floral' | 'urns' | 'keepsakes' | 'stationery' | 'comfort' | 'jewelry' | 'garden';

export type RelationshipCategory = 'children' | 'grandchildren' | 'spouse' | 'friends';

export interface TributeProduct {
  id: string;
  title: string;
  category: 'floral' | 'urns' | 'keepsakes' | 'stationery' | 'comfort' | 'jewelry' | 'garden';
  categoryLabel: string;
  badge?: string;
  subtitle?: string;
  price: number;
  priceLabel?: string;
  dimensions: string;
  materials: string;
  craftNotes: string;
  description: string;
  careInstructions?: string;
  whySelected?: string;
  bulletPoints?: string[];
  note?: string;
  imageUrl: string;
  secondaryImages?: string[];
  archImage?: boolean;
  coordinatedService: boolean;
  allowsEngraving: boolean;
  maxEngravingChars?: number;
  allowsRibbon?: boolean;
  defaultRibbon?: string;
  popularForService?: boolean;
  relationships?: RelationshipCategory[];
  tributeRef?: string;
  capacity?: string;
  sealType?: string;
  galleryThumbnails?: { label: string; url: string; angle: string }[];
  complementaryIds?: string[];
  allowsPhotoToken?: boolean;
  defaultHonorific?: string;
  defaultDates?: string;
  defaultMessage?: string;
}

export interface TributePersonalization {
  deliveryDestination: 'willow_and_pine' | 'family_residence';
  customAddress?: string;
  engravingText?: string;
  engravingLine1?: string;
  engravingLine2?: string;
  engravingLine3?: string;
  engravingStyle?: 'classic_serif' | 'italic_calligraphy' | 'roman_caps';
  photoTokenUrl?: string;
  photoCropScale?: number;
  activeMode?: 'text' | 'photo';
  selectedSize?: string;
  selectedFinish?: string;
  selectedChainLength?: string;
  selectedRingSize?: string;
  ribbonColor?: 'Muted Sage' | 'Warm Sand' | 'Alabaster Silk';
  botanicalSprig?: 'Olive Branch' | 'Wild Pine' | 'Lavender Sprig';
  cardRecipient?: string;
  cardMessage?: string;
  cardSignature?: string;
  cardTheme?: 'Letterpress Ivy' | 'Serene Alabaster' | 'Gold Foil Script';
}

export interface CartItem {
  cartItemId: string;
  product: TributeProduct;
  quantity: number;
  personalization: TributePersonalization;
}

export interface MemoryEntry {
  id: string;
  authorName: string;
  relationship: string;
  date: string;
  message: string;
  botanicalBadge: string;
  candleLit: boolean;
}
