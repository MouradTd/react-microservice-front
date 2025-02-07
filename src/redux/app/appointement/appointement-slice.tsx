import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Patient {
    id: number;
    name: string;
    age: number;
    email: string;
    gender: string;
    dateOfBirth: string;
    appointments:[]
}

interface PatientState {
    patient: Patient[];
}

const initialState: PatientState = {
    patient: [],
    
};

const appointementSlice = createSlice({
    name: 'appointement',
    initialState,
    reducers: {
        setPatient(state, action: PayloadAction<Patient[]>) {
            state.patient = action.payload;
        },
    },
});

export const { setPatient } = appointementSlice.actions;
export const appointementReducer = appointementSlice.reducer;