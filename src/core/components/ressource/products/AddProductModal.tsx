import { useAppDispatch } from '@/core';
import {Modal} from '@/core/constants';
import { ressourceActionThunk } from '@/redux/app';
import React, { useState } from 'react';

export const AddProductModal: React.FC = () => {
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price:0 || null,
        quantity:0 || null
    });
    const [isLoading ,setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleAddProduct = async () => {
        setIsLoading(true);
        try {
            await dispatch(ressourceActionThunk.AddProduct(newProduct)); // Dispatch the action to add a new patient
            // Optionally reset the form or close the modal here
            setNewProduct({
                 name: '',
                 description: '',
                 price:null,
                 quantity:null
            });
            // @ts-ignore
            $('#addNewProduct').modal('hide');
        } catch (error) {
            console.error('Failed to add Product:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal id="addNewProduct" title="Nouveau Produit"  size='md'>
            <form onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }}>
                <div className="modal-body">
                <div className="row">
                        <div className="col-12 mb-3">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={newProduct.name}
                                onChange={handleInputChange}
                                className="border p-2 w-full"
                            />
                        </div>

                        <div className="col-12 mb-3">
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={newProduct.price}
                                onChange={handleInputChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="col-12 mb-3">
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Quantity"
                                value={newProduct.quantity}
                                onChange={handleInputChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="col-12 mb-3">
                            <textarea name="description"
                                placeholder="Description"
                                value={newProduct.description} onChange={handleInputChange} className="border p-2 w-full"></textarea>
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
