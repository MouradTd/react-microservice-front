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

interface AppointementState {
    patient: Patient[];
    appointements:[],
    selectedItem:unknown,
    selectedDocument: BigInteger | null;
}

const initialState: AppointementState = {
    patient: [],
    appointements:[],
    selectedItem:null,
    selectedDocument: null,
};

const appointementSlice = createSlice({
    name: 'appointement',
    initialState,
    reducers: {
        setPatient(state, action: PayloadAction<Patient[]>) {
            state.patient = action.payload;
        },
        setAppointements(state, action: PayloadAction<[]>) {
            state.appointements = action.payload;
        },
        selectItem(state, action: PayloadAction<unknown>) {
            state.selectedItem = null;
            state.selectedItem = action.payload;
        },
        editAppointement(state, action: PayloadAction<unknown>){
            const index = state.appointements.findIndex(patient => patient.id === action.payload.id);
            if (index !== -1) {
                state.appointements[index] = action.payload;
            }
        },
        pushAppointement(state, action: PayloadAction<unknown>) {
            state.appointements.push(action.payload);
        },
        removeAppointement(state, action: PayloadAction<number>) {
            state.appointements = state.appointements.filter(patient => patient.id !== action.payload);
        },
        removeDocument(state, action: PayloadAction<number>) {
            state.patients = state.selectedItem.documents.filter(document => document.id !== action.payload);
        },
        setSelectDocument(state, action: PayloadAction<BigInteger | null>) {
            state.selectedDocument = action.payload;
        },
        addDocumentModal(state, action: PayloadAction<{ title: string; file: File | null }>) {
            const newDocument = action.payload;
            if (state.selectedItem) {
                state.selectedItem.documents.push(newDocument);
            }
        }
    },
});

export const { setPatient , setAppointements , selectItem , editAppointement , pushAppointement , removeAppointement , removeDocument,setSelectDocument,addDocumentModal } = appointementSlice.actions;
export const appointementReducer = appointementSlice.reducer;