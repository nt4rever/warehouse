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
import { useQuery } from '@tanstack/react-query';
import { warehouseServices } from 'api/warehouse/index';
import TablePaginationActions from './../../components/PaginationAction/index';
import WarehouseEditModal from './edit.modal';
import WarehouseNewModal from './new.modal';

const Warehouse = () => {
    const { data } = useQuery({
        queryKey: ['warehouses'],
        queryFn: warehouseServices.getAll
    });

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [modalEdit, setModalEdit] = React.useState({
        open: false,
        data: {}
    });
    const [modalNew, setModalNew] = React.useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleClickDetail = (row) => {
        setModalEdit({
            open: true,
            data: row
        });
    };

    const handleCloseModal = () => {
        setModalEdit({
            open: false,
            data: {}
        });
    };

    return (
        <React.Fragment>
            <WarehouseEditModal open={modalEdit.open} data={modalEdit.data} onClose={handleCloseModal} />
            <WarehouseNewModal open={modalNew} onClose={() => setModalNew(false)} />
            <Button variant="contained" color="primary" onClick={() => setModalNew(true)}>
                Create
            </Button>
            <TableContainer sx={{ marginTop: 2 }} component={Paper}>
                <Table sx={{ minWidth: 500 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Warehouse ID</TableCell>
                            <TableCell align="left">Warehouse Name</TableCell>
                            <TableCell align="left">PhoneNumber</TableCell>
                            <TableCell align="left">Warehouse Address</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0 ? data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data)?.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="left">{row.WarehouseID}</TableCell>
                                <TableCell align="left">{row.WarehouseName}</TableCell>
                                <TableCell align="left">{row.PhoneNumber}</TableCell>
                                <TableCell align="left">{row.Address}</TableCell>
                                <TableCell align="left">
                                    <Stack direction="row" spacing={2}>
                                        <Button variant="contained" color="primary" onClick={(e) => handleClickDetail(row)}>
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
                                rowsPerPageOptions={[25, 50, 100, { label: 'All', value: -1 }]}
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
        </React.Fragment>
    );
};

export default Warehouse;
