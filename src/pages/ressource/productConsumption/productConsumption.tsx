import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/core/hooks';
import { ressourceActionThunk } from '@/redux/app/ressource';
import { AddDemandeConsumption, DemandeProductTable, EditDemandeModal } from '@/core/components';
import { Validate } from '@/core';


export const ProductConsumption: React.FC = () => {
    const dispatch = useAppDispatch();
    const demandes = useAppSelector((state) => state.ressource.demande);
    const selectedDemande = useAppSelector((state) => state.ressource.selectedDemande);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchDemandes = async () => {
            await dispatch(ressourceActionThunk.getDemande());
        };
        fetchDemandes();
        // cleanup function
        return () => {
            setIsLoading(false);
        };
    }, [dispatch]);

    const deleteDemande = async (event: React.MouseEvent) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await dispatch(ressourceActionThunk.deleteDemande(selectedDemande?.id));
            // @ts-ignore
            $('#delete-demande').modal('hide');
        } catch (error) {
            console.error('Failed to Delete patient:', error);
        } finally {
            setIsLoading(false);
        }
    };
    const validateDemande = async (event: React.MouseEvent) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await dispatch(ressourceActionThunk.validateDemande(selectedDemande?.id));
            // @ts-ignore
            $('#validate-demande').modal('hide');
        } catch (error) {
            console.error('Failed to Delete patient:', error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Liste des demandes de produits</h1>
            <button
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                data-bs-toggle="modal"
                data-bs-target="#addNewDemande"
            >
                Ajouter une demande
            </button>
            <div className="overflow-x-auto">
                <div className="overflow-x-auto">
                {demandes && demandes.length ? (
                        <DemandeProductTable data={demandes} />
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

            <AddDemandeConsumption/>
            <EditDemandeModal demande={selectedDemande}/>
            <Validate
                id="validate-demande"
                isLoading={isLoading}
                method={validateDemande}
                itemid={selectedDemande?.id}
                title="Validation"
                message="Êtest-vous sûr de valider cette demande?"
                severity="success"
            />
            <Validate
                id="delete-demande"
                isLoading={isLoading}
                method={deleteDemande}
                itemid={selectedDemande?.id}
                title="Supression d'une demande"
                message="Êtest-vous sûr de supprimer cette demande?"
                severity="danger"
            />

        </div>
    );
};
