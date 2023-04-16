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
import { employeeServices } from 'api/employeeServices/index';
import TablePaginationActions from './../../components/PaginationAction/index';
import EmployeeEditModal from './edit.modal';
import EmployeeNewModal from './new.modal';

const Employee = () => {
    const { data } = useQuery({
        queryKey: ['employees'],
        queryFn: employeeServices.getAll
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
            <EmployeeEditModal open={modalEdit.open} data={modalEdit.data} handleClose={handleCloseModal} />
            <EmployeeNewModal open={modalNew} handleClose={() => setModalNew(false)} />
            <Button variant="contained" color="primary" onClick={() => setModalNew(true)}>
                Create
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Employee ID</TableCell>
                            <TableCell align="left">Employee Name</TableCell>
                            <TableCell align="left">PhoneNumber</TableCell>
                            <TableCell align="left">Employee Address</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0 ? data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data)?.map((row) => (
                            <TableRow key={row.name} onClick={(e) => handleClickDetail(row)}>
                                <TableCell align="left">{row.EmplID}</TableCell>
                                <TableCell align="left">{row.EmplName}</TableCell>
                                <TableCell align="left">{row.PhoneNumber}</TableCell>
                                <TableCell align="left">{row.Address}</TableCell>
                                <TableCell align="left">
                                    <Stack direction="row" spacing={2}>
                                        <Button variant="contained" color="primary">
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

export default Employee;
