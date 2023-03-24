import { api } from './api';

const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (values) => ({
                url: '/api/v1/auth/login',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: values
            }),
        }),
        registerUser: builder.mutation({
            query: (values) => ({
                url: "/api/v1/auth/register",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: values,
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useLoginUserMutation,
    useRegisterUserMutation,
} = authApi;