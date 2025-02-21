import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Salle {
    id: number;
    name: string;
    description: string;
}
export interface Products {
    id: number;
    name: string;
    description: string;
    price:number
}
export interface DemandeProducts {
    id: number;
    name: string;
    usageDescription: string;
    produitId:number;
    quantity:number;
}

interface RessourceState {
    salle: Salle[];
    products : Products[];
    demande : DemandeProducts[];
    selectedSalle:unknown,
    selectedProduct:unknown,
    selectedDemande:unknown
}

const initialState: RessourceState = {
    salle: [],
    products:[],
    demande:[],
    selectedSalle:null,
    selectedProduct:null,
    selectedDemande:null
};

const ressourceSlice = createSlice({
    name: 'appointement',
    initialState,
    reducers: {
        setSalle(state, action: PayloadAction<Salle[]>) {
            state.salle = action.payload;
        },
        setSelectedSalle(state, action: PayloadAction<Salle[]>){
            state.selectedSalle = action.payload;
        },
        editSalle(state, action: PayloadAction<unknown>){
            const index = state.salle.findIndex(patient => patient.id === action.payload.id);
            if (index !== -1) {
                state.salle[index] = action.payload;
            }
        },
        pushSalle(state, action: PayloadAction<unknown>) {
            state.salle.push(action.payload);
        },
        removeSalle(state, action: PayloadAction<number>) {
            state.salle = state.salle.filter(patient => patient.id !== action.payload);
        },
        // Products
        setProduct(state, action: PayloadAction<Products[]>) {
            state.products = action.payload;
        },
        setSelectedProduct(state, action: PayloadAction<Products[]>){
            state.selectedProduct = action.payload;
        },
        editProduct(state, action: PayloadAction<unknown>){
            const index = state.products.findIndex(patient => patient.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        pushProduct(state, action: PayloadAction<unknown>) {
            state.products.push(action.payload);
        },
        removeProduct(state, action: PayloadAction<number>) {
            state.products = state.products.filter(patient => patient.id !== action.payload);
        },

        //Demande

        setDemande(state, action: PayloadAction<DemandeProducts[]>) {
            state.demande = action.payload;
        },
        setSelectedDemande(state, action: PayloadAction<DemandeProducts[]>){
            state.selectedDemande = action.payload;
        },
        editDemande(state, action: PayloadAction<unknown>){
            const index = state.demande.findIndex(patient => patient.id === action.payload.id);
            if (index !== -1) {
                state.demande[index] = action.payload;
            }
        },
        pushDemande(state, action: PayloadAction<unknown>) {
            state.demande.push(action.payload);
        },
        removeDemande(state, action: PayloadAction<number>) {
            state.demande = state.demande.filter(patient => patient.id !== action.payload);
        },
    },
});

export const { setSalle , editSalle , pushSalle , removeSalle, setSelectedSalle,
     setProduct , editProduct , pushProduct , removeProduct , setSelectedProduct,
     setDemande , editDemande , pushDemande , removeDemande , setSelectedDemande,} = ressourceSlice.actions;
export const ressourceReducer = ressourceSlice.reducer;