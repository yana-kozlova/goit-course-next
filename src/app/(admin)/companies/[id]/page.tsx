import React from 'react';
import { notFound } from 'next/navigation';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Company, CompanyStatus, getPromotions } from '@/lib/api';
import { sql } from '@/lib/db';
import getQueryClient from '@/lib/utils/getQueryClient';
import CompanyInfo from '@/app/components/company-info';
import CompanyPromotions from '@/app/components/company-promotions';

export interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const queryClient = getQueryClient();

  try {
    // Fetch company directly from database in server component
    const companyResult = await sql`
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

    if (companyResult.length === 0) {
      notFound();
    }

    const row = companyResult[0];
    const company: Company = {
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

    // Set data in query client for hydration
    queryClient.setQueryData(['companies', id], company);

    // Prefetch promotions
    await queryClient.prefetchQuery({
      queryKey: ['promotions', id],
      queryFn: () =>
        getPromotions({ companyId: id }, { cache: 'no-store' }),
      staleTime: 10 * 1000,
    });
  } catch (error) {
    console.error('Error fetching company data:', error);
    notFound();
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="py-6 px-10 grid grid-cols-12 gap-5">
        <div className="col-span-3">
          <CompanyInfo companyId={id} />
        </div>
        <div className="col-span-9">
          <CompanyPromotions companyId={id} />
        </div>
      </div>
    </HydrationBoundary>
  );
}
