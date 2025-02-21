import { DataTable, useAppDispatch } from '@/core';
import { selectItem } from '@/redux/app';


export const AppointementsTable: React.FC<{ data: any[] }> = ({ data }) => {
    const dispatch = useAppDispatch() ;
    const actionsConfig = [
        { icon: 'ti ti-eye', className: 'btn-primary', onClick: (item) => showItem(item) },
        { icon: 'ti ti-pencil', className: 'btn-warning', onClick: (item) => editiItem(item) },
        { icon: 'ti ti-trash', className: 'btn-danger', onClick: (item) => deleteItem(item) },
        {
            icon: 'ti ti-progress-check',
            className: 'btn-info',
            onClick: (item) => validateItem(item),
            condition: (item: any) => item.status === 'pending'
        }
    ];
    

    const deleteItem = (item: any) => {
        dispatch(selectItem(item));
        $('#delete-appointement').modal('show');
    };

    const validateItem = (item: any) => {
        dispatch(selectItem(item));
        $('#validate-appointement').modal('show');
    };

    const showItem = (item: any) => {
        dispatch(selectItem(item));
        $('#detailAppointement').modal('show');
    };

    const editiItem = (item: any) => {
        dispatch(selectItem(null));
        dispatch(selectItem(item));
        $('#editAppointement').modal('show');
    };

    const headers = [
        { text: 'Patient', value: 'patient', type: 'patient' },
        { text: 'Date', value: 'dateTime', type: 'date' },
        { text: 'Durée', value: 'duration', type: 'number' },
        { text: 'Status', value: 'status', type: 'text' },
        // { text: 'Docteur', value: 'gender', type: 'text' },
    ];



    return (
        <>
            <DataTable
                items={data}
                headers={headers}
                pageSize={5}
                actionsConfig={actionsConfig}
                buttonType="simple"
            />
        </>
    );
};
