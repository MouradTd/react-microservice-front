import { useAppDispatch } from '@/core';
import {Modal} from '@/core/constants';
import { ressourceActionThunk } from '@/redux/app';
import React, { useState, useEffect } from 'react';

interface EditProductModalProps {
    product: {
        id: number;
        name: string;
        description: string;
        price:number | null;
        quantity:number | null;
    };
    
}

export const EditProductModal: React.FC<EditProductModalProps> = ({ product }) => {
    const [editedProduct, setEditedProduct] = useState(product || {
        id: 0,
        name: '',
        description: '',
        price:null,
        quantity:null
       
    });
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (product) {
            setEditedProduct(product);
        }
    }, [product]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    const handleEditProduct = async () => {
        setIsLoading(true);
        try {
            await dispatch(ressourceActionThunk.EditProduct(editedProduct,editedProduct.id)); 
           // @ts-ignore
           $('#edit-product').modal('hide');
        } catch (error) {
            console.error('Failed to edit product:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal id="edit-product" title="Edit Produit" size='md'>
            <form onSubmit={(e) => { e.preventDefault(); handleEditProduct(); }}>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={editedProduct.name}
                                onChange={handleInputChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        
                        <div className="col-12 mb-3">
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={editedProduct.price}
                                onChange={handleInputChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="col-12 mb-3">
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Quantity"
                                value={editedProduct.quantity}
                                onChange={handleInputChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        
                        <div className="col-12 mb-3">
                            <textarea name="description"
                                placeholder="Description"
                                value={editedProduct.description} onChange={handleInputChange} className="border p-2 w-full"></textarea>
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