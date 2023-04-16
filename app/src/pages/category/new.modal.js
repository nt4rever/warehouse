import React from 'react';
import { PropTypes } from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, TextField, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { snackbarActions } from 'store/reducers/snackbar';
import { categoryServices } from 'api/category/index';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CategoryNewModal = (props) => {
    const { open, onClose } = props;
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
        mutationFn: categoryServices.create,
        onSuccess: (response) => {
            dispatch(snackbarActions.open({ message: response.message, severity: 'success' }));
            queryClient.invalidateQueries({ queryKey: ['categories'] });
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
            <DialogTitle>Create New Category</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Category ID</Typography>
                        <TextField
                            fullWidth
                            name="CategoryID"
                            onChange={handleChange}
                            required
                            value={modalData.CategoryID || ''}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Category Name</Typography>
                        <TextField
                            fullWidth
                            name="CategoryName"
                            onChange={handleChange}
                            required
                            value={modalData.CategoryName || ''}
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

export default CategoryNewModal;

CategoryNewModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};
