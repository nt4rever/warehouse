import React from 'react';
import { PropTypes } from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, TextField, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { snackbarActions } from 'store/reducers/snackbar';
import { supplierServices } from 'api/supplier/index';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SupplierEditModal = (props) => {
    const { open, data, onClose } = props;
    const [modalData, setModalData] = React.useState({});
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setModalData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const mutation = useMutation({
        mutationFn: supplierServices.update,
        onSuccess: (response) => {
            dispatch(snackbarActions.open({ message: response.message, severity: 'success' }));
            queryClient.invalidateQueries({ queryKey: ['suppliers'] });
        },
        onError: (error) => {
            const message = error.response.data.message;
            dispatch(snackbarActions.open({ message: message, severity: 'error' }));
        }
    });

    const handleSubmit = () => {
        mutation.mutate({
            id: modalData.SupplierID,
            payload: modalData
        });
        handleClose();
    };

    const handleClose = () => {
        onClose();
        setModalData({});
    };

    React.useEffect(() => {
        setModalData(data);
    }, [data]);

    return (
        <Dialog fullWidth={true} maxWidth={'xs'} open={open} onClose={handleClose} TransitionComponent={Transition} keepMounted>
            <DialogTitle>Edit Supplier</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Supplier ID</Typography>
                        <TextField fullWidth name="SupplierID" disabled required value={modalData.SupplierID || ''} variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Supplier Name</Typography>
                        <TextField
                            fullWidth
                            name="SupplierName"
                            onChange={handleChange}
                            required
                            value={modalData.SupplierName || ''}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Phone Number</Typography>
                        <TextField
                            fullWidth
                            name="PhoneNumber"
                            onChange={handleChange}
                            required
                            value={modalData.PhoneNumber || ''}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Address</Typography>
                        <TextField
                            fullWidth
                            name="Address"
                            onChange={handleChange}
                            required
                            value={modalData.Address || ''}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Save changes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SupplierEditModal;

SupplierEditModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};
