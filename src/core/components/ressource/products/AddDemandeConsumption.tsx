import { useAppDispatch, useAppSelector } from '@/core';
import {CustomSelect, Modal} from '@/core/constants';
import { ressourceActionThunk } from '@/redux/app';
import React, { useEffect, useState } from 'react';

export const AddDemandeConsumption: React.FC = () => {
    const [newDemande, setNewDemande] = useState({
        usageDescription: '',
        quantity: 0 || null,
    });
    const [isLoading ,setIsLoading] = useState(false);
    const products = useAppSelector((state) => state.ressource.products);
    const [selectedOption, setSelectedOption] = useState<{ key: string; value: string } | undefined>(undefined);
    const dispatch = useAppDispatch();

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewDemande({ ...newDemande, [name]: value });
    };

    useEffect(() => {
        const fetchProducts = async () => {
            await dispatch(ressourceActionThunk.getProducts());
        };
        fetchProducts();
        // cleanup function
        return () => {
            setIsLoading(false);
        };
    }, [dispatch]);

    const handleAddProduct = async () => {
        setIsLoading(true);
        try {
            const formData = {
                produit_id : selectedOption.key,
                usageDescription : newDemande.usageDescription,
                quantity : newDemande.quantity,
                status:'pending'
                
            }
            await dispatch(ressourceActionThunk.AddDemande(formData)); // Dispatch the action to add a new patient
            // Optionally reset the form or close the modal here
            setNewDemande({
                usageDescription : '',
                quantity :null
            });
            // @ts-ignore
            $('#addNewDemande').modal('hide');
        } catch (error) {
            console.error('Failed to add Product:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal id="addNewDemande" title="Nouvelle Demande de produits"  size='md'>
            <form onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }}>
                <div className="modal-body">
                <div className="row">
                        <div className='col-12 mb-3'>
                            <CustomSelect
                                label="Produits"
                                placeholder="Selectionner un produits"
                                modelValue={selectedOption}
                                data={products.map((item) => ({
                                    key: item.id,
                                    value: item.name,
                                }))}
                                onUpdate={setSelectedOption}
                            />
                        </div>
                        <div className="col-12 mb-3">
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Quantite"
                                value={newDemande.quantity}
                                onChange={handleInputChange}
                                className="border p-2 w-full"
                                min="1"
                                required
                            />
                        </div>
                        
                        <div className="col-12 mb-3">
                            <textarea name="usageDescription" required
                                placeholder="Description"
                                value={newDemande.usageDescription} onChange={handleInputChange} className="border p-2 w-full"></textarea>
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
