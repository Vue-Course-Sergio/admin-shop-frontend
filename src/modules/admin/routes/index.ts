import isAdminGuard from '@/modules/auth/guards/is-admin.guard';
import isAuthenticatedGuard from '@/modules/auth/guards/is-autheticated.guard';
import type { RouteRecordRaw } from 'vue-router';

export const adminRoutes: RouteRecordRaw = {
  path: '/admin',
  beforeEnter: [isAuthenticatedGuard, isAdminGuard],
  name: 'admin',
  component: () => import('@/modules/admin/layouts/AdminLayout.vue'),
};
