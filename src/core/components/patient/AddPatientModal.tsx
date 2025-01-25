import { useAppDispatch } from '@/core';
import Modal from '@/core/constants/Modal';
import { patientActionThunk } from '@/redux/app/patient/patient-action-thunk';
import React, { useState } from 'react';

export const AddPatientModal: React.FC = () => {
    const [newPatient, setNewPatient] = useState({
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
        primaryCarePhysician: ''
    });
    const [isLoading ,setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewPatient({ ...newPatient, [name]: value });
    };

    const handleAddPatient = async () => {
        setIsLoading(true);
        try {
            await dispatch(patientActionThunk.AddPatient(newPatient)); // Dispatch the action to add a new patient
            // Optionally reset the form or close the modal here
            setNewPatient({
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
                primaryCarePhysician: ''
            });
            // @ts-ignore
            $('#addNewPatient').modal('hide');
        } catch (error) {
            console.error('Failed to add patient:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal id="addNewPatient" title="Nouveau Patient"  size='lg'>
            <form onSubmit={(e) => { e.preventDefault(); handleAddPatient(); }}>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-6 mb-3">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={newPatient.name}
                                onChange={handleInputChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <input
                                type="number"
                                name="age"
                                placeholder="Age"
                                value={newPatient.age}
                                onChange={handleInputChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={newPatient.email}
                                onChange={handleInputChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="col-6 mb-3">
                        <select name="gender" className="border p-2 w-full" value={newPatient.gender} onChange={handleInputChange}>
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
                                value={newPatient.dateOfBirth}
                                onChange={handleInputChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <input
                                type="text"
                                name="emergencyContact"
                                placeholder="Emergency Contact"
                                value={newPatient.emergencyContact}
                                onChange={handleInputChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <input
                                type="text"
                                name="primaryCarePhysician"
                                placeholder="Primary Care Physician"
                                value={newPatient.primaryCarePhysician}
                                onChange={handleInputChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="col-12 mb-3">
                            
                            <textarea id="" name="address"
                                placeholder="Adresse"
                                value={newPatient.address} onChange={handleInputChange} className="border p-2 w-full"></textarea>
                        </div>
                        <div className="col-12 mb-3">
                            
                            <textarea id="" name="medicalHistory"
                                placeholder="Medical History"
                                value={newPatient.medicalHistory} onChange={handleInputChange} className="border p-2 w-full"></textarea>
                        </div>

                        <div className="col-12 mb-3">
                            
                            <textarea id="" name="allergies"
                                placeholder="Allergies"
                                value={newPatient.allergies} onChange={handleInputChange} className="border p-2 w-full"></textarea>
                        </div>

                        <div className="col-12 mb-3">
                            
                            <textarea id="" name="insuranceInformation"
                                placeholder="Insurance Information"
                                value={newPatient.insuranceInformation} onChange={handleInputChange} className="border p-2 w-full"></textarea>
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
