import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Deployment } from '../../../shared/types';

export const deploymentsApi = createApi({
  reducerPath: 'deploymentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getDeployments: builder.query<Deployment[], void>({
      query: () => 'deployments',
    }),
    getDeploymentById: builder.query<Deployment, string>({
      query: (id) => `deployments/${id}`,
    }),
    createDeployment: builder.mutation<Deployment, Partial<Deployment>>({
      query: (body) => ({
        url: 'deployments',
        method: 'POST',
        body,
      }),
    }),
    updateDeployment: builder.mutation<Deployment, Partial<Deployment>>({
      query: ({ id, ...patch }) => ({
        url: `deployments/${id}`,
        method: 'PATCH',
        body: patch,
      }),
    }),
    deleteDeployment: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `deployments/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetDeploymentsQuery,
  useGetDeploymentByIdQuery,
  useCreateDeploymentMutation,
  useUpdateDeploymentMutation,
  useDeleteDeploymentMutation,
} = deploymentsApi;