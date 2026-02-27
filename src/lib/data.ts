import { AppData, Restaurant, City, SiteSettings, FilterConfig, HalalStatus, Feature } from '@/types';
import sampleData from './sample-data.json';

// Base URL of the published sheet — set GOOGLE_SHEET_URL to the "restaurants" tab CSV URL
// e.g. https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?gid=0&single=true&output=csv
const SHEET_URL = process.env.GOOGLE_SHEET_URL || '';

// ─── CSV parser ────────────────────────────────────────────────────────────────
// Handles quoted fields (which may contain commas)
function parseCSV(text: string): Record<string, string>[] {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = splitCSVLine(lines[0]);
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = splitCSVLine(lines[i]);
    if (values.every((v) => v === '')) continue; // skip blank rows
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h.trim().replace(/^"|"$/g, '')] = (values[idx] ?? '').trim().replace(/^"|"$/g, '');
    });
    rows.push(row);
  }
  return rows;
}

function splitCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

// ─── Build a tab URL from the base restaurants URL ────────────────────────────
// Given:  .../pub?gid=0&single=true&output=csv
// Cities: .../pub?gid=CITIES_GID&single=true&output=csv
// We derive sibling-tab URLs by replacing/appending gid param.
// BUT: the easiest approach is to use separate env vars per tab, OR
// use the gviz JSON endpoint which returns the whole sheet in one call.

function getTabUrl(baseUrl: string, tabName: string): string {
  // Try gviz approach: replace output format
  // Convert "pub?...&output=csv" → gviz/tq?tqx=out:csv&sheet=TABNAME
  const match = baseUrl.match(/spreadsheets\/d\/e\/([^/]+)\/pub/);
  if (match) {
    // Reconstructed gviz URL — does NOT need "Publish to web", just needs sharing set to "Anyone with link can view"
    // This is the most reliable approach
    const docId = match[1];
    return `https://docs.google.com/spreadsheets/d/e/${docId}/pub?single=true&output=csv&gid=${tabName}`;
  }
  return baseUrl;
}

// ─── Build a per-tab URL from whatever format the user provides ───────────────
function buildGvizUrl(sheetUrl: string, tabName: string): string {
  // Case 1: "Publicera till webben" export URL
  // e.g. https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?gid=0&single=true&output=csv
  if (sheetUrl.includes('/d/e/') && sheetUrl.includes('/pub')) {
    const base = sheetUrl.split('?')[0]; // strip all query params
    return `${base}?single=true&output=csv&sheet=${encodeURIComponent(tabName)}`;
  }

  // Case 2: Regular share/edit URL
  // e.g. https://docs.google.com/spreadsheets/d/1SQ3iO-.../edit
  const rawMatch = sheetUrl.match(/\/spreadsheets\/d\/([^/?#]+)/);
  if (rawMatch) {
    return `https://docs.google.com/spreadsheets/d/${rawMatch[1]}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}`;
  }

  return sheetUrl;
}

async function fetchTab(sheetUrl: string, tabName: string): Promise<Record<string, string>[]> {
  const url = buildGvizUrl(sheetUrl, tabName);
  console.log(`Fetching tab "${tabName}" from: ${url}`);
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch tab "${tabName}": ${res.status}`);
  const text = await res.text();
  return parseCSV(text);
}

// ─── Row parsers ──────────────────────────────────────────────────────────────

function parseRestaurant(row: Record<string, string>): Restaurant {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    city: row.city,
    address: row.address,
    lat: row.lat,
    lng: row.lng,
    phone: row.phone,
    website: row.website,
    coverImageUrl: row.coverImageUrl,
    galleryImageUrls: row.galleryImageUrls
      ? row.galleryImageUrls.split(',').map((s) => s.trim()).filter(Boolean)
      : [],
    cuisines: row.cuisines ? row.cuisines.split(',').map((s) => s.trim()).filter(Boolean) : [],
    halalStatus: (row.halalStatus as HalalStatus) || 'unknown',
    certificationBody: row.certificationBody,
    priceLevel: parseInt(row.priceLevel) || 2,
    rating: parseFloat(row.rating) || 0,
    reviewCount: parseInt(row.reviewCount) || 0,
    openingHours: row.openingHours,
    features: row.features
      ? (row.features.split(',').map((s) => s.trim()).filter(Boolean) as Feature[])
      : [],
    isFeatured: row.isFeatured?.toLowerCase() === 'true',
    isActive: row.isActive?.toLowerCase() !== 'false',
    lastUpdated: row.lastUpdated,
  };
}

function parseSiteSettings(rows: Record<string, string>[]): SiteSettings {
  // Support two layouts:
  // Layout A: single data row, headers are the keys
  //   heroTitle | heroSubtitle | brandName | ...
  //   Hello     | Sub          | HF        | ...
  // Layout B: key/value pairs
  //   key        | value
  //   heroTitle  | Hello
  if (rows.length === 0) return sampleData.siteSettings as SiteSettings;
  if ('key' in rows[0]) {
    const map: Record<string, string> = {};
    rows.forEach((r) => { if (r.key) map[r.key] = r.value ?? ''; });
    return map as unknown as SiteSettings;
  }
  return rows[0] as unknown as SiteSettings;
}

function getSampleData(): AppData {
  return {
    restaurants: (sampleData.restaurants as Record<string, string>[]).map(parseRestaurant),
    cities: sampleData.cities.map((c) => ({
      city: c.city,
      country: c.country,
      isPopular: c.isPopular === 'true',
    })) as City[],
    siteSettings: sampleData.siteSettings as SiteSettings,
    filtersConfig: sampleData.filtersConfig.map((f) => ({
      ...f,
      options: f.options ? f.options.split(',').map((s: string) => s.trim()) : [],
      enabled: f.enabled === 'true',
      sortOrder: parseInt(f.sortOrder),
    })) as FilterConfig[],
  };
}

// ─── Main fetch ───────────────────────────────────────────────────────────────

export async function fetchAppData(): Promise<AppData> {
  if (!SHEET_URL) {
    return getSampleData();
  }

  try {
    const [restaurantRows, cityRows, settingsRows, filterRows] = await Promise.all([
      fetchTab(SHEET_URL, 'restaurants'),
      fetchTab(SHEET_URL, 'cities').catch(() => []),
      fetchTab(SHEET_URL, 'site_settings').catch(() => []),
      fetchTab(SHEET_URL, 'filters_config').catch(() => []),
    ]);

    const restaurants = restaurantRows.map(parseRestaurant);

    const cities: City[] = cityRows.length > 0
      ? cityRows.map((r) => ({
          city: r.city,
          country: r.country,
          isPopular: r.isPopular === 'true',
        }))
      : getSampleData().cities;

    const siteSettings = parseSiteSettings(settingsRows) || getSampleData().siteSettings;

    const filtersConfig: FilterConfig[] = filterRows.length > 0
      ? filterRows.map((r) => ({
          key: r.key,
          label: r.label,
          type: r.type as FilterConfig['type'],
          options: r.options ? r.options.split(',').map((s) => s.trim()) : [],
          enabled: r.enabled !== 'false',
          sortOrder: parseInt(r.sortOrder) || 0,
        }))
      : getSampleData().filtersConfig;

    console.log(`Loaded ${restaurants.length} restaurants from Google Sheets`);
    return { restaurants, cities, siteSettings, filtersConfig };

  } catch (err) {
    console.warn('Failed to fetch from Google Sheets, using sample data. Error:', err);
    return getSampleData();
  }
}

export function filterRestaurants(
  restaurants: Restaurant[],
  filters: {
    search?: string;
    city?: string;
    cuisines?: string[];
    halalStatus?: HalalStatus[];
    features?: Feature[];
    priceLevel?: number[];
    minRating?: number;
  }
): Restaurant[] {
  return restaurants.filter((r) => {
    if (!r.isActive) return false;

    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (
        !r.name.toLowerCase().includes(q) &&
        !r.city.toLowerCase().includes(q) &&
        !r.cuisines.some((c) => c.toLowerCase().includes(q))
      )
        return false;
    }

    if (filters.city && r.city !== filters.city) return false;

    if (filters.cuisines?.length) {
      if (!filters.cuisines.some((c) => r.cuisines.includes(c))) return false;
    }

    if (filters.halalStatus?.length) {
      if (!filters.halalStatus.includes(r.halalStatus)) return false;
    }

    if (filters.features?.length) {
      if (!filters.features.every((f) => r.features.includes(f))) return false;
    }

    if (filters.priceLevel?.length) {
      if (!filters.priceLevel.includes(r.priceLevel)) return false;
    }

    if (filters.minRating && r.rating < filters.minRating) return false;

    return true;
  });
}

export function sortRestaurants(
  restaurants: Restaurant[],
  sort: 'rating' | 'reviews' | 'featured' | 'newest'
): Restaurant[] {
  return [...restaurants].sort((a, b) => {
    switch (sort) {
      case 'rating':
        return b.rating - a.rating || b.reviewCount - a.reviewCount;
      case 'reviews':
        return b.reviewCount - a.reviewCount;
      case 'featured':
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.rating - a.rating;
      case 'newest':
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      default:
        return 0;
    }
  });
}