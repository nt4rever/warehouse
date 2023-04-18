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
import { userServices } from 'api/user/index';
import TablePaginationActions from './../../components/PaginationAction/index';
import UserEditModal from './edit.modal';
import UserNewModal from './new.modal';
import { useSelector } from 'react-redux';
import { ROLES } from 'utils/constant';

const User = () => {
    const { currentUser } = useSelector((state) => state.auth);
    const { data } = useQuery({
        queryKey: ['users'],
        queryFn: userServices.getAll
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
            <UserEditModal open={modalEdit.open} data={modalEdit.data} onClose={handleCloseModal} />
            <UserNewModal open={modalNew} onClose={() => setModalNew(false)} />
            {currentUser?.RoleID === ROLES.ADMIN && (
                <Button variant="contained" color="primary" onClick={() => setModalNew(true)}>
                    Create
                </Button>
            )}

            <TableContainer sx={{ marginTop: 2 }} component={Paper}>
                <Table sx={{ minWidth: 500 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">User ID</TableCell>
                            <TableCell align="left">User Name</TableCell>
                            <TableCell align="left">Firs tName</TableCell>
                            <TableCell align="left">Last Name</TableCell>
                            <TableCell align="left">Role</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0 ? data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data)?.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="left">{row.UserID}</TableCell>
                                <TableCell align="left">{row.UserName}</TableCell>
                                <TableCell align="left">{row.FirstName}</TableCell>
                                <TableCell align="left">{row.LastName}</TableCell>
                                <TableCell align="left">{row.RoleName}</TableCell>
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

export default User;
