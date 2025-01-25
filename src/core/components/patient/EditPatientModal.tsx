import { useAppDispatch } from '@/core';
import {Modal} from '@/core/constants';
import { patientActionThunk } from '@/redux/app/patient/patient-action-thunk';
import React, { useState, useEffect } from 'react';

interface EditPatientModalProps {
    patient: {
        id: number;
        name: string;
        age: string;
        address: string;
        email: string;
        gender: string;
        dateOfBirth: string;
        medicalHistory: string;
        allergies: string;
        emergencyContact: string;
        insuranceInformation: string;
        primaryCarePhysician: string;
    };
    
}

export const EditPatientModal: React.FC<EditPatientModalProps> = ({ patient }) => {
    const [editedPatient, setEditedPatient] = useState(patient || {
        id: 0,
        name: '',
        age: '',
        address: '',
        email: '',
        gender: '',
        dateOfBirth: '',
        medicalHistory: '',
        allergies: '',
        emergencyContact: '',
        insuranceInformation: '',
        primaryCarePhysician: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (patient) {
            setEditedPatient(patient);
        }
    }, [patient]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedPatient({ ...editedPatient, [name]: value });
    };

    const handleEditPatient = async () => {
        setIsLoading(true);
        try {
            await dispatch(patientActionThunk.EditPatient(editedPatient,editedPatient.id)); 
           // @ts-ignore
           $('#editPatient').modal('hide');
        } catch (error) {
            console.error('Failed to edit patient:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal id="editPatient" title="Edit Patient" size='lg'>
            <form onSubmit={(e) => { e.preventDefault(); handleEditPatient(); }}>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-6 mb-3">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={editedPatient.name}
                                onChange={handleInputChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <input
                                type="number"
                                name="age"
                                placeholder="Age"
                                value={editedPatient.age}
                                onChange={handleInputChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={editedPatient.email}
                                onChange={handleInputChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <select name="gender" className="border p-2 w-full" value={editedPatient.gender} onChange={handleInputChange}>
                                <option value="" disabled>Select Gender</option>
                                <option value="MALE">Homme</option>
                                <option value="FEMALE">Femme</option>
                            </select>
                        </div>
                        <div className="col-6 mb-3">
                            <input
                                type="date"
                                name="dateOfBirth"
                                placeholder="Date of Birth"
                                value={editedPatient.dateOfBirth}
                                onChange={handleInputChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <input
                                type="text"
                                name="emergencyContact"
                                placeholder="Emergency Contact"
                                value={editedPatient.emergencyContact}
                                onChange={handleInputChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <input
                                type="text"
                                name="primaryCarePhysician"
                                placeholder="Primary Care Physician"
                                value={editedPatient.primaryCarePhysician}
                                onChange={handleInputChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="col-12 mb-3">
                            <textarea name="address"
                                placeholder="Address"
                                value={editedPatient.address} onChange={handleInputChange} className="border p-2 w-full"></textarea>
                        </div>
                        <div className="col-12 mb-3">
                            <textarea name="medicalHistory"
                                placeholder="Medical History"
                                value={editedPatient.medicalHistory} onChange={handleInputChange} className="border p-2 w-full"></textarea>
                        </div>
                        <div className="col-12 mb-3">
                            <textarea name="allergies"
                                placeholder="Allergies"
                                value={editedPatient.allergies} onChange={handleInputChange} className="border p-2 w-full"></textarea>
                        </div>
                        <div className="col-12 mb-3">
                            <textarea name="insuranceInformation"
                                placeholder="Insurance Information"
                                value={editedPatient.insuranceInformation} onChange={handleInputChange} className="border p-2 w-full"></textarea>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-label-outline-dark"
                            data-bs-dismiss="modal"
                           
                        >
                            Fermer
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? (
                                <span className="d-flex align-items-center">
                                    <div
                                        className="spinner-border spinner-border-sm text-white"
                                        role="status"
                                    >
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </span>
                            ) : (
                                <span>Terminer</span>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};