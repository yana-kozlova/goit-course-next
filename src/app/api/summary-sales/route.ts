import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { SummarySales } from '@/lib/api';

export async function GET() {
  try {
    const sales = await sql`
      SELECT 
        ss.id,
        ss.company_id as "companyId",
        c.title as "companyTitle",
        ss.sold,
        ss.income
      FROM summary_sales ss
      JOIN companies c ON ss.company_id = c.id
      ORDER BY ss.income DESC
    `;

    const formattedSales: SummarySales[] = sales.map((row: any) => ({
      id: row.id,
      companyId: row.companyId,
      companyTitle: row.companyTitle,
      sold: Number(row.sold),
      income: Number(row.income),
    }));

    return NextResponse.json(formattedSales);
  } catch (error) {
    console.error('Error fetching summary sales:', error);
    return NextResponse.json(
      { error: 'Failed to fetch summary sales' },
      { status: 500 },
    );
  }
}
