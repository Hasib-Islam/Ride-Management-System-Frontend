import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.token;

    if (token && token !== 'cookie-based') {
      headers.set('authorization', `Bearer ${token}`);
    }

    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error) {
      console.error('API Error:', result.error);
    }

    return result;
  },
  tagTypes: ['User'],
  endpoints: () => ({}),
});
