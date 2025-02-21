import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/core/hooks';
import { ressourceActionThunk } from '@/redux/app/ressource';
import { AddSalleModal, EditSalleModal, SallesTable } from '@/core/components';
import { Validate } from '@/core';

export const SallesList: React.FC = () => {
    const dispatch = useAppDispatch();
    const salles = useAppSelector((state) => state.ressource.salle);
    const selectedSalle = useAppSelector((state) => state.ressource.selectedSalle);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchSalles = async () => {
            await dispatch(ressourceActionThunk.getSalles());
        };
        fetchSalles();
        // cleanup function
        return () => {
            setIsLoading(false);
        };
    }, [dispatch]);

    const deleteSalle = async (event: React.MouseEvent) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await dispatch(ressourceActionThunk.deleteSalle(selectedSalle?.id));
            // @ts-ignore
            $('#delete-salle').modal('hide');
        } catch (error) {
            console.error('Failed to Delete patient:', error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Liste des Salles</h1>
            <button
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                data-bs-toggle="modal"
                data-bs-target="#addNewSalle"
            >
                Ajouter une Salle
            </button>
            <div className="overflow-x-auto">
                <div className="overflow-x-auto">
                {salles && salles.length ? (
                        <SallesTable data={salles} />
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

            <EditSalleModal salle={selectedSalle}/>
            <AddSalleModal/>
            <Validate
                id="delete-salle"
                isLoading={isLoading}
                method={deleteSalle}
                itemid={selectedSalle?.id}
                title="Supression d'une Salle"
                message="Êtest-vous sûr de supprimer cette Salle?"
                severity="danger"
            />

        </div>
    );
};
