import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';

const DataTable = ({ columns, rows }) => (
    <div style={{ height: '80vh' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
                pagination: { paginationModel: { pageSize: 5 } }
            }}
            pageSizeOptions={[5, 10, 25]}
        />
    </div>
);

DataTable.propTypes = {
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired
};

export default DataTable;
