import { DataTable, useAppDispatch } from '@/core';
import { setSelectedDemande } from '@/redux/app';
import React, { useState, useEffect } from 'react';

export const DemandeProductTable: React.FC<{ data: any[] }> = ({ data }) => {
    const dispatch = useAppDispatch();
    const actionsConfig = [
        { icon: 'ti ti-pencil', className: 'btn-warning', onClick: (item) => editiItem(item) },
        { icon: 'ti ti-trash', className: 'btn-danger', onClick: (item) => deleteItem(item) },
        { icon: 'ti ti-progress-check', className: 'btn-success', onClick: (item) => validateItem(item),condition: (item: any) => item.status === 'pending' },
    ];

    const deleteItem = (item: any) => {
        dispatch(setSelectedDemande(item));
        $('#delete-demande').modal('show');
    };

    const editiItem = (item: any) => {
        dispatch(setSelectedDemande(item));
        $('#edit-demande').modal('show');
    };

    const validateItem = (item: any) => {
        dispatch(setSelectedDemande(item));
        $('#validate-demande').modal('show');
    };

    const headers = [
        { text: 'Produit', value: 'produit', type: 'produit' },
        { text: 'Description', value: 'usageDescription', type: 'text' },
        { text: 'Quantite', value: 'quantity', type: 'number' },
        { text: 'Status', value: 'status', type: 'text' },
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [itemPerPage, setItemPerPage] = useState(15);
    const [filteredData, setFilteredData] = useState(data);

    const filter = () => {
        setFilteredData(
            data.filter((item: any) => {
                const combinedFields =
                    `${item.produit.name} ${item.usageDescription}`.toLowerCase();
                const searchWords = searchQuery.toLowerCase().split(' ');
                return (
                    searchWords.every((word) => combinedFields.includes(word))
                );
            })
        );
    };

    useEffect(() => {
        filter();
    }, [searchQuery, data]);

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
