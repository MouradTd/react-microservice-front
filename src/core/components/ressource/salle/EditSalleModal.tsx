import { useAppDispatch } from '@/core';
import {Modal} from '@/core/constants';
import { ressourceActionThunk } from '@/redux/app';
import React, { useState, useEffect } from 'react';

interface EditSalleModalProps {
    salle: {
        id: number;
        name: string;
        description: string;
    };
    
}

export const EditSalleModal: React.FC<EditSalleModalProps> = ({ salle }) => {
    const [editedSalle, setEditedSalle] = useState(salle || {
        id: 0,
        name: '',
        description: '',
       
    });
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (salle) {
            setEditedSalle(salle);
        }
    }, [salle]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedSalle({ ...editedSalle, [name]: value });
    };

    const handleEditSalle = async () => {
        setIsLoading(true);
        try {
            await dispatch(ressourceActionThunk.editSalle(editedSalle,editedSalle.id)); 
           // @ts-ignore
           $('#edit-salle').modal('hide');
        } catch (error) {
            console.error('Failed to edit patient:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal id="edit-salle" title="Edit Salle" size='md'>
            <form onSubmit={(e) => { e.preventDefault(); handleEditSalle(); }}>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={editedSalle.name}
                                onChange={handleInputChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        
                        
                        <div className="col-12 mb-3">
                            <textarea name="description"
                                placeholder="Description"
                                value={editedSalle.description} onChange={handleInputChange} className="border p-2 w-full"></textarea>
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