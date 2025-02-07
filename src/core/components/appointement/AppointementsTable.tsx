import { DataTable } from '@/core';


export const AppointementsTable: React.FC<{ data: any[] }> = ({ data }) => {
    const actionsConfig = [
        
    ];

    const headers = [
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
