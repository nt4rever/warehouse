import DataTable from 'components/DataTable/index';
import { Button, Stack } from '@mui/material/index';
import { dispatch } from 'store/index';
import { snackbarActions } from 'store/reducers/snackbar';

const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    {
        field: 'firstName',
        headerName: 'First name',
        editable: true,
        flex: 1
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        editable: true,
        flex: 1
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
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

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
];

export default function Table() {
    return <DataTable columns={columns} rows={rows} />;
}
