import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector, Validate } from "@/core";
import { appointementActionThunk, patientActionThunk, setSelectDocument } from "@/redux/app";
import { useParams } from 'react-router-dom';
import { AddDocumentModal, AppointementsPatientTable } from '@/core/components';
interface Appointment {
    id: number;
    dateTime: string;
    duration: number;
    patientId: number;
    doctorId: number | null;
    status: string;
    notes: string;
    salleId: string;
    factureId: number | null;
}

interface Patient {
    id: number;
    name: string;
    surname: string | null;
    email: string;
    phone: string | null;
    age: number;
    address: string;
    gender: string;
    dateOfBirth: string;
    emergencyContact: string;
    insuranceInformation: string;
    primaryCarePhysician: string;
    medicalHistory: string;
    allergies: string;
    appointments: Appointment[];
}

export const ProfilePatient: React.FC = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const patient: Patient | null = useAppSelector((state) => state.appointement.patient);
    const selectedDocument = useAppSelector((state) => state.appointement.selectedDocument);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (id) {
            dispatch(appointementActionThunk.getPatientAppointements(parseInt(id)));
        }
    }, [id, dispatch]);

    if (!patient) {
        return <div className="text-center text-lg">Loading...</div>;
    }
    const deleteDocument = async (event: React.MouseEvent) => {
        event.preventDefault();
        console.log(selectedDocument);
        
        setIsLoading(true);
        try {
            await dispatch(patientActionThunk.deleteDocument(selectedDocument));
            // @ts-ignore
            $('#delete-doc').modal('hide');
        } catch (error) {
            console.error('Failed to Delete document:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row p-6 bg-gray-50">
            <div className="col-xl-4 col-lg-5 col-md-5 order-0 order-md-0">
                <div className="card card-border-shadow-primary mb-4">
                    <div className="card-body">
                        <div className="user-avatar-section border-bottom pb-4">
                            <div className=" d-flex align-items-center flex-column">
                                <img className="img-fluid rounded mb-3 pt-1 mt-4"
                                src='/src/assets/default.png'
                                    height="100" width="100"
                                    alt="User avatar"/>
                                   
                                <div className="user-info text-center">
                                    <h4 className="mb-2">{patient.name}</h4>
                                </div>
                            </div>
                        </div>
                        <p className="mt-4 small text-uppercase text-muted">À PROPOS</p>
                        <div className="info-container">
                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <span className="fw-medium me-1">Nom complet:</span>
                                    <span>{patient.name}</span>
                                </li>
                                <li className="mb-2 pt-1">
                                    <span className="fw-medium me-1">Date de naissance:</span>
                                    <span>{patient.dateOfBirth}</span>
                                </li>
                                <li className="mb-2 pt-1">
                                    <span className="fw-medium me-1">Sexe:</span>
                                    <span>{patient.gender === 'MALE' ? 'Homme' : 'Femme'}</span>
                                </li>
                                <li className="mb-2 pt-1">
                                    <span className="fw-medium me-1">Adresse:</span>
                                    <span>{patient.address}</span>
                                </li>
                                <p className="mt-4 small text-uppercase text-muted">INFORMATIONS MEDICALES</p>
                                <div className="info-container">
                                    <ul className="list-unstyled">
                                        <li className="mb-2">
                                            <span className="fw-medium me-1">Médecin traitant:</span>
                                            <span>{patient.primaryCarePhysician}</span>
                                        </li>
                                        <li className="mb-2 pt-1">
                                            <span className="fw-medium me-1">Antécédents médicaux:</span>
                                            <span>{patient.medicalHistory}</span>
                                        </li>
                                        <li className="mb-2 pt-1">
                                            <span className="fw-medium me-1">Allergies:</span>
                                            <span>{patient.allergies}</span>

                                        </li>
                                    </ul>
                                </div>
                            </ul>
                        </div>
                        
                        <p className="mt-4 small text-uppercase text-muted">CONTACTS</p>
                        <div className="info-container">
                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <span className="fw-medium me-1">Adresse email:</span>
                                    <span>{patient.email}</span>
                                </li>
                                <li className="mb-2 pt-1">
                                    <span className="fw-medium me-1">Numéro de telephone:</span>
                                    <span>{patient.phone}</span>

                                </li>
                               
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-8 col-lg-7 col-md-7">
                <ul className="nav nav-pills mb-3 nav-fill" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button type="button" className="nav-link active" role="tab" data-bs-toggle="tab"
                            data-bs-target="#patient_dossier" aria-controls="patient" aria-selected="true">
                            Dossier du patient
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button type="button" className="nav-link" role="tab" data-bs-toggle="tab"
                            data-bs-target="#documents" aria-controls="documents" aria-selected="false" tabindex="-1">
                            Documents
                        </button>
                    </li>
                </ul>
                    <div className="tab-content px-2" style={{ backgroundColor: 'transparent' }}>
                        <div id="patient_dossier" className="tab-pane fade show active" role="tabpanel">
                            <div className="row">
                                <div className="col-lg-12 col-xl-12">
                                    <div className="card card-border-shadow-primary card-action mb-4">
                                        <div className="card-header align-items-center">
                                            <h5 className="card-action-title mb-0">Rendez-vous</h5>
                                        </div>
                                        <div className="card-body">
                                            {patient?.appointments?.length > 0 ? (
                                                <AppointementsPatientTable data={patient.appointments} />
                                            ) : (
                                                <div className="text-center text-lg">
                                                    Aucune donnée disponible
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-content px-2" style={{ backgroundColor: 'transparent' }}>
                        <div id="documents" className="tab-pane fade" role="tabpanel">
                            <div className="row">
                                <div className="col-lg-12 col-xl-12">
                                <div className="card card-border-shadow-primary card-action mb-4">
                                    <div className=" card-header d-flex align-items-center justify-between">
                                        <h5 className="card-action-title mb-0">Documents</h5>
                                        <button className="btn btn-primary" data-bs-toggle="modal"
                                            data-bs-target="#upload-document">
                                            <i className="ti ti-upload me-2"></i> Ajouter un document
                                        </button>
                                    </div>
                                        <div className="card-body">
                                    
                                            
                                        <div className="row">
                                            {patient?.documents?.length > 0 ? (
                                                patient?.documents?.map((document, index) => (
                                                    <div key={index} className="col-6 mb-3">
                                                        <div className="card shadow-none border">
                                                            <div className="card-body d-flex align-items-center">
                                                                <div className="bg-label-primary p-3 rounded">
                                                                    <i className="ti ti-file-filled"></i>
                                                                </div>
                                                                <div className="ms-2">
                                                                    <a href={document.attachement} target="_blank" rel="noopener noreferrer">
                                                                        <h6 className="mb-2">{document.title}</h6>
                                                                    </a>
                                                                </div>
                                                                <button className="ms-auto btn btn-danger btn-sm m-0"
                                                                    onClick={() => dispatch(setSelectDocument(document.id))}
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#delete-doc">
                                                                    <i className="ti ti-trash-filled"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ):(
                                                <div  className="row mb-4">
                                                <div className="col-12 text-center">
                                                    <img src="/src/assets/img/No_Results.png" className="empty_stats_img_md"
                                                        alt="" height="180px" width="180px" />
                                                    <h6 className="text-center mt-3 fw-bold">
                                                        Aucun document trouvé
                                                    </h6>
                                                    <p className="text-center">
                                                        Il n'y a pas encore de documents pour ce
                                                        patient
                                                    </p>
                                                </div>
                                            </div>
                                            )}
                                            
                                        </div>
                                        
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
           
            <Validate
                id="delete-doc"
                isLoading={isLoading}
                method={deleteDocument}
                itemid={selectedDocument}
                title="Supression d'un Document"
                message="Êtest-vous sûr de supprimer ce document?"
                severity="danger"
            />
            <AddDocumentModal />
        </div>
    );
};