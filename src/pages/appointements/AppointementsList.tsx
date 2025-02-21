import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/core/hooks';
import { appointementActionThunk } from '@/redux/app';
import { AddAppointementModal, AppointementsTable, DetailAppointementModal, EditAppointementModal } from '@/core/components';
import { Validate } from '@/core';

export const AppointementsList: React.FC = () => {
    const dispatch = useAppDispatch();
    const appointements = useAppSelector((state) => state.appointement.appointements);
    const appointement = useAppSelector((state) => state.appointement.selectedItem);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchAppointements = async () => {
            await dispatch(appointementActionThunk.getAppointements());
        };

        fetchAppointements();

        return () => {
            setIsLoading(false);
        };
    }, [dispatch]);

    const deleteAppointement = async (event: React.MouseEvent) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await dispatch(appointementActionThunk.deleteAppointement(appointement?.id));
            // @ts-ignore
            $('#delete-appointement').modal('hide');
        } catch (error) {
            console.error('Failed to Delete patient:', error);
        } finally {
            setIsLoading(false);
        }
    };
    const passedAppointement = async (event: React.MouseEvent) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await dispatch(appointementActionThunk.passedAppointement(appointement?.id));
            // @ts-ignore
            $('#validate-appointement').modal('hide');
        } catch (error) {
            console.error('Failed to Delete patient:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Liste des Rendez-vous</h1>
            <button
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                data-bs-toggle="modal"
                data-bs-target="#addNewAppointement"
            >
                Ajouter un Rendez-vous
            </button>
            <div className="overflow-x-auto">
                <div className="overflow-x-auto">
                {appointements && appointements.length ? (
                        <AppointementsTable data={appointements} />
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

            <DetailAppointementModal data={appointement}/>
            <EditAppointementModal data={appointement}/>
            <AddAppointementModal/>
            <Validate
                id="delete-appointement"
                isLoading={isLoading}
                method={deleteAppointement}
                itemid={appointement?.id}
                title="Supression d'un rendez-vous"
                message="Êtest-vous sûr de supprimer ce rendez-vous?"
                severity="danger"
            />
            <Validate
                id="validate-appointement"
                isLoading={isLoading}
                method={passedAppointement}
                itemid={appointement?.id}
                title="Rendez-vous Passé"
                message="Êtest-vous sûr de marqué ce rendez-vous comme passé?"
                severity="success"
            />
        </div>
    );
};
