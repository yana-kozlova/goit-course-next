import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { Company, CompanyStatus } from '@/lib/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      console.error('Invalid UUID format:', id);
      return NextResponse.json({ error: 'Invalid company ID format' }, { status: 400 });
    }

    console.log('Fetching company with ID:', id);

    const company = await sql`
      SELECT 
        c.id,
        c.title,
        c.description,
        c.status,
        c.joined_date as "joinedDate",
        c.category_id as "categoryId",
        cat.title as "categoryTitle",
        c.country_id as "countryId",
        co.title as "countryTitle",
        c.avatar,
        EXISTS(
          SELECT 1 FROM promotions p WHERE p.company_id = c.id
        ) as "hasPromotions"
      FROM companies c
      JOIN categories cat ON c.category_id = cat.id
      JOIN countries co ON c.country_id = co.id
      WHERE c.id = ${id}
    `;

    console.log('Company query result:', company.length, 'rows found');

    if (company.length === 0) {
      console.error('Company not found for ID:', id);
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    const row = company[0];
    const formattedCompany: Company = {
      id: row.id,
      title: row.title,
      description: row.description,
      status: row.status as CompanyStatus,
      joinedDate: row.joinedDate.toISOString().split('T')[0],
      hasPromotions: row.hasPromotions,
      categoryId: row.categoryId,
      categoryTitle: row.categoryTitle,
      countryId: row.countryId,
      countryTitle: row.countryTitle,
      avatar: row.avatar || undefined,
    };

    return NextResponse.json(formattedCompany);
  } catch (error) {
    console.error('Error fetching company:', error);
    return NextResponse.json(
      { error: 'Failed to fetch company' },
      { status: 500 },
    );
  }
}
