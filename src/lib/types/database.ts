// Database row types (raw data from database)
export interface CategoryRow {
  id: string;
  title: string;
}

export interface CountryRow {
  id: string;
  title: string;
}

export interface CompanyRow {
  id: string;
  title: string;
  description: string;
  status: string;
  joinedDate: Date;
  categoryId: string;
  categoryTitle: string;
  countryId: string;
  countryTitle: string;
  avatar: string | null;
  hasPromotions: boolean;
}

export interface PromotionRow {
  id: string;
  title: string;
  description: string;
  discount: number | string;
  companyId: string;
  companyTitle: string;
  avatar: string | null;
}

export interface SummaryStatsRow {
  promotions: number | string;
  categories: number | string;
  new_companies: number | string;
  active_companies: number | string;
}

export interface SummarySalesRow {
  id: string;
  companyId: string;
  companyTitle: string;
  sold: number | string;
  income: number | string;
}
