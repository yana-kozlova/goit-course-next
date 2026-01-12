import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { Promotion } from '@/lib/api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('companyId');

    let promotions;
    if (companyId) {
      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(companyId)) {
        return NextResponse.json(
          { error: 'Invalid company ID format' },
          { status: 400 },
        );
      }

      promotions = await sql`
        SELECT 
          p.id,
          p.title,
          p.description,
          p.discount,
          p.company_id as "companyId",
          c.title as "companyTitle",
          p.avatar
        FROM promotions p
        JOIN companies c ON p.company_id = c.id
        WHERE p.company_id = ${companyId}
        ORDER BY p.created_at DESC
      `;
    } else {
      promotions = await sql`
        SELECT 
          p.id,
          p.title,
          p.description,
          p.discount,
          p.company_id as "companyId",
          c.title as "companyTitle",
          p.avatar
        FROM promotions p
        JOIN companies c ON p.company_id = c.id
        ORDER BY p.created_at DESC
      `;
    }

    const formattedPromotions: Promotion[] = promotions.map((row: any) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      discount: Number(row.discount),
      companyId: row.companyId,
      companyTitle: row.companyTitle,
      avatar: row.avatar || undefined,
    }));

    return NextResponse.json(formattedPromotions);
  } catch (error) {
    console.error('Error fetching promotions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch promotions' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = await sql`
      INSERT INTO promotions (title, description, discount, company_id, avatar)
      VALUES (${body.title}, ${body.description}, ${body.discount}, ${body.companyId}, ${body.avatar || null})
      RETURNING id
    `;

    const promotionId = result[0].id;

    const promotion = await sql`
      SELECT 
        p.id,
        p.title,
        p.description,
        p.discount,
        p.company_id as "companyId",
        c.title as "companyTitle",
        p.avatar
      FROM promotions p
      JOIN companies c ON p.company_id = c.id
      WHERE p.id = ${promotionId}
    `;

    const row = promotion[0];
    const formattedPromotion: Promotion = {
      id: row.id,
      title: row.title,
      description: row.description,
      discount: Number(row.discount),
      companyId: row.companyId,
      companyTitle: row.companyTitle,
      avatar: row.avatar || undefined,
    };

    return NextResponse.json(formattedPromotion, { status: 201 });
  } catch (error) {
    console.error('Error creating promotion:', error);
    return NextResponse.json(
      { error: 'Failed to create promotion' },
      { status: 500 },
    );
  }
}
