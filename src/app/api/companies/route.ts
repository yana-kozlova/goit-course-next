import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { Company, CompanyStatus } from '@/lib/api';

export async function GET(request: NextRequest) {
  try {
    const companies = await sql`
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
      ORDER BY c.created_at DESC
    `;

    const formattedCompanies: Company[] = companies.map((row: any) => ({
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
    }));

    return NextResponse.json(formattedCompanies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch companies' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = await sql`
      INSERT INTO companies (title, description, status, joined_date, category_id, country_id, avatar)
      VALUES (${body.title}, ${body.description}, ${body.status}, ${body.joinedDate}, ${body.categoryId}, ${body.countryId}, ${body.avatar || null})
      RETURNING id
    `;

    const companyId = result[0].id;

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
      WHERE c.id = ${companyId}
    `;

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

    return NextResponse.json(formattedCompany, { status: 201 });
  } catch (error) {
    console.error('Error creating company:', error);
    return NextResponse.json(
      { error: 'Failed to create company' },
      { status: 500 },
    );
  }
}
