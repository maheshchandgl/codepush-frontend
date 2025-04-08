import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { App } from '../../../shared/types';

export const appsApi = createApi({
  reducerPath: 'appsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getApps: builder.query<App[], void>({
      query: () => 'apps',
    }),
    getAppById: builder.query<App, string>({
      query: (id) => `apps/${id}`,
    }),
    createApp: builder.mutation<App, Partial<App>>({
      query: (body) => ({
        url: 'apps',
        method: 'POST',
        body,
      }),
    }),
    updateApp: builder.mutation<App, Partial<App>>({
      query: ({ id, ...patch }) => ({
        url: `apps/${id}`,
        method: 'PATCH',
        body: patch,
      }),
    }),
    deleteApp: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `apps/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAppsQuery,
  useGetAppByIdQuery,
  useCreateAppMutation,
  useUpdateAppMutation,
  useDeleteAppMutation,
} = appsApi;