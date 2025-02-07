import { AddPatientModal, EditPatientModal,DetailPatientModal,PatientTable } from '@/core/components';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/core/hooks';
import { patientActionThunk } from '@/redux/app/patient/patient-action-thunk';
import { Validate } from '@/core';

export const PatientList: React.FC = () => {
    const dispatch = useAppDispatch();
    const patients = useAppSelector(state => state.patient.patients);
    const selectedPatient = useAppSelector(state => state.patient.selectedItem);
    const [isLoading,setIsLoading] = useState(false);
    
    useEffect(() => {
        const fetchPatients = async () => {
            await dispatch(patientActionThunk.getPatients());
        };

        fetchPatients();

        
        return () => {
            setIsLoading(false); 
        };
    }, [dispatch]); 

    const deletePatient = async (event: React.MouseEvent) => {
        event.preventDefault(); 
        setIsLoading(true);
        try {
            await dispatch(patientActionThunk.deletePatient(selectedPatient?.id)); 
            // @ts-ignore
           $('#delete-patient').modal('hide');
        } catch (error) {
            console.error('Failed to Delete patient:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Liste des Patients</h1>
            <button 
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded" 
                data-bs-toggle="modal" 
                data-bs-target="#addNewPatient"
            >
                Ajouter un Patient
            </button>
            <div className="overflow-x-auto">
                
                <div className="overflow-x-auto">
                {patients  && (
                    <PatientTable data={patients} />
                )}
            </div>
            </div>

            <AddPatientModal />
            <EditPatientModal patient={selectedPatient} />
            <DetailPatientModal patient={selectedPatient} />
            <Validate
                id="delete-patient"
                isLoading={isLoading}
                method={deletePatient}
                itemid={selectedPatient?.id}
                title="Supression d'un patient"
                message="Êtest-vous sûr de supprimer cet patient?"
                severity="danger"
            />
        </div>
    );
};