import { Modal } from '@/core/constants';
import { useEffect, useState } from 'react';

interface DetailAppointementModal {
    data?: {
        id: number;
        dateTime: string;
        duration: number;
        patientId: number;
        doctorId: number;
        status: string;
        notes: string;
        salleId: number;
        factureId: null | number;
        patient: {
            id: number;
            name: string;
            surname: string | null;
            email: string;
            phone: string;
            age: number;
            address: string;
            gender: string;
            dateOfBirth: string;
            emergencyContact: string;
            insuranceInformation: string;
            primaryCarePhysician: string;
            medicalHistory: string;
            allergies: string;
        };
    };
}
// Default appointment object
const defaultAppointment = {
    id: 0,
    dateTime: "",
    duration: 0,
    patientId: 0,
    doctorId: 0,
    status: "",
    notes: "",
    salleId: 0,
    factureId: null,
    patient: {
        id: 0,
        name: "John Doe",
        surname: null,
        email: "john.doe@example.com",
        phone: "",
        age: 30,
        address: "",
        gender: "MALE",
        dateOfBirth: "",
        emergencyContact: "",
        insuranceInformation: "",
        primaryCarePhysician: "",
        medicalHistory: "",
        allergies: "",
        appointments: null
    }
};
export const DetailAppointementModal: React.FC<DetailAppointementModal> = ({ data }) => {

    const [selectedAppointement, setSelectedAppointement] = useState(
        data || defaultAppointment
    );
    useEffect(() => {
        if (data) {
            setSelectedAppointement(data);
        } else {
            setSelectedAppointement(defaultAppointment);
        }
    }, [data]);
    
    
    return (
        <Modal id="detailAppointement" title="Detail Rendez-vous" size="xl">
            <div className="modal-body">
                
                <div className="row">
                    <div className="col-6 mb-3">
                        <input
                            type="datetime-local"
                            name="name"
                            placeholder="Date"
                            value={selectedAppointement.dateTime}
                            disabled
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="col-6 mb-3">
                        <input
                            type="number"
                            name="name"
                            placeholder="Duration"
                            value={selectedAppointement.duration}
                            disabled
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="col-6 mb-3">
                        <input
                            type="number"
                            name="name"
                            placeholder="Status"
                            value={selectedAppointement.status}
                            disabled
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <textarea
                            name="address"
                            placeholder="Notes"
                            value={selectedAppointement.notes}
                            className="border p-2 w-full"
                            disabled
                        ></textarea>
                    </div>

                    <div className="col-6 mb-3">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={selectedAppointement.patient.name}
                            disabled
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="col-6 mb-3">
                        <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            value={selectedAppointement.patient.age}
                            disabled
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="col-6 mb-3">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={selectedAppointement.patient.email}
                            disabled
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="col-6 mb-3">
                        <select
                            name="gender"
                            className="border p-2 w-full"
                            value={selectedAppointement.patient.gender}
                        >
                            <option value="" disabled>
                                Select Gender
                            </option>
                            <option value="MALE">Homme</option>
                            <option value="FEMALE">Femme</option>
                        </select>
                    </div>
                    <div className="col-6 mb-3">
                        <input
                            type="date"
                            name="dateOfBirth"
                            placeholder="Date of Birth"
                            value={selectedAppointement.patient.dateOfBirth}
                            disabled
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="col-6 mb-3">
                        <input
                            type="text"
                            name="emergencyContact"
                            placeholder="Emergency Contact"
                            value={selectedAppointement.patient.emergencyContact}
                            disabled
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="col-6 mb-3">
                        <input
                            type="text"
                            name="primaryCarePhysician"
                            placeholder="Primary Care Physician"
                            value={selectedAppointement.patient.primaryCarePhysician}
                            disabled
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="col-6 mb-3">
                        <textarea
                            name="address"
                            placeholder="Address"
                            value={selectedAppointement.patient.address}
                            className="border p-2 w-full"
                            disabled
                        ></textarea>
                    </div>
                    <div className="col-6 mb-3">
                        <textarea
                            name="medicalHistory"
                            placeholder="Medical History"
                            value={selectedAppointement.patient.medicalHistory}
                            className="border p-2 w-full"
                            disabled
                        ></textarea>
                    </div>
                    <div className="col-6 mb-3">
                        <textarea
                            name="allergies"
                            placeholder="Allergies"
                            value={selectedAppointement.patient.allergies}
                            className="border p-2 w-full"
                            disabled
                        ></textarea>
                    </div>
                    <div className="col-6 mb-3">
                        <textarea
                            name="insuranceInformation"
                            placeholder="Insurance Information"
                            value={selectedAppointement.patient.insuranceInformation}
                            className="border p-2 w-full"
                            disabled
                        ></textarea>
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
