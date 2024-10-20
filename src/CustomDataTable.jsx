import React from 'react';
import DataTable from 'react-data-table-component';

const CustomDataTable = ({ columns, data, title }) => {
    const customStyles = {
        headCells: {
            style: {
                fontSize: '12px',
                fontWeight: 'bold',
                backgroundColor: '#f4f4f4',
            },
        },
        rows: {
            style: {
                fontSize: '10px',
                color: '#333',
            },
        },
    };

    return (
        <div>
            <DataTable
                title={title}
                columns={columns}
                data={data}
                customStyles={customStyles}
                pagination
                highlightOnHover
                pointerOnHover
            />
        </div>
    );
};

export default CustomDataTable;
