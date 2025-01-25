import { AddPatientModal } from '@/core/components';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/core/hooks';
import { patientActionThunk } from '@/redux/app/patient/patient-action-thunk';

export const PatientList: React.FC = () => {
    
    const dispatch = useAppDispatch();
    const patients = useAppSelector(state => state.patient.patients);

    useEffect(() => {
        dispatch(patientActionThunk.getPatients());
        console.log('Patients from store:', patients);
    }, [dispatch]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Patients List</h1>
            <button 
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded" 
               data-bs-toggle="modal" data-bs-target="#addNewPatient"
            >
                Add New Patient
            </button>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Age</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Gender</th>
                        <th className="border px-4 py-2">Date of Birth</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map(patient => (
                        <tr key={patient.id}>
                            <td className="border px-4 py-2">{patient.name}</td>
                            <td className="border px-4 py-2">{patient.age}</td>
                            <td className="border px-4 py-2">{patient.email}</td>
                            <td className="border px-4 py-2">{patient.gender}</td>
                            <td className="border px-4 py-2">{patient.dateOfBirth}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <AddPatientModal/>
        </div>
    );
};