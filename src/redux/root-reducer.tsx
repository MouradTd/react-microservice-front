import {combineReducers} from '@reduxjs/toolkit';
import {authReducer,patientReducer} from './app';


export const rootReducer = combineReducers({
  auth: authReducer,
  patient:patientReducer
});
export type RootStateReducer = ReturnType<typeof rootReducer>;
