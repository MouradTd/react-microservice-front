import { DataTable, useAppDispatch } from '@/core';
import helpers from '@/core/utils/helpers';
import { selectPatient } from '@/redux/app';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const PatientTable: React.FC<{ data: any[] }> = ({ data }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const actionsConfig = [
        { icon: 'ti ti-eye', className: 'btn-primary', onClick: (item) => showItem(item) },
        { icon: 'ti ti-pencil', className: 'btn-warning', onClick: (item) => editiItem(item) },
        { icon: 'ti ti-trash', className: 'btn-danger', onClick: (item) => deleteItem(item) }
    ];

    const deleteItem = (item: any) => {
        dispatch(selectPatient(item));
        $('#delete-patient').modal('show');
    };

    const showItem = (item: any) => {
        // dispatch(selectPatient(item));
        // $('#detailPatient').modal('show');
        dispatch(selectPatient(item.id));
        navigate(`/patient/${item.id}`);
    };

    const editiItem = (item: any) => {
        dispatch(selectPatient(item));
        $('#editPatient').modal('show');
    };

    const headers = [
        { text: 'Nom Complet', value: 'name', type: 'text' },
        { text: 'Age', value: 'age', type: 'text' },
        { text: 'Email', value: 'email', type: 'text' },
        { text: 'Sexe', value: 'gender', type: 'text' },
        { text: 'Date de Naissance', value: 'dateOfBirth', type: 'date' }
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [sexeQuery, setSexeQuery] = useState('-');
    const [startQuery, setStartQuery] = useState<Date | undefined>(undefined);
    const [endQuery, setEndQuery] = useState<Date | undefined>(undefined);
    const [itemPerPage, setItemPerPage] = useState(15);
    const [filteredData, setFilteredData] = useState(data);

    const filter = () => {
        setFilteredData(
            data.filter((item: any) => {
                const combinedFields =
                    `${item.name} ${item.age} ${item.email} ${item.gender} `.toLowerCase();
                const searchWords = searchQuery.toLowerCase().split(' ');
                return (
                    searchWords.every((word) => combinedFields.includes(word)) &&
                    (sexeQuery === '-' || item.gender === sexeQuery) &&
                    (!startQuery ||
                        helpers.startOfDay(item.dateOfBirth) >= helpers.startOfDay(startQuery)) &&
                    (!endQuery ||
                        helpers.startOfDay(item.dateOfBirth) <= helpers.startOfDay(endQuery))
                );
            })
        );
    };

    useEffect(() => {
        filter();
    }, [searchQuery, sexeQuery, startQuery, endQuery, data]);

    return (
        <>
            <div className="row mb-4">
                <div className="col-12">
                    <div className="d-flex align-items-center">
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            type="search"
                            className="form-control w-240 me-2"
                            placeholder="Rechercher..."
                        />

                        <div className="d-flex align-items-center ms-0">
                            <select
                                value={sexeQuery}
                                onChange={(e) => setSexeQuery(e.target.value)}
                                className="form-select ms-2 me-2 w-180"
                            >
                                <option value="-">Tout</option>
                                <option value="MALE">Homme</option>
                                <option value="FEMALE">Femme</option>
                            </select>
                        </div>
                        <div className="d-flex align-items-center ms-2">
                            <label htmlFor="start">De</label>
                            <input
                                value={startQuery ? startQuery.toISOString().split('T')[0] : ''}
                                onChange={(e) =>
                                    setStartQuery(
                                        e.target.value ? new Date(e.target.value) : undefined
                                    )
                                }
                                type="date"
                                id="start"
                                className="form-control ms-2 me-2"
                            />
                        </div>
                        <div className="d-flex align-items-center ms-0">
                            <label htmlFor="end">à</label>
                            <input
                                value={endQuery ? endQuery.toISOString().split('T')[0] : ''}
                                onChange={(e) =>
                                    setEndQuery(
                                        e.target.value ? new Date(e.target.value) : undefined
                                    )
                                }
                                type="date"
                                id="end"
                                className="form-control ms-2 me-2"
                            />
                        </div>
                        <div className="d-flex align-items-center ms-auto">
                            <label htmlFor="">Afficher</label>
                            <select
                                value={itemPerPage}
                                onChange={(e) => setItemPerPage(Number(e.target.value))}
                                className="form-select ms-2 me-2 w-120"
                            >
                                <option value="1">1</option>
                                <option value="15">15</option>
                                <option value="30">30</option>
                                <option value="45">45</option>
                                <option value="60">60</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <DataTable
                items={filteredData}
                headers={headers}
                pageSize={itemPerPage}
                actionsConfig={actionsConfig}
                buttonType="simple"
            />
        </>
    );
};
