import {combineReducers} from '@reduxjs/toolkit';
import {appointementReducer, authReducer,patientReducer} from './app';


export const rootReducer = combineReducers({
  auth: authReducer,
  patient:patientReducer,
  appointement:appointementReducer
});
export type RootStateReducer = ReturnType<typeof rootReducer>;
