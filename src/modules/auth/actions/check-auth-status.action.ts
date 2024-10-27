import { isAxiosError } from 'axios';
import type { User } from '../interfaces/user.interface';
import { tesloApi } from '@/api/tesloApi';
import type { AuthResponse } from '../responses/auth.response';

interface CheckError {
  ok: false;
}

interface CheckSuccess {
  ok: true;
  user: User;
  token: string;
}

export const checkAuthStatusAction = async (): Promise<CheckSuccess | CheckError> => {
  try {
    const token = localStorage.getItem('token');
    if (token && token.length < 10) return { ok: false };

    const { data } = await tesloApi.get<AuthResponse>('/auth/check-auth-status');

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
      };
    }

    console.warn(error);
    throw new Error('Something bad happen');
  }
};
