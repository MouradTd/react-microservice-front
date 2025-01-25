import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Patient {
    id: number;
    name: string;
    age: number;
    email: string;
    gender: string;
    dateOfBirth: string;
}

interface PatientState {
    patients: Patient[];
}

const initialState: PatientState = {
    patients: [],
};

const patientSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {
        setPatients(state, action: PayloadAction<Patient[]>) {
            state.patients = action.payload;
        },
        addPatient(state, action: PayloadAction<Patient>) {
            state.patients.push(action.payload);
        },
        removePatient(state, action: PayloadAction<number>) {
            state.patients = state.patients.filter(patient => patient.id !== action.payload);
        },
    },
});

export const { setPatients, addPatient, removePatient } = patientSlice.actions;
export const patientReducer = patientSlice.reducer;