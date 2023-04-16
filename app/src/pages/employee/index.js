import React from 'react';
import {
    Button,
    Paper,
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
import TablePaginationActions from './../../components/PaginationAction/index';
import EmployeeNewModal from './new.modal';
import { employeeServices } from 'api/employee/index';

const Employee = () => {
    const { data } = useQuery({
        queryKey: ['employees'],
        queryFn: employeeServices.getAll
    });

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [modalNew, setModalNew] = React.useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <React.Fragment>
            <EmployeeNewModal open={modalNew} onClose={() => setModalNew(false)} />
            <Button variant="contained" color="primary" onClick={() => setModalNew(true)}>
                Create
            </Button>
            <TableContainer sx={{ marginTop: 2 }} component={Paper}>
                <Table sx={{ minWidth: 500 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Branch Name</TableCell>
                            <TableCell align="left">Employee ID</TableCell>
                            <TableCell align="left">User ID</TableCell>
                            <TableCell align="left">UserName</TableCell>
                            <TableCell align="left">FullName</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0 ? data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data)?.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="left">{row.BranchName}</TableCell>
                                <TableCell align="left">{row.EmployeeID}</TableCell>
                                <TableCell align="left">{row.UserID}</TableCell>
                                <TableCell align="left">{row.UserName}</TableCell>
                                <TableCell align="left">{row.FirstName + ' ' + row.LastName}</TableCell>
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
