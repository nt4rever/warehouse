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
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import TablePaginationActions from './../../components/PaginationAction/index';
import { formatDate } from './../../utils/helper';
import { warehouseExportServices } from './../../api/warehouse-export/index';
import WarehouseExportNewModal from './modals/create.export';

const WarehouseExport = () => {
    const { data } = useQuery({
        queryKey: ['warehouseExports'],
        queryFn: warehouseExportServices.getAll
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
            <WarehouseExportNewModal open={modalNew} onClose={() => setModalNew(false)} />
            <Button variant="contained" color="primary" onClick={() => setModalNew(true)}>
                Create
            </Button>
            <TableContainer sx={{ marginTop: 2 }} component={Paper}>
                <Table sx={{ minWidth: 500 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Export ID</TableCell>
                            <TableCell align="left">Order ID</TableCell>
                            <TableCell align="left">Employee</TableCell>
                            <TableCell align="left">Customer Name</TableCell>
                            <TableCell align="left">Warehouse Name</TableCell>
                            <TableCell align="left">Export Date</TableCell>
                            <TableCell align="left">Total Price</TableCell>
                            {/* <TableCell align="left">Action</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0 ? data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data)?.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="left">{row.ExportID}</TableCell>
                                <TableCell align="left">{row.OrderID}</TableCell>
                                <TableCell align="left">
                                    {row.EmployeeFirstName} {row.EmployeeLastName}
                                </TableCell>
                                <TableCell align="left">{row.CustomerName}</TableCell>
                                <TableCell align="left">{row.WarehouseName}</TableCell>
                                <TableCell align="left">{formatDate(row.OrderDate)}</TableCell>
                                <TableCell align="left">{row.TotalPrice}</TableCell>
                                {/* <TableCell align="left">
                                    <Stack direction="row" spacing={2}>
                                        <Button variant="contained" color="primary" onClick={(e) => handleClickDetail(row)}>
                                            Edit
                                        </Button>
                                    </Stack>
                                </TableCell> */}
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

export default WarehouseExport;
