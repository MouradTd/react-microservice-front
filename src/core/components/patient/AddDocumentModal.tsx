import { useAppDispatch, useAppSelector } from '@/core';
import { Modal } from '@/core/constants';
import { patientActionThunk } from '@/redux/app/patient/patient-action-thunk';
import React, { useState, useEffect } from 'react';

export const AddDocumentModal: React.FC = () => {
    const [newDocument, setNewDocument] = useState<{
        title: string;
        file: File | null;
    }>({
        title: '',
        file: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const patient = useAppSelector((state) => state.appointement.patient);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewDocument({ ...newDocument, [name]: value });
    };

    const handleAddDocument = async () => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', newDocument.title);
            formData.append('file', newDocument.file);
            console.log('Submitting document:', newDocument); // Log the document being submitted
            await dispatch(patientActionThunk.uploadDocument(patient.id, formData));
            setNewDocument({
                title: '',
                file: null,
            });
            // @ts-ignore
            $('#upload-document').modal('hide');
        } catch (error) {
            console.error('Failed to add document:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setNewDocument({
                ...newDocument,
                file: file, // Ensure the file is set correctly
            });
        } else {
            console.log('No file selected');
        }
    };

   

    return (
        <Modal id="upload-document" title="Upload Document" size='lg'>
            <form onSubmit={(e) => { e.preventDefault(); handleAddDocument(); }}>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-6 mb-3">
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={newDocument.title}
                                onChange={handleInputChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <input
                                type="file"
                                name="file"
                                onChange={handleFileChange}
                                className="border p-2 w-full"
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-label-outline-dark" data-bs-dismiss="modal">
                            Fermer
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? 'Loading...' : 'Terminer'}
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};