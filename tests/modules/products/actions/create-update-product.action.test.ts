import { tesloApi } from '@/api/tesloApi';
import { loginAction } from '@/modules/auth/actions';
import { createUpdateProductAction } from '@/modules/products/actions';
import type { Product } from '@/modules/products/interfaces/product.interface';
import fs from 'fs';
import path from 'path';

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

  test('should update a product', async () => {
    const products = await tesloApi.get<Product[]>('/products');
    const product = products.data[0];
    const productId = product.id;

    const updatedProduct = {
      ...product,
      title: 'Updated Product',
      description: 'Updated Description',
      stock: 10,
    };

    const resp = await createUpdateProductAction(updatedProduct);

    expect(resp).toEqual(
      expect.objectContaining({
        ...product,
        id: productId,
        title: 'Updated Product',
        description: 'Updated Description',
        stock: 10,
        user: expect.anything(),
      }),
    );
  });

  test('should upload product image', async () => {
    const imagePath = path.join(__dirname, '../../../fake', 't-shirt.jpg');
    const imageBuffer = fs.readFileSync(imagePath);

    const imageFile: File = new File([imageBuffer], 't-shirt.jpg', { type: 'image/jpeg' });

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
      images: [imageFile] as any,
      user: {} as any,
    };

    const { images, id } = await createUpdateProductAction(product);

    const [img1] = images;
    expect(typeof img1).toBe('string');

    await tesloApi.delete(`/products/${id}`);
  });
});
