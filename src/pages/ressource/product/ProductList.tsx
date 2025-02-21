import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/core/hooks';
import { ressourceActionThunk } from '@/redux/app/ressource';
import { Validate } from '@/core';
import { AddProductModal, EditProductModal, ProductsTable } from '@/core/components';

export const ProductList: React.FC = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.ressource.products);
    const selectedProduct = useAppSelector((state) => state.ressource.selectedProduct);
    const [isLoading, setIsLoading] = useState(false);

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

    const deleteProduct = async (event: React.MouseEvent) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await dispatch(ressourceActionThunk.deleteProduct(selectedProduct?.id));
            // @ts-ignore
            $('#delete-product').modal('hide');
        } catch (error) {
            console.error('Failed to Delete patient:', error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Liste des Produits</h1>
            <button
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                data-bs-toggle="modal"
                data-bs-target="#addNewProduct"
            >
                Ajouter un Produit
            </button>
            <div className="overflow-x-auto">
                <div className="overflow-x-auto">
                {products && products.length ? (
                        <ProductsTable data={products} />
                    ) : (
                        
                            <div className="card-body border-top pt-4 d-flex align-items-center justify-content-center">
                                <div className="row mt-5">
                                    <div className="col-12 text-center">
                                        <h5>Chargement des données...</h5>
                                        <div
                                            className="spinner-border text-primary mt-4"
                                            role="status"
                                        >
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                    )}
                </div>
            </div>

            <AddProductModal/>
            <EditProductModal product={selectedProduct}/>
            <Validate
                id="delete-product"
                isLoading={isLoading}
                method={deleteProduct}
                itemid={selectedProduct?.id}
                title="Supression d'un Produit"
                message="Êtest-vous sûr de supprimer cet Produit?"
                severity="danger"
            />

        </div>
    );
};
