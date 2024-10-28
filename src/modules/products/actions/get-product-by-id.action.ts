import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/product.interface';
import { getProductImageAction } from './get-product-image.action';

export const getProductByIdAction = async (productId: string): Promise<Product> => {
  try {
    const { data } = await tesloApi.get<Product>(`/products/${productId}`);

    data.images = data.images.map(getProductImageAction);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Error getting product with id ${productId}`);
  }
};
