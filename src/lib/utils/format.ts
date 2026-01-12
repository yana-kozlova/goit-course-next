import { Company, CompanyStatus, Promotion, SummaryStats, SummarySales } from '@/lib/api';
import {
  CompanyRow,
  PromotionRow,
  SummaryStatsRow,
  SummarySalesRow,
} from '@/lib/types/database';

export function formatCompany(row: CompanyRow): Company {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    status: row.status as CompanyStatus,
    joinedDate: row.joinedDate instanceof Date
      ? row.joinedDate.toISOString().split('T')[0]
      : row.joinedDate,
    hasPromotions: row.hasPromotions,
    categoryId: row.categoryId,
    categoryTitle: row.categoryTitle,
    countryId: row.countryId,
    countryTitle: row.countryTitle,
    avatar: row.avatar || undefined,
  };
}

export function formatPromotion(row: PromotionRow): Promotion {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    discount: Number(row.discount),
    companyId: row.companyId,
    companyTitle: row.companyTitle,
    avatar: row.avatar || undefined,
  };
}

export function formatSummaryStats(row: SummaryStatsRow): SummaryStats {
  return {
    promotions: Number(row.promotions),
    categories: Number(row.categories),
    newCompanies: Number(row.new_companies),
    activeCompanies: Number(row.active_companies),
  };
}

export function formatSummarySales(row: SummarySalesRow): SummarySales {
  return {
    id: row.id,
    companyId: row.companyId,
    companyTitle: row.companyTitle,
    sold: Number(row.sold),
    income: Number(row.income),
  };
}
