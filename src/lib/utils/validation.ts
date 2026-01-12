import { CompanyStatus } from '@/lib/api';

export function validateCompanyData(data: any): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
    errors.push('Title is required');
  }

  if (!data.description || typeof data.description !== 'string' || data.description.trim().length === 0) {
    errors.push('Description is required');
  }

  if (!data.status || !Object.values(CompanyStatus).includes(data.status)) {
    errors.push('Valid status is required');
  }

  if (!data.joinedDate || typeof data.joinedDate !== 'string') {
    errors.push('Joined date is required');
  } else {
    const date = new Date(data.joinedDate);
    if (isNaN(date.getTime())) {
      errors.push('Invalid joined date format');
    }
  }

  if (!data.categoryId || typeof data.categoryId !== 'string') {
    errors.push('Category ID is required');
  }

  if (!data.countryId || typeof data.countryId !== 'string') {
    errors.push('Country ID is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validatePromotionData(data: any): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
    errors.push('Title is required');
  }

  if (!data.description || typeof data.description !== 'string' || data.description.trim().length === 0) {
    errors.push('Description is required');
  }

  const discount = Number(data.discount);
  if (isNaN(discount) || discount < 0 || discount > 100) {
    errors.push('Discount must be a number between 0 and 100');
  }

  if (!data.companyId || typeof data.companyId !== 'string') {
    errors.push('Company ID is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
