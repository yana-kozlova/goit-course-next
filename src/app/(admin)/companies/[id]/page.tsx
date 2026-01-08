import { notFound } from 'next/navigation';
import Header from '@/app/components/header';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;
    const companyId = Number(id);
    
    if (!Number.isInteger(companyId)) {
        notFound();
    }
    
    return <Header>Company ({companyId})</Header>;
}
