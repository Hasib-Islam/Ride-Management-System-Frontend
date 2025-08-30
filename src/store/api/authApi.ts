import { apiSlice } from './apiSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: any, meta: any) => {
        console.log('Login API response:', response);
        console.log('Login API meta:', meta);
        return response;
      },
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
      transformResponse: (response: any) => {
        console.log('Register API response:', response);
        return response;
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    getProfile: builder.query({
      query: () => '/auth/profile',
      providesTags: ['User'],
      transformResponse: (response: any) => {
        console.log('Profile response:', response);
        return response;
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetProfileQuery,
} = authApi;
