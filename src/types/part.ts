export interface Part {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  aisle: string;
  side: string;
  level: string;
  description?: string;
  category?: string;
  price?: number;
  supplier?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PartSearchParams {
  name?: string;
  sku?: string;
  aisle?: string;
  side?: string;
  level?: string;
  category?: string;
}

export interface PartCreateInput {
  name: string;
  sku: string;
  quantity: number;
  aisle: string;
  side: string;
  level: string;
  description?: string;
  category?: string;
  price?: number;
  supplier?: string;
}

export interface PartUpdateInput extends Partial<PartCreateInput> {
  id: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  message: string;
  status: number;
  details?: any;
}