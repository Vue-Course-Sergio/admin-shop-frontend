import { getProductByIdAction, getProductsAction } from '@/modules/products/actions';

describe('getProductByIdAction', () => {
  test('should return empty product on create argument', async () => {
    const product = await getProductByIdAction('create');

    expect(product).toEqual({
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
      user: {},
    });
  });

  test('should return a product if id is found', async () => {
    const products = await getProductsAction();
    const product = await getProductByIdAction(products[0].id);

    product.images.sort((a, b) => a.localeCompare(b));
    products.at(0)!.images.sort((a, b) => a.localeCompare(b));

    expect(product).toEqual(products.at(0));
  });

  test('should return empty product if ID is not found', async () => {
    try {
      await getProductByIdAction('abx');
      expect(true).toBeFalsy();
    } catch (error: any) {
      expect(error.message).toBe('Error getting product with id abx');
    }
  });
});
