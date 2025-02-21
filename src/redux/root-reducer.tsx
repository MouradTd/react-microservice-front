import {combineReducers} from '@reduxjs/toolkit';
import {appointementReducer, authReducer,patientReducer, ressourceReducer} from './app';


export const rootReducer = combineReducers({
  auth: authReducer,
  patient:patientReducer,
  appointement:appointementReducer,
  ressource:ressourceReducer
});
export type RootStateReducer = ReturnType<typeof rootReducer>;
