import { configureStore } from '@reduxjs/toolkit'
import commonReducer from './common'
import movieReducer from 'modules/Movie/slice'
import authReducer from "modules/Authentication/slice"
import { movieApi } from 'modules/Movie/api'
import { authApi } from 'modules/Authentication/api'

export const store = configureStore({
    reducer: {
        common: commonReducer,
        movie: movieReducer,
        auth: authReducer,
        [movieApi.reducerPath]: movieApi.reducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(movieApi.middleware, authApi.middleware)
    }
})