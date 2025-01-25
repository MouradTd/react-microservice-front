import { AddPatientModal, EditPatientModal,DetailPatientModal } from '@/core/components';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/core/hooks';
import { patientActionThunk } from '@/redux/app/patient/patient-action-thunk';
import { selectPatient } from '@/redux/app/patient/patient-slice';
import { Validate } from '@/core';

export const PatientList: React.FC = () => {
    const dispatch = useAppDispatch();
    const patients = useAppSelector(state => state.patient.patients);
    const selectedPatient = useAppSelector(state => state.patient.selectedItem);
    const [isLoading,setIsLoading] = useState(false);
    const handleEditClick = (item: any) => {
        dispatch(selectPatient(item));
    };

    useEffect(() => {
        const fetchPatients = async () => {
            await dispatch(patientActionThunk.getPatients());
        };

        fetchPatients();

        // Cleanup function
        return () => {
            setIsLoading(false); // Example: reset loading state
        };
    }, [dispatch]); // Ensure dispatch is stable and does not change

    const deletePatient = async (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent default action
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
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Nom Complet</th>
                        <th className="border px-4 py-2">Age</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Sexe</th>
                        <th className="border px-4 py-2">Date de Naissance</th>
                        <th className="border px-4 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map(patient => (
                        <tr key={patient.id}>
                            <td className="border px-4 py-2">{patient.name}</td>
                            <td className="border px-4 py-2">{patient.age}</td>
                            <td className="border px-4 py-2">{patient.email}</td>
                            <td className="border px-4 py-2">{patient.gender === 'MALE' ? 'Homme' : 'Femme'}</td>
                            <td className="border px-4 py-2">{patient.dateOfBirth}</td>
                            <td className='d-flex flex-row gap-2 p-2'>
                                <button className='btn btn-primary btn-sm'
                                 data-bs-toggle="modal" data-bs-target="#detailPatient">
                                    <i className='ti ti-eye'></i>
                                </button>
                                <button className='btn btn-warning btn-sm' onClick={() => handleEditClick(patient)}
                                    data-bs-toggle="modal" data-bs-target="#editPatient">
                                    <i className='ti ti-pencil'></i>
                                </button>
                                <button className='btn btn-danger btn-sm' onClick={() => handleEditClick(patient)}
                                    data-bs-toggle="modal" data-bs-target="#delete-patient">
                                    <i className='ti ti-trash'></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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