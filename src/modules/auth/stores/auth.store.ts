import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { User } from '../interfaces/user.interface';
import { AuthStatus } from '../enums/auth-status.enum';
import { checkAuthStatusAction, loginAction, registerAction } from '../actions';
import { useLocalStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.Checking);
  const user = ref<User | undefined>();
  const token = ref(useLocalStorage('token', ''));

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

  const register = async (fullName: string, email: string, password: string) => {
    try {
      const registerResponse = await registerAction(fullName, email, password);
      if (!registerResponse.ok) return logout();

      user.value = registerResponse.user;
      token.value = registerResponse.token;
      authStatus.value = AuthStatus.Authenticated;

      return true;
    } catch (error) {
      console.error(error);
      return logout();
    }
  };

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const checkResponse = await checkAuthStatusAction();
      if (!checkResponse.ok) return logout();

      user.value = checkResponse.user;
      token.value = checkResponse.token;
      authStatus.value = AuthStatus.Authenticated;

      return true;
    } catch (error) {
      console.error(error);
      return logout();
    }
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
    register,
    checkAuthStatus,
  };
});
