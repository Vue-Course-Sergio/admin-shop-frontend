import { tesloApi } from '@/api/tesloApi';
import type { AuthResponse } from '../responses/auth.response';
import type { User } from '../interfaces/user.interface';
import { isAxiosError } from 'axios';

interface RegisterError {
  ok: false;
  message: string;
}

interface RegisterSuccess {
  ok: true;
  user: User;
  token: string;
}

export const registerAction = async (
  fullName: string,
  email: string,
  password: string,
): Promise<RegisterSuccess | RegisterError> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
      email,
      password,
      fullName,
    });

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
        message: error.message,
      };
    }

    console.warn(error);
    throw new Error('Something bad happen');
  }
};
