import React from 'react';
import { Company, getCompany } from '@/lib/api';
import getQueryClient from '@/lib/utils/getQueryClient';
import Header from '@/app/components/header';

export interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const queryClient = getQueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ['companies', id],
      queryFn: () => getCompany(id, { cache: 'no-store' }),
      staleTime: 10 * 1000,
    });
  } catch (error) {
    // If prefetch fails, return empty header
    console.error('Error prefetching company data:', error);
  }

  const company = queryClient.getQueryData(['companies', id]) as Company;

  return <Header>{company?.title || ''}</Header>;
}
