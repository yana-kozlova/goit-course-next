import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { Category } from '@/lib/api';

export async function GET() {
  try {
    const categories = await sql`
      SELECT id, title
      FROM categories
      ORDER BY title ASC
    `;

    const formattedCategories: Category[] = categories.map((row: any) => ({
      id: row.id,
      title: row.title,
    }));

    return NextResponse.json(formattedCategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 },
    );
  }
}
