import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/product.interface';
import { getProductImageAction } from './get-product-image.action';
import type { User } from '@/modules/auth/interfaces/user.interface';

export const getProductByIdAction = async (productId: string): Promise<Product> => {
  if (productId === 'create') {
    return {
      id: '',
      title: '',
      slug: '',
      description: '',
      price: 0,
      stock: 0,
      images: [],
      tags: [],
      sizes: [],
      gender: '',
      user: {} as User,
    };
  }

  try {
    const { data } = await tesloApi.get<Product>(`/products/${productId}`);

    data.images = data.images.map(getProductImageAction);

    return data;
  } catch (error) {
    throw new Error(`Error getting product with id ${productId}`);
  }
};
