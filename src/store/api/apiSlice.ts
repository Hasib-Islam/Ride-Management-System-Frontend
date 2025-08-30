import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || '/api/v1',
  credentials: 'include',
  prepareHeaders: (headers) => {
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Ride', 'Driver', 'Admin'],
  endpoints: () => ({}),
});
