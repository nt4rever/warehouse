import React from 'react';
import {
    Button,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow
} from '@mui/material/';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { inventoryServices } from 'api/inventory/index';
import TablePaginationActions from '../../components/PaginationAction/index';
import CreateInventoryModal from './modals/create.inventory';
import EditInventoryModal from './modals/edit.modal';
import { dispatch } from 'store/index';
import { snackbarActions } from 'store/reducers/snackbar';

const Inventory = () => {
    const { data } = useQuery({
        queryKey: ['inventories'],
        queryFn: inventoryServices.getAll
    });

    const queryClient = useQueryClient();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [modalNew, setModalNew] = React.useState(false);
    const [modalEdit, setModalEdit] = React.useState({
        open: false,
        data: {}
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleEdit = (row) => {
        setModalEdit({
            open: true,
            data: row
        });
    };

    const mutation = useMutation({
        mutationFn: inventoryServices.delete,
        onSuccess: (response) => {
            dispatch(snackbarActions.open({ message: response.message, severity: 'success' }));
            queryClient.invalidateQueries({ queryKey: ['inventories'] });
        },
        onError: (error) => {
            const message = error.response.data.message;
            dispatch(snackbarActions.open({ message: message, severity: 'error' }));
        }
    });

    const handleDelete = (id) => {
        mutation.mutate(id);
    };

    return (
        <>
            <CreateInventoryModal open={modalNew} onClose={() => setModalNew(false)} />
            <EditInventoryModal open={modalEdit.open} data={modalEdit.data} onClose={() => setModalEdit({ data: {}, open: false })} />
            <Button variant="contained" color="primary" onClick={() => setModalNew(true)}>
                Create
            </Button>
            <TableContainer sx={{ marginTop: 2 }} component={Paper}>
                <Table sx={{ minWidth: 500 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Inventory ID</TableCell>
                            <TableCell align="left">Quantity</TableCell>
                            <TableCell align="left">Material</TableCell>
                            <TableCell align="left">Unit</TableCell>
                            <TableCell align="left">Category</TableCell>
                            <TableCell align="left">Warehouse</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0 ? data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data)?.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="left">{row.InventoryID}</TableCell>
                                <TableCell align="left">{row.Quantity}</TableCell>
                                <TableCell align="left">{row.MaterialName}</TableCell>
                                <TableCell align="left">{row.UnitName}</TableCell>
                                <TableCell align="left">{row.CategoryName}</TableCell>
                                <TableCell align="left">{row.WarehouseName}</TableCell>
                                <TableCell align="left">
                                    <Stack direction="row" spacing={2}>
                                        <Button variant="contained" color="error" onClick={() => handleDelete(row.InventoryID)}>
                                            Delete
                                        </Button>
                                        <Button variant="contained" color="primary" onClick={() => handleEdit(row)}>
                                            Edit
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                count={data?.length || 0}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page'
                                    },
                                    native: true
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
};

export default Inventory;
