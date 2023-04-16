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
import { materialServices } from 'api/material/index';
import TablePaginationActions from './../../components/PaginationAction/index';
import MaterialEditModal from './edit.modal';
import MaterialNewModal from './new.modal';

const Material = () => {
    const { data } = useQuery({
        queryKey: ['materials'],
        queryFn: materialServices.getAll
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
            <MaterialEditModal open={modalEdit.open} data={modalEdit.data} onClose={handleCloseModal} />
            <MaterialNewModal open={modalNew} onClose={() => setModalNew(false)} />
            <Button variant="contained" color="primary" onClick={() => setModalNew(true)}>
                Create
            </Button>
            <TableContainer sx={{ marginTop: 2 }} component={Paper}>
                <Table sx={{ minWidth: 500 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Material Code</TableCell>
                            <TableCell align="left">Material Name</TableCell>
                            <TableCell align="left">Category Name</TableCell>
                            <TableCell align="left">Unit Name</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0 ? data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data)?.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="left">{row.MaterialCode}</TableCell>
                                <TableCell align="left">{row.MaterialName}</TableCell>
                                <TableCell align="left">{row.CategoryName}</TableCell>
                                <TableCell align="left">{row.UnitName}</TableCell>
                                <TableCell align="left">{row.Price}</TableCell>
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

export default Material;