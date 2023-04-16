import React from 'react';
import { PropTypes } from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Slide, TextField, Typography } from '@mui/material';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { snackbarActions } from 'store/reducers/snackbar';
import { warehouseServices } from 'api/warehouse/index';
import { branchServices } from 'api/branch/index';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const WarehouseNewModal = (props) => {
    const { open, onClose } = props;
    const [modalData, setModalData] = React.useState({});
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const { data: branches } = useQuery({
        queryKey: ['branches'],
        queryFn: branchServices.getAll
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setModalData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const mutation = useMutation({
        mutationFn: warehouseServices.create,
        onSuccess: (response) => {
            dispatch(snackbarActions.open({ message: response.message, severity: 'success' }));
            queryClient.invalidateQueries({ queryKey: ['warehouses'] });
        },
        onError: (error) => {
            const message = error.response.data.message;
            dispatch(snackbarActions.open({ message: message, severity: 'error' }));
        }
    });

    const handleSubmit = () => {
        mutation.mutate(modalData);
        handleClose();
        setModalData({});
    };

    const handleClose = () => {
        onClose();
        setModalData({});
    };

    return (
        <Dialog fullWidth={true} maxWidth={'xs'} open={open} onClose={handleClose} TransitionComponent={Transition} keepMounted>
            <DialogTitle>Create New Warehouse</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Warehouse ID</Typography>
                        <TextField
                            fullWidth
                            name="WarehouseID"
                            onChange={handleChange}
                            required
                            value={modalData.WarehouseID || ''}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Warehouse Name</Typography>
                        <TextField
                            fullWidth
                            name="WarehouseName"
                            onChange={handleChange}
                            required
                            value={modalData.WarehouseName || ''}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Branch</Typography>
                        <TextField
                            fullWidth
                            select
                            name="BranchID"
                            onChange={handleChange}
                            required
                            value={modalData.BranchID || ''}
                            variant="outlined"
                        >
                            {branches?.map((branch) => (
                                <MenuItem key={branch.BranchID} value={branch.BranchID}>
                                    {branch.BranchName}
                                </MenuItem>
                            ))}
                        </TextField>
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
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default WarehouseNewModal;

WarehouseNewModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};
