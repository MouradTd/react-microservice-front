import { useAppDispatch } from '@/core';
import {Modal} from '@/core/constants';
import { ressourceActionThunk } from '@/redux/app';
import React, { useState } from 'react';

export const AddSalleModal: React.FC = () => {
    const [newSalle, setNewSalle] = useState({
        name: '',
        description: ''
    });
    const [isLoading ,setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewSalle({ ...newSalle, [name]: value });
    };

    const handleAddPatient = async () => {
        setIsLoading(true);
        try {
            await dispatch(ressourceActionThunk.AddSalle(newSalle)); // Dispatch the action to add a new patient
            // Optionally reset the form or close the modal here
            setNewSalle({
                 name: '',
                 description: ''
            });
            // @ts-ignore
            $('#addNewSalle').modal('hide');
        } catch (error) {
            console.error('Failed to add Salle:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal id="addNewSalle" title="Nouvelle Salle"  size='md'>
            <form onSubmit={(e) => { e.preventDefault(); handleAddPatient(); }}>
                <div className="modal-body">
                <div className="row">
                        <div className="col-12 mb-3">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={newSalle.name}
                                onChange={handleInputChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        
                        
                        <div className="col-12 mb-3">
                            <textarea name="description"
                                placeholder="Description"
                                value={newSalle.description} onChange={handleInputChange} className="border p-2 w-full"></textarea>
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
