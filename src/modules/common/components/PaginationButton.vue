<template>
  <div class="flex justify-center py-10 bg-gray-100 space-x-3">
    <button
      class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 bg-blue-500 text-white disabled:bg-gray-300 hover:bg-blue-600 transition-all"
    >
      <ArrowLeft />
      <span>Anteriores</span>
    </button>
    <button
      class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 bg-blue-500 text-white disabled:bg-gray-300 hover:bg-blue-600 transition-all"
    >
      <span>Siguientes</span>
      <ArrowRight />
    </button>
  </div>
</template>

<script setup lang="ts">
import ArrowLeft from '@/icons/ArrowLeft.vue';
import ArrowRight from '@/icons/ArrowRight.vue';

interface Props {}

defineProps<Props>();
</script>
