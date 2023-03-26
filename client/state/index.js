import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import authSlice from './authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../api/api';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};
const persistedReducer = persistReducer(persistConfig, authSlice)

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: persistedReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
    }).concat(api.middleware)
});
setupListeners(store.dispatch);