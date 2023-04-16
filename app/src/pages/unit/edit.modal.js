import React from 'react';
import { PropTypes } from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, TextField, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { snackbarActions } from 'store/reducers/snackbar';
import { unitServices } from 'api/unit/index';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UnitEditModal = (props) => {
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
        mutationFn: unitServices.update,
        onSuccess: (response) => {
            dispatch(snackbarActions.open({ message: response.message, severity: 'success' }));
            queryClient.invalidateQueries({ queryKey: ['units'] });
        },
        onError: (error) => {
            const message = error.response.data.message;
            dispatch(snackbarActions.open({ message: message, severity: 'error' }));
        }
    });

    const handleSubmit = () => {
        mutation.mutate({
            id: modalData.UnitID,
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
            <DialogTitle>Edit Unit</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Unit ID</Typography>
                        <TextField fullWidth name="UnitID" disabled required value={modalData.UnitID || ''} variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Unit Name</Typography>
                        <TextField
                            fullWidth
                            name="UnitName"
                            onChange={handleChange}
                            required
                            value={modalData.UnitName || ''}
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

export default UnitEditModal;

UnitEditModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};
