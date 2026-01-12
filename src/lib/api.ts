export interface SummaryStats {
  promotions: number;
  categories: number;
  newCompanies: number;
  activeCompanies: number;
}

export interface SummarySales {
  id: string;
  companyId: string;
  companyTitle: string;
  sold: number;
  income: number;
}

export interface Country {
  id: string;
  title: string;
}

export interface Category {
  id: string;
  title: string;
}

export enum CompanyStatus {
  Active = 'active',
  NotActive = 'notActive',
  Pending = 'pending',
  Suspended = 'suspended',
}

export interface Company {
  id: string;
  title: string;
  description: string;
  status: CompanyStatus;
  joinedDate: string;
  hasPromotions: boolean;
  categoryId: string;
  categoryTitle: string;
  countryId: string;
  countryTitle: string;
  avatar?: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  companyId: string;
  companyTitle: string;
  avatar?: string;
}

// Helper to get base URL for server-side requests
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side: use relative URL
    return '';
  }
  // Server-side: use absolute URL
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
};

const sendRequest = async <T>(url: string, init?: RequestInit) => {
  const baseUrl = getBaseUrl();
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  
  const res = await fetch(fullUrl, init);
  if (!res.ok) {
    const errorText = await res.text();
    // If it's a 404, throw a more specific error
    if (res.status === 404) {
      const error = new Error('Not found') as Error & { status?: number };
      error.status = 404;
      throw error;
    }
    throw new Error(errorText || `Request failed with status ${res.status}`);
  }

  return (await res.json()) as T;
};

export const getSummaryStats = (init?: RequestInit) => {
  return sendRequest<SummaryStats>('/api/summary-stats', init);
};

export const getSummarySales = (init?: RequestInit) => {
  return sendRequest<SummarySales[]>('/api/summary-sales', init);
};

export const getCountries = (init?: RequestInit) => {
  return sendRequest<Country[]>('/api/countries', init);
};

export const getCategories = (init?: RequestInit) => {
  return sendRequest<Category[]>('/api/categories', init);
};

export const getCompanies = (init?: RequestInit) => {
  return sendRequest<Company[]>('/api/companies', init);
};

export const getCompany = (id: string, init?: RequestInit) => {
  return sendRequest<Company>(`/api/companies/${id}`, init);
};

export const getPromotions = async (
  params: Record<string, string> = {},
  init?: RequestInit,
) => {
  const queryParams = new URLSearchParams(params).toString();
  const url = queryParams
    ? `/api/promotions?${queryParams}`
    : '/api/promotions';
  return sendRequest<Promotion[]>(url, init);
};

export const createCompany = async (
  data: Omit<Company, 'id' | 'hasPromotions'>,
): Promise<Company> => {
  const res = await fetch('/api/companies', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to create company');
  }

  return res.json();
};

export const createPromotion = async (
  data: Omit<Promotion, 'id'>,
): Promise<Promotion> => {
  const res = await fetch('/api/promotions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to create promotion');
  }

  return res.json();
};
