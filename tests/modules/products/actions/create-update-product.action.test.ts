import { tesloApi } from '@/api/tesloApi';
import { loginAction } from '@/modules/auth/actions';
import { createUpdateProductAction } from '@/modules/products/actions';
import type { Product } from '@/modules/products/interfaces/product.interface';

describe('createUpdateProductAction', () => {
  beforeAll(async () => {
    const resp = await loginAction('test3@google.com', 'Ax1Bz2');
    if (!resp.ok) throw new Error('Failed to login');
    localStorage.setItem('token', resp.token);
  });

  test('should create a new product', async () => {
    const product: Product = {
      id: '',
      title: 'Nuevo producto',
      price: 100,
      description: 'Producto de pruebas',
      slug: 'test_product',
      stock: 10,
      sizes: [],
      gender: 'kid',
      tags: [],
      images: [],
      user: {} as any,
    };

    const resp = await createUpdateProductAction(product);

    await tesloApi.delete(`/products/${resp.id}`);

    expect(resp).toEqual({
      title: 'Nuevo producto',
      price: 100,
      description: 'Producto de pruebas',
      slug: 'test_product',
      stock: 10,
      sizes: [],
      gender: 'kid',
      tags: [],
      images: [],
      user: expect.anything(),
      id: expect.any(String),
    });
  });
});
