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
    selectedItem: Patient | null;
}

const initialState: PatientState = {
    patients: [],
    selectedItem: null,
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
        selectPatient(state, action: PayloadAction<Patient>) {
            state.selectedItem = action.payload;
        },
        clearSelectedPatient(state) {
            state.selectedItem = null;
        },
        editPatient(state, action: PayloadAction<Patient>) {
            const index = state.patients.findIndex(patient => patient.id === action.payload.id);
            if (index !== -1) {
                state.patients[index] = action.payload;
            }
        },
    },
});

export const { setPatients, addPatient, removePatient,selectPatient,clearSelectedPatient,editPatient } = patientSlice.actions;
export const patientReducer = patientSlice.reducer;