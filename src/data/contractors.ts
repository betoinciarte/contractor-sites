// Contractor data registry — maps slug to site data
// Each contractor data file must export the same shape

import type { ContractorSiteData } from './types';
import * as rodriguez from './demo-v2';
import * as cross from './demo-cross';

const registry: Record<string, ContractorSiteData> = {
  'rodriguez-concrete': rodriguez as unknown as ContractorSiteData,
  'cross-construction': cross as unknown as ContractorSiteData,
};

export function getContractor(slug: string): ContractorSiteData | null {
  return registry[slug] || null;
}
