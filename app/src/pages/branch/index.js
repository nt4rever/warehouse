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
import { dispatch } from 'store/index';
import { snackbarActions } from 'store/reducers/snackbar';
import { useQuery } from '@tanstack/react-query';
import { branchServices } from 'api/branch/index';
import TablePaginationActions from './../../components/PaginationAction/index';
import BranchModal from './edit.modal';

const Branch = () => {
    const { data } = useQuery({
        queryKey: ['branches'],
        queryFn: branchServices.getAll
    });

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [modal, setModal] = React.useState({
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

    const handleClickDetail = (row) => {
        setModal({
            open: true,
            data: row
        });
    };

    const handleCloseModal = () => {
        setModal({
            open: false,
            data: {}
        });
    };

    return (
        <React.Fragment>
            <BranchModal open={modal.open} data={modal.data} handleClose={handleCloseModal} />
            <TableContainer sx={{ marginTop: 2 }} component={Paper}>
                <Table sx={{ minWidth: 500 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Branch ID</TableCell>
                            <TableCell align="left">Branch Name</TableCell>
                            <TableCell align="left">PhoneNumber</TableCell>
                            <TableCell align="left">Branch Address</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0 ? data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data)?.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="left">{row.BranchID}</TableCell>
                                <TableCell align="left">{row.BranchName}</TableCell>
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

export default Branch;
