import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import authSlice from './authSlice';

import { api } from '../api/api';

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
    }).concat(api.middleware)
});
setupListeners(store.dispatch);