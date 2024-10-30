import ProductView from '@/modules/admin/views/ProductView.vue';
import { shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory, useRouter } from 'vue-router';
import { useMutation, useQuery } from '@tanstack/vue-query';
import type { Mock } from 'vitest';
import { ref } from 'vue';
import { fakeProducts } from '../../../fake/products.fake';

vi.mock('@tanstack/vue-query');
vi.mock('vue-router', async (original) => {
  const originalImpl = await original();
  return {
    ...(originalImpl as any),
    useRouter: vi.fn(),
  };
});

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: ProductView,
    },
  ],
});

describe('<ProductView/>', () => {
  const fakeProduct = fakeProducts.at(0)!;
  const mutateSpy = vi.fn();
  const replaceSpy = vi.fn();

  (useRouter as Mock).mockReturnValue({
    replace: replaceSpy,
  });

  (useMutation as Mock).mockReturnValue({
    mutate: mutateSpy,
    isPending: ref(false),
    isSuccess: ref(false),
    data: ref(fakeProduct),
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should redirect to products if id not found', () => {
    (useQuery as Mock).mockReturnValue({
      data: ref({}),
      isError: ref(true),
      isLoading: ref(false),
      refetch: vi.fn(),
    });

    shallowMount(ProductView, {
      props: {
        productId: 'XXXXX',
      },
      global: {
        plugins: [router],
      },
    });

    expect(replaceSpy).toHaveBeenCalledWith({
      name: 'admin-products',
    });
  });

  test('should render page with a product', () => {
    (useQuery as Mock).mockReturnValue({
      data: ref(fakeProduct),
      isError: ref(false),
      isLoading: ref(false),
      refetch: vi.fn(),
    });

    const wrapper = shallowMount(ProductView, {
      props: {
        productId: 'ABC123',
      },
      global: {
        plugins: [router],
      },
    });

    const customInputs = wrapper.findAllComponents({ name: 'CustomInput' });
    const customTextArea = wrapper.findAllComponents({ name: 'CustomTextArea' });
    const sizedButtons = wrapper.findAll('button.flex-1');

    const productValues = Object.values(fakeProduct);

    expect(customInputs.length).toBe(4);
    customInputs.forEach((input) => {
      const modelValue = input.props('modelValue');
      expect(productValues).toContain(modelValue);
    });

    customTextArea.forEach((textArea) => {
      const modelValue = textArea.props('modelValue');
      expect(productValues).toContain(modelValue);
    });

    sizedButtons.forEach((button) => {
      if (fakeProduct.sizes.includes(button.text())) {
        expect(button.classes()).toContain('bg-blue-500');
      } else {
        expect(button.classes()).toContain('bg-blue-100');
      }
    });
  });

  test('should submit a form if data is valid', async () => {
    (useQuery as Mock).mockReturnValue({
      data: ref(fakeProduct),
      isError: ref(false),
      isLoading: ref(false),
      refetch: vi.fn(),
    });

    const wrapper = shallowMount(ProductView, {
      props: {
        productId: 'ABC123',
      },
      global: {
        plugins: [router],
      },
    });

    const form = wrapper.find('form');
    await form.trigger('submit');

    await new Promise((r) => setTimeout(r, 100));

    expect(mutateSpy).toHaveBeenCalled();
    expect(mutateSpy).toHaveBeenCalledWith(fakeProduct);
  });

  test('should not submit a form if data is not valid', async () => {
    (useQuery as Mock).mockReturnValue({
      data: ref(fakeProduct),
      isError: ref(false),
      isLoading: ref(false),
      refetch: vi.fn(),
    });

    const wrapper = shallowMount(ProductView, {
      props: {
        productId: 'ABC123',
      },
      global: {
        plugins: [router],
      },
    });

    const titleInput = wrapper.findComponent({ name: 'CustomInput' });
    titleInput.vm.$emit('update:modelValue', '');

    const form = wrapper.find('form');
    await form.trigger('submit');

    await new Promise((r) => setTimeout(r, 100));

    expect(mutateSpy).not.toHaveBeenCalled();
  });
});
