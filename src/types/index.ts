export type HalalStatus = 'certified' | 'claimed' | 'pork_free' | 'alcohol_free' | 'unknown';

export type Feature =
  | 'prayer_space'
  | 'wudu'
  | 'family_seating'
  | 'delivery'
  | 'takeaway'
  | 'wheelchair'
  | 'vegetarian'
  | 'vegan';

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  city: string;
  address: string;
  lat?: string;
  lng?: string;
  phone?: string;
  website?: string;
  coverImageUrl: string;
  galleryImageUrls: string[];
  cuisines: string[];
  halalStatus: HalalStatus;
  certificationBody?: string;
  priceLevel: number;
  rating: number;
  reviewCount: number;
  openingHours: string;
  features: Feature[];
  isFeatured: boolean;
  isActive: boolean;
  lastUpdated: string;
}

export interface City {
  city: string;
  country?: string;
  isPopular: boolean;
}

export interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  brandName: string;
  accentStyle?: string;
  featuredSectionTitle: string;
}

export interface FilterConfig {
  key: string;
  label: string;
  type: 'chip' | 'checkbox' | 'range' | 'select';
  options: string[];
  enabled: boolean;
  sortOrder: number;
}

export interface AppData {
  restaurants: Restaurant[];
  cities: City[];
  siteSettings: SiteSettings;
  filtersConfig: FilterConfig[];
}

export interface FilterState {
  search: string;
  city: string;
  cuisines: string[];
  halalStatus: HalalStatus[];
  features: Feature[];
  priceLevel: number[];
  minRating: number;
  sort: 'rating' | 'reviews' | 'featured' | 'newest';
}
