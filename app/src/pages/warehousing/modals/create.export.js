import React from 'react';
import { PropTypes } from 'prop-types';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    MenuItem,
    Paper,
    Slide,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Table
} from '@mui/material';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { snackbarActions } from 'store/reducers/snackbar';
import { warehouseServices } from 'api/warehouse/index';
import { warehouseExportServices } from 'api/warehouse-export/index';
import { customerOrderServices } from 'api/customer-order/index';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const WarehouseExportNewModal = (props) => {
    const { open, onClose } = props;
    const [modalData, setModalData] = React.useState({});
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const { data: warehouses } = useQuery({
        queryKey: ['warehouses'],
        queryFn: warehouseServices.getAll
    });

    const { data: orders } = useQuery({
        queryKey: ['orders'],
        queryFn: customerOrderServices.getAll
    });

    const { data: orderDetails } = useQuery({
        queryKey: ['orderDetails', { id: modalData.OrderID }],
        queryFn: () => customerOrderServices.getDetails(modalData.OrderID),
        enabled: Boolean(modalData.OrderID)
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setModalData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const mutation = useMutation({
        mutationFn: warehouseExportServices.create,
        onSuccess: (response) => {
            dispatch(snackbarActions.open({ message: response.message, severity: 'success' }));
            queryClient.invalidateQueries({ queryKey: ['warehouseExports'] });
        },
        onError: (error) => {
            const message = error.response.data.message;
            dispatch(snackbarActions.open({ message: message, severity: 'error' }));
        }
    });

    const handleSubmit = () => {
        mutation.mutate(
            { ...modalData, OrderDetails: orderDetails },
            {
                onSuccess: () => {
                    handleClose();
                    setModalData({});
                }
            }
        );
    };

    const handleClose = () => {
        onClose();
        setModalData({});
    };

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} keepMounted>
            <DialogTitle>Create New Warehouse Export</DialogTitle>
            <DialogContent>
                <Grid container spacing={5}>
                    <Grid item xs={4}>
                        <Grid container spacing={2} direction="column">
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">Export ID</Typography>
                                <TextField
                                    fullWidth
                                    name="ExportID"
                                    onChange={handleChange}
                                    required
                                    value={modalData.ExportID || ''}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">Export Date</Typography>
                                <TextField
                                    fullWidth
                                    name="ExportDate"
                                    onChange={handleChange}
                                    type="date"
                                    disabled
                                    value={modalData.ExportDate || new Date().toISOString().slice(0, 10)}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">Order</Typography>
                                <TextField
                                    fullWidth
                                    name="OrderID"
                                    onChange={handleChange}
                                    required
                                    select
                                    value={modalData.OrderID || ''}
                                    variant="outlined"
                                >
                                    <MenuItem value="">Select Order</MenuItem>
                                    {orders?.map((order) => (
                                        <MenuItem key={order.OrderID} value={order.OrderID}>
                                            {order.OrderID}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">Warehouse</Typography>
                                <TextField
                                    fullWidth
                                    name="WarehouseID"
                                    onChange={handleChange}
                                    required
                                    select
                                    value={modalData.WarehouseID || ''}
                                    variant="outlined"
                                >
                                    <MenuItem value="">Select Warehouse</MenuItem>
                                    {warehouses?.map((warehouse) => (
                                        <MenuItem key={warehouse.WarehouseID} value={warehouse.WarehouseID}>
                                            {warehouse.WarehouseName}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">Total Price</Typography>
                                <TextField fullWidth disabled value={modalData.TotalPrice || 0} variant="outlined" />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container spacing={2} direction="column">
                            <Grid item xs={12} container justifyContent="space-between" alignItems="center">
                                <Typography variant="subtitle1">Order Details</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TableContainer sx={{ marginTop: 2 }} component={Paper}>
                                    <Table sx={{ minWidth: 500 }}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">Material Name</TableCell>
                                                <TableCell align="left">Category Name</TableCell>
                                                <TableCell align="left">Unit Name</TableCell>
                                                <TableCell align="left">Price</TableCell>
                                                <TableCell align="left">Quantity</TableCell>
                                                <TableCell align="left">Status</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {orderDetails?.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell align="left">{row.MaterialName}</TableCell>
                                                    <TableCell align="left">{row.CategoryName}</TableCell>
                                                    <TableCell align="left">{row.UnitName}</TableCell>
                                                    <TableCell align="left">{row.Price}</TableCell>
                                                    <TableCell align="left">{row.Quantity}</TableCell>
                                                    <TableCell align="left"></TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default WarehouseExportNewModal;

WarehouseExportNewModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};
