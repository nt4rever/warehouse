import React from 'react';
import { PropTypes } from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, MenuItem, DialogTitle, Grid, Slide, TextField, Typography } from '@mui/material';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { snackbarActions } from 'store/reducers/snackbar';
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

    const { data: orders } = useQuery({
        queryKey: ['orders'],
        queryFn: customerOrderServices.getAll
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
            { ...modalData },
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
        <Dialog fullWidth={true} maxWidth={'xs'} open={open} onClose={handleClose} TransitionComponent={Transition} keepMounted>
            <DialogTitle>Create New Export</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
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
                        <Typography variant="subtitle1">Order ID</Typography>
                        <TextField
                            select
                            fullWidth
                            name="OrderID"
                            onChange={handleChange}
                            required
                            value={modalData.OrderID || ''}
                            variant="outlined"
                        >
                            <MenuItem value="">Select Order</MenuItem>
                            {orders?.map((m) => (
                                <MenuItem key={m.OrderID} value={m.OrderID}>
                                    {m.OrderID}
                                </MenuItem>
                            ))}
                        </TextField>
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
