import {Modal} from '@/core/constants';
import { useState,useEffect } from 'react';

interface DetailPatientModalProps {
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

export const DetailPatientModal: React.FC<DetailPatientModalProps> = ({ patient }) => {
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

    useEffect(() => {
        if (patient) {
            setEditedPatient(patient);
        }
    }, [patient]);

    

    

    return (
        <Modal id="detailPatient" title="Detail Patient" size='lg'>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-6 mb-3">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={editedPatient.name}
                                disabled
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <input
                                type="number"
                                name="age"
                                placeholder="Age"
                                value={editedPatient.age}
                                disabled
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={editedPatient.email}
                                disabled
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <select name="gender" className="border p-2 w-full" value={editedPatient.gender} >
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
                                disabled
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <input
                                type="text"
                                name="emergencyContact"
                                placeholder="Emergency Contact"
                                value={editedPatient.emergencyContact}
                                disabled
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <input
                                type="text"
                                name="primaryCarePhysician"
                                placeholder="Primary Care Physician"
                                value={editedPatient.primaryCarePhysician}
                                disabled
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="col-12 mb-3">
                            <textarea name="address"
                                placeholder="Address"
                                value={editedPatient.address}  className="border p-2 w-full" disabled></textarea>
                        </div>
                        <div className="col-12 mb-3">
                            <textarea name="medicalHistory"
                                placeholder="Medical History"
                                value={editedPatient.medicalHistory}  className="border p-2 w-full" disabled></textarea>
                        </div>
                        <div className="col-12 mb-3">
                            <textarea name="allergies"
                                placeholder="Allergies"
                                value={editedPatient.allergies}  className="border p-2 w-full" disabled></textarea>
                        </div>
                        <div className="col-12 mb-3">
                            <textarea name="insuranceInformation"
                                placeholder="Insurance Information"
                                value={editedPatient.insuranceInformation}  className="border p-2 w-full" disabled></textarea>
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
                    </div>
                </div>
        </Modal>
    );
};