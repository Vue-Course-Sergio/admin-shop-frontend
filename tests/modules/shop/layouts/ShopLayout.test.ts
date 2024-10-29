import ShopLayout from '@/modules/shop/layouts/ShopLayout.vue';
import router from '@/router';
import { shallowMount } from '@vue/test-utils';

describe('<ShopLayout/>', () => {
  test('should render top menu, router view and footer', () => {
    const wrapper = shallowMount(ShopLayout, {
      global: { plugins: [router] },
    });

    expect(wrapper.findComponent({ name: 'top-menu' }).exists()).toBeTruthy();
    expect(wrapper.findComponent({ name: 'router-view' }).exists()).toBeTruthy();
    expect(wrapper.findComponent({ name: 'custom-footer' }).exists()).toBeTruthy();
  });
});
