import React from 'react';
import { PropTypes } from 'prop-types';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Slide,
    TextField,
    Typography
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { branchServices } from 'api/branch/index';
import { useDispatch } from 'react-redux';
import { snackbarActions } from 'store/reducers/snackbar';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BranchModal = (props) => {
    const { open, data, handleClose } = props;
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
        mutationFn: branchServices.update,
        onSuccess: (response) => {
            dispatch(snackbarActions.open({ message: response.message, severity: 'success' }));
            queryClient.invalidateQueries({ queryKey: ['branch'] });
        },
        onError: (error) => {
            dispatch(snackbarActions.open({ message: error.message, severity: 'error' }));
        }
    });

    const handleSubmit = () => {
        mutation.mutate({
            id: modalData.BranchID,
            payload: modalData
        });
        handleClose();
    };

    React.useEffect(() => {
        setModalData(data);
    }, [data]);

    return (
        <Dialog fullWidth={true} maxWidth={'xs'} open={open} onClose={handleClose} TransitionComponent={Transition} keepMounted>
            <DialogTitle>Edit Branch</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Branch Name</Typography>
                        <TextField
                            fullWidth
                            name="BranchName"
                            onChange={handleChange}
                            required
                            value={modalData.BranchName}
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
                            value={modalData.PhoneNumber}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Address</Typography>
                        <TextField fullWidth name="Address" onChange={handleChange} required value={modalData.Address} variant="outlined" />
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

export default BranchModal;

BranchModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};
