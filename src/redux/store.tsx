import { configureStore, AnyAction } from '@reduxjs/toolkit';
import thunk, { ThunkAction } from 'redux-thunk';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk).concat(logger)
});

export type AppDispatch = typeof store.dispatch | any;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;
