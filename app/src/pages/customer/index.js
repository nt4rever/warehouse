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
import { customerServices } from 'api/customer/index';
import TablePaginationActions from './../../components/PaginationAction/index';
import CustomerEditModal from './edit.modal';
import CustomerNewModal from './new.modal';

const Customer = () => {
    const { data } = useQuery({
        queryKey: ['customers'],
        queryFn: customerServices.getAll
    });

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
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
            <CustomerEditModal open={modalEdit.open} data={modalEdit.data} onClose={handleCloseModal} />
            <CustomerNewModal open={modalNew} onClose={() => setModalNew(false)} />
            <Button variant="contained" color="primary" onClick={() => setModalNew(true)}>
                Create
            </Button>
            <TableContainer sx={{ marginTop: 2 }} component={Paper}>
                <Table sx={{ minWidth: 500 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Customer ID</TableCell>
                            <TableCell align="left">Customer Name</TableCell>
                            <TableCell align="left">PhoneNumber</TableCell>
                            <TableCell align="left">Customer Address</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0 ? data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data)?.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="left">{row.CustomerID}</TableCell>
                                <TableCell align="left">{row.CustomerName}</TableCell>
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
        </React.Fragment>
    );
};

export default Customer;
