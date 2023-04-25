import React from 'react';
import { PropTypes } from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, TextField, Typography, MenuItem } from '@mui/material';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { snackbarActions } from 'store/reducers/snackbar';
import { materialServices } from 'api/material/index';
import { inventoryServices } from 'api/inventory/index';
import { warehouseServices } from 'api/warehouse/index';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditInventoryModal = (props) => {
    const { open, data, onClose } = props;
    const [modalData, setModalData] = React.useState({});
    const materialQuery = useQuery({
        queryKey: ['materials'],
        queryFn: materialServices.getAll
    });
    const warehouseQuery = useQuery({
        queryKey: ['warehouses'],
        queryFn: warehouseServices.getAll
    });
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
        mutationFn: inventoryServices.update,
        onSuccess: (response) => {
            dispatch(snackbarActions.open({ message: response.message, severity: 'success' }));
            queryClient.invalidateQueries({ queryKey: ['inventories'] });
        },
        onError: (error) => {
            const message = error.response.data.message;
            dispatch(snackbarActions.open({ message: message, severity: 'error' }));
        }
    });

    const handleSubmit = () => {
        mutation.mutate(
            {
                id: modalData.InventoryID,
                payload: modalData
            },
            {
                onSuccess: () => {
                    handleClose();
                }
            }
        );
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
            <DialogTitle>Edit Inventory Item</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Inventory ID</Typography>
                        <TextField fullWidth name="InventoryID" disabled required value={modalData.InventoryID || ''} variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Quantity</Typography>
                        <TextField
                            fullWidth
                            name="Quantity"
                            onChange={handleChange}
                            required
                            value={modalData.Quantity || ''}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Material</Typography>
                        <TextField
                            fullWidth
                            name="MaterialID"
                            onChange={handleChange}
                            required
                            select
                            value={modalData.MaterialID || ''}
                            variant="outlined"
                        >
                            <MenuItem value="">Select Material</MenuItem>
                            {materialQuery.data?.map((m) => (
                                <MenuItem key={m.MaterialID} value={m.MaterialID}>
                                    {m.MaterialName}
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
                            {warehouseQuery.data?.map((m) => (
                                <MenuItem key={m.WarehouseID} value={m.WarehouseID}>
                                    {m.WarehouseName}
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
                    Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditInventoryModal;

EditInventoryModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};
