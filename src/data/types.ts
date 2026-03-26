// Shared types for contractor site data

export interface ContractorInfo {
  business_name: string;
  owner_name: string;
  phone: string;
  phoneRaw: string;
  email: string;
  trade: string;
  slug: string;
  years_in_business: number;
  service_areas: string[];
  google_reviews_link: string;
  warranty_text: string;
  license_number: string;
  business_hours: string;
  voicePhone?: string;
  voicePhoneRaw?: string;
  hasVoiceAI?: boolean;
  noindex?: boolean;
  logoUrl?: string;
}

export interface Service {
  name: string;
  desc: string;
  price: string;
  priceDetail?: string;
  image: string;
  longDesc: string;
  faqs: { q: string; a: string }[];
}

export interface Review {
  text: string;
  name: string;
  location: string;
  service: string;
}

export interface StatCard {
  target: number;
  suffix: string;
  label: string;
  decimal?: boolean;
}

export interface Badge {
  src: string;
  alt: string;
}

export interface BeforeAfterPair {
  before: string;
  after: string;
  title: string;
  location: string;
}

export interface GalleryProject {
  id: number;
  title: string;
  category: string;
  location: string;
  image: string;
  cost?: string;
  timeline?: string;
}

export interface ContractorSiteData {
  contractor: ContractorInfo;
  services: Service[];
  reviews: Review[];
  stats: { years: number; projects: number; rating: number; satisfaction: number };
  statCards: StatCard[];
  heroImage: string;
  crewImage: string;
  processImages: string[];
  beforeAfterPairs: BeforeAfterPair[];
  galleryProjects: GalleryProject[];
  badges: Badge[];
}
