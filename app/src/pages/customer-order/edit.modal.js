import React from 'react';
import { PropTypes } from 'prop-types';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
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
import DetailModal from './detail.modal';
import { formatDate } from 'utils/helper';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const CustomerOrderEditModal = (props) => {
    const { open, onClose, data } = props;
    const [modalData, setModalData] = React.useState({});
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const [openDetail, setOpenDetail] = React.useState(false);
    const [orderDetails, setOrderDetails] = React.useState([]);

    const orderDetailsQuery = useQuery({
        queryKey: ['orderDetails', { id: data.OrderID }],
        queryFn: () => customerOrderServices.getDetails(data.OrderID),
        staleTime: Infinity,
        onSuccess: (response) => {
            setOrderDetails(response);
        },
        enabled: Boolean(data.OrderID)
    });

    React.useEffect(() => {
        if (data.OrderID) orderDetailsQuery?.refetch();
    }, [open]);

    const mutation = useMutation({
        mutationFn: customerOrderServices.update,
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
        mutation.mutate({
            payload: { ...modalData, OrderDetails: orderDetails }
        });
        handleClose();
        setModalData({});
    };

    const handleClose = () => {
        onClose();
        setModalData({});
        setOrderDetails([]);
    };

    const handleChangeDetail = (index, event) => {
        const { name, value } = event.target;
        setOrderDetails((prev) => {
            const newOrderDetails = [...prev];
            newOrderDetails[index][name] = value;
            newOrderDetails[index].Type = 'UPDATED';
            newOrderDetails[index].OrderID = data.OrderID;
            return newOrderDetails;
        });
    };

    const handleOpenDetail = () => {
        setOpenDetail(true);
    };

    const handleAddDetail = (detail) => {
        const isMaterialExist = orderDetails.some((item) => item.MaterialID === detail.MaterialID);

        if (isMaterialExist) {
            const updatedOrderDetails = orderDetails.map((item) => {
                if (item.MaterialID === detail.MaterialID) {
                    return {
                        ...item,
                        Quantity: Number(item.Quantity) + Number(detail.Quantity),
                        Type: 'UPDATED',
                        OrderID: data.OrderID
                    };
                }
                return item;
            });

            setOrderDetails(updatedOrderDetails);
            setModalData((prevData) => ({
                ...prevData,
                TotalPrice: prevData.TotalPrice + detail.Price * detail.Quantity
            }));
        } else {
            const newOrderDetail = {
                ...detail,
                Type: 'CREATE',
                OrderID: data.OrderID
            };

            setOrderDetails([...orderDetails, newOrderDetail]);
            setModalData((prevData) => ({
                ...prevData,
                TotalPrice: prevData.TotalPrice + newOrderDetail.Price * newOrderDetail.Quantity
            }));
        }
    };

    const mutationDeleteDetail = useMutation({
        mutationFn: customerOrderServices.deleteDetail,
        onSuccess: (response) => {
            dispatch(snackbarActions.open({ message: response.message, severity: 'success' }));
        },
        onError: (error) => {
            const message = error.response.data.message;
            dispatch(snackbarActions.open({ message: message, severity: 'error' }));
        }
    });

    const handleDeleteDetail = (index) => {
        mutationDeleteDetail.mutate(
            {
                OrderID: data.OrderID,
                MaterialID: orderDetails[index].MaterialID
            },
            {
                onSuccess: () => {
                    setOrderDetails((prev) => prev.filter((_, i) => i !== index));
                    setModalData((prev) => ({
                        ...prev,
                        TotalPrice: prev.TotalPrice - orderDetails[index].Price * orderDetails[index].Quantity
                    }));
                }
            }
        );
    };

    React.useEffect(() => {
        setModalData(data);
    }, [data]);

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} keepMounted>
            <DetailModal open={openDetail} onClose={() => setOpenDetail(false)} onSubmit={handleAddDetail} />
            <DialogTitle>Edit Customer Order</DialogTitle>
            <DialogContent>
                <Grid container spacing={5}>
                    <Grid item xs={4}>
                        <Grid container spacing={2} direction="column">
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">Order ID</Typography>
                                <TextField fullWidth disabled value={modalData.OrderID || ''} variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">Order Date</Typography>
                                <TextField fullWidth disabled value={formatDate(modalData.OrderDate) || ''} variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">Warehouse</Typography>
                                <TextField fullWidth disabled value={modalData.WarehouseName || ''} variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">Customer</Typography>
                                <TextField fullWidth disabled value={modalData.CustomerName || ''} variant="outlined" />
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
                                            {orderDetails?.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell align="left">{row.MaterialName}</TableCell>
                                                    <TableCell align="left">{row.CategoryName}</TableCell>
                                                    <TableCell align="left">{row.UnitName}</TableCell>
                                                    <TableCell align="left">{row.Price}</TableCell>
                                                    <TableCell align="left">
                                                        <TextField
                                                            fullWidth
                                                            name="Quantity"
                                                            value={row.Quantity}
                                                            onChange={(e) => handleChangeDetail(index, e)}
                                                            variant="outlined"
                                                            size="small"
                                                        />
                                                    </TableCell>
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
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CustomerOrderEditModal;

CustomerOrderEditModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};
