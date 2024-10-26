import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { User } from '../interfaces/user.interface';
import { AuthStatus } from '../enums/auth-status.enum';
import { loginAction } from '../actions';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.Checking);
  const user = ref<User | undefined>();
  const token = ref('');

  const login = async (email: string, password: string) => {
    try {
      const loginResponse = await loginAction(email, password);
      if (!loginResponse.ok) return logout();
      user.value = loginResponse.user;
      token.value = loginResponse.token;
      authStatus.value = AuthStatus.Authenticated;

      return true;
    } catch (error) {
      console.error(error);
      return logout();
    }
  };

  const logout = () => {
    user.value = undefined;
    token.value = '';
    authStatus.value = AuthStatus.Unauthenticated;
    return false;
  };

  return {
    // Props
    user,
    token,
    authStatus,
    // Getters
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    // TODO: Getter para saber si es admin
    username: computed(() => user.value?.fullName),
    // Actions
    login,
  };
});
