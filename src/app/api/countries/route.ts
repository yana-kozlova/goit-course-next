import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { Country } from '@/lib/api';

export async function GET() {
  try {
    const countries = await sql`
      SELECT id, title
      FROM countries
      ORDER BY title ASC
    `;

    const formattedCountries: Country[] = countries.map((row: any) => ({
      id: row.id,
      title: row.title,
    }));

    return NextResponse.json(formattedCountries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch countries' },
      { status: 500 },
    );
  }
}
