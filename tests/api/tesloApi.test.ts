import { tesloApi } from '@/api/tesloApi';
import MockAdapter from 'axios-mock-adapter';

const mockTesloApi = new MockAdapter(tesloApi);

mockTesloApi.onGet('/test').reply(200, { data: 'test' });

describe('tesloApi.ts', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should have baseUrl set to VITE_TESLO_API_URL', () => {
    expect(tesloApi.defaults.baseURL).toBe(import.meta.env.VITE_TESLO_API_URL);
  });

  test('should set Auhtorization header with header token from localhost', async () => {
    const token = 'myAuthtoken';
    localStorage.setItem('token', token);

    const resp = await tesloApi.get('/test');

    expect(resp.config.headers.Authorization).toBe(`Bearer ${token}`);
  });

  test('should not set Authorization header if token is not in LocalStorage', async () => {
    const resp = await tesloApi.get('/test');

    expect(resp.config.headers.Authorization).toBeUndefined();
  });
});
