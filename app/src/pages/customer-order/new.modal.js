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
import { customerOrderServices } from 'api/customer-order/index';
import { warehouseServices } from 'api/warehouse/index';
import { customerServices } from 'api/customer/index';
import DetailModal from './detail.modal';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const CustomerOrderNewModal = (props) => {
    const { open, onClose } = props;
    const [modalData, setModalData] = React.useState({});
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const [openDetail, setOpenDetail] = React.useState(false);
    const [orderDetails, setOrderDetails] = React.useState([]);

    const { data: warehouses } = useQuery({
        queryKey: ['warehouses'],
        queryFn: warehouseServices.getAll
    });

    const { data: customers } = useQuery({
        queryKey: ['customers'],
        queryFn: customerServices.getAll
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setModalData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const mutation = useMutation({
        mutationFn: customerOrderServices.create,
        onSuccess: (response) => {
            dispatch(snackbarActions.open({ message: response.message, severity: 'success' }));
            queryClient.invalidateQueries({ queryKey: ['customerOrders'] });
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
        setOrderDetails([]);
    };

    const handleOpenDetail = () => {
        setOpenDetail(true);
    };

    const handleAddDetail = (detail) => {
        if (orderDetails.some((item) => item.MaterialID === detail.MaterialID)) {
            const newOrderDetails = orderDetails.map((item) => {
                if (item.MaterialID === detail.MaterialID) {
                    return {
                        ...item,
                        Quantity: Number(item.Quantity) + Number(detail.Quantity)
                    };
                }
                return item;
            });
            setOrderDetails(newOrderDetails);
            setModalData((prev) => ({
                ...prev,
                TotalPrice: prev.TotalPrice + detail.Price * detail.Quantity
            }));
            return;
        }
        const newOrderDetails = [...orderDetails, detail];
        setOrderDetails(newOrderDetails);
        const totalPrice = newOrderDetails.reduce((acc, cur) => acc + cur.Price * cur.Quantity, 0);
        setModalData((prev) => ({
            ...prev,
            TotalPrice: totalPrice
        }));
    };

    const handleDeleteDetail = (index) => {
        setOrderDetails((prev) => prev.filter((_, i) => i !== index));
        setModalData((prev) => ({
            ...prev,
            TotalPrice: prev.TotalPrice - orderDetails[index].Price * orderDetails[index].Quantity
        }));
    };

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} keepMounted>
            <DetailModal open={openDetail} onClose={() => setOpenDetail(false)} onSubmit={handleAddDetail} />
            <DialogTitle>Create New CustomerOrder</DialogTitle>
            <DialogContent>
                <Grid container spacing={5}>
                    <Grid item xs={4}>
                        <Grid container spacing={2} direction="column">
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">Order ID</Typography>
                                <TextField
                                    fullWidth
                                    name="OrderID"
                                    onChange={handleChange}
                                    required
                                    value={modalData.OrderID || ''}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">Order Date</Typography>
                                <TextField
                                    fullWidth
                                    name="OrderDate"
                                    onChange={handleChange}
                                    type="date"
                                    disabled
                                    value={modalData.OrderDate || new Date().toISOString().slice(0, 10)}
                                    variant="outlined"
                                />
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
                                <Typography variant="subtitle1">Customer</Typography>
                                <TextField
                                    fullWidth
                                    name="CustomerID"
                                    onChange={handleChange}
                                    required
                                    select
                                    value={modalData.CustomerID || ''}
                                    variant="outlined"
                                >
                                    <MenuItem value="">Select Customer</MenuItem>
                                    {customers?.map((customer) => (
                                        <MenuItem key={customer.CustomerID} value={customer.CustomerID}>
                                            {customer.CustomerName}
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
                                <Button variant="contained" color="primary" onClick={handleOpenDetail}>
                                    Add
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <TableContainer sx={{ marginTop: 2 }} component={Paper}>
                                    <Table sx={{ minWidth: 500 }}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">Material Name</TableCell>
                                                <TableCell align="left">Catgeory Name</TableCell>
                                                <TableCell align="left">Unit Name</TableCell>
                                                <TableCell align="left">Price</TableCell>
                                                <TableCell align="left">Quantity</TableCell>
                                                <TableCell align="left">Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {orderDetails.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell align="left">{row.MaterialName}</TableCell>
                                                    <TableCell align="left">{row.CategoryName}</TableCell>
                                                    <TableCell align="left">{row.UnitName}</TableCell>
                                                    <TableCell align="left">{row.Price}</TableCell>
                                                    <TableCell align="left">{row.Quantity}</TableCell>
                                                    <TableCell align="left">
                                                        <Button variant="contained" color="error" onClick={() => handleDeleteDetail(index)}>
                                                            Delete
                                                        </Button>
                                                    </TableCell>
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

export default CustomerOrderNewModal;

CustomerOrderNewModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};
