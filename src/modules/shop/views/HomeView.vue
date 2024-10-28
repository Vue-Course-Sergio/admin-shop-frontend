<template>
  <!-- Title -->
  <div class="pt-32 bg-white">
    <h1 class="text-center text-2xl font-bold text-gray-800">All Products</h1>
  </div>

  <!-- Tab Menu -->
  <div
    class="flex flex-wrap items-center overflow-x-auto overflow-y-hidden py-10 justify-center bg-white text-gray-800"
  >
    <!-- TODO: Filtrar por gender -->

    <!-- <a
      rel="noopener noreferrer"
      href="#"
      class="flex items-center flex-shrink-0 px-5 py-3 space-x-2text-gray-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
      <span>Architecto</span>
    </a> -->
  </div>

  <div v-if="!products" class="text-center h-[500px]">
    <h2 class="text-xl mb-5">Cargando productos</h2>
    <span class="loading loading-spinner loading-lg"></span>
  </div>

  <!-- Product List -->
  <ProductList v-else :products="products" />

  <PaginationButton :has-more-data="!!products && products.length < 10" :page="page" />
</template>

<script lang="ts" setup>
import PaginationButton from '@/modules/common/components/PaginationButton.vue';
import { usePagination } from '@/modules/common/composables/usePagination';
import { getProductsAction } from '@/modules/products/actions';
import ProductList from '@/modules/products/components/ProductList.vue';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { watchEffect } from 'vue';

const queryClient = useQueryClient();
const { page } = usePagination();

const { data: products } = useQuery({
  queryKey: ['products', { page: page }],
  queryFn: () => getProductsAction(page.value, 12),
  staleTime: 1000 * 60,
});

watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['products', { page: page.value + 1 }],
    queryFn: () => getProductsAction(page.value + 1, 12),
  });
});
</script>
