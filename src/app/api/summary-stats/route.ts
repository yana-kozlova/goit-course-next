import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { SummaryStats } from '@/lib/api';

export async function GET() {
  try {
    const stats = await sql`
      SELECT 
        (SELECT COUNT(*) FROM promotions) as promotions,
        (SELECT COUNT(*) FROM categories) as categories,
        (SELECT COUNT(*) FROM companies WHERE joined_date >= CURRENT_DATE - INTERVAL '30 days') as new_companies,
        (SELECT COUNT(*) FROM companies WHERE status = 'active') as active_companies
    `;

    const row = stats[0];
    const summaryStats: SummaryStats = {
      promotions: Number(row.promotions),
      categories: Number(row.categories),
      newCompanies: Number(row.new_companies),
      activeCompanies: Number(row.active_companies),
    };

    return NextResponse.json(summaryStats);
  } catch (error) {
    console.error('Error fetching summary stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch summary stats' },
      { status: 500 },
    );
  }
}
