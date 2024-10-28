import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import { AuthStatus } from '../enums/auth-status.enum';

const isNotAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();

  await authStore.checkAuthStatus();

  return authStore.authStatus === AuthStatus.Authenticated ? next({ name: 'home' }) : next();
};

export default isNotAuthenticatedGuard;