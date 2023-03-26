import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.0.106:6002' }),
    reducerPath: 'api',
    tagTypes: ['Posts'],
    keepUnusedDataFor: 30,
    endpoints: () => ({}),
});