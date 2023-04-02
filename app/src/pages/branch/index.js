import React from 'react';
import DataTable from 'components/DataTable/index';
import { Button, Stack } from '@mui/material/';
import { dispatch } from 'store/index';
import { snackbarActions } from 'store/reducers/snackbar';
import { useQuery } from '@tanstack/react-query';
import { branchServices } from 'api/branch/index';

const columns = [
    { field: 'BranchID', headerName: 'BranchID', flex: 1 },
    {
        field: 'BranchName',
        headerName: 'Branch Name',
        editable: true,
        flex: 1
    },
    {
        field: 'Address',
        headerName: 'Address',
        editable: true,
        flex: 1
    },
    {
        field: 'PhoneNumber',
        headerName: 'Phone Number',
        editable: true,
        flex: 1
    },
    {
        field: 'action',
        headerName: 'Action',
        sortable: false,
        flex: 1,
        renderCell: (params) => {
            const onClick = (e) => {
                const currentRow = params.row;
                dispatch(snackbarActions.open({ message: currentRow.lastName, severity: 'success', autoHideDuration: 2000 }));
            };

            return (
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" color="warning" size="small" onClick={onClick}>
                        Edit
                    </Button>
                    <Button variant="outlined" color="error" size="small" onClick={onClick}>
                        Delete
                    </Button>
                </Stack>
            );
        }
    }
];

const Branch = () => {
    const { data } = useQuery({
        queryKey: ['branch'],
        queryFn: branchServices.getAll
    });

    return <DataTable columns={columns} rows={data ? data : []} getRowId={(row) => row?.BranchID} />;
};

export default Branch;
