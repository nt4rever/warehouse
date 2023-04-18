import React from 'react';
import { PropTypes } from 'prop-types';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    InputAdornment,
    MenuItem,
    Slide,
    TextField,
    Typography
} from '@mui/material';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { snackbarActions } from 'store/reducers/snackbar';
import { materialServices } from 'api/material/index';
import { categoryServices } from 'api/category/index';
import { unitServices } from 'api/unit/index';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const MaterialNewModal = (props) => {
    const { open, onClose } = props;
    const [modalData, setModalData] = React.useState({});
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: categoryServices.getAll
    });

    const { data: units } = useQuery({
        queryKey: ['units'],
        queryFn: unitServices.getAll
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setModalData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const mutation = useMutation({
        mutationFn: materialServices.create,
        onSuccess: (response) => {
            dispatch(snackbarActions.open({ message: response.message, severity: 'success' }));
            queryClient.invalidateQueries({ queryKey: ['materials'] });
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
        <Dialog fullWidth={true} maxWidth={'sm'} open={open} onClose={handleClose} TransitionComponent={Transition} keepMounted>
            <DialogTitle>Create New Material</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Material ID</Typography>
                        <TextField
                            fullWidth
                            name="MaterialID"
                            onChange={handleChange}
                            required
                            value={modalData.MaterialID || ''}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Material Name</Typography>
                        <TextField
                            fullWidth
                            name="MaterialName"
                            onChange={handleChange}
                            required
                            value={modalData.MaterialName || ''}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Category</Typography>
                        <TextField
                            fullWidth
                            name="CategoryID"
                            onChange={handleChange}
                            required
                            select
                            value={modalData.CategoryID || ''}
                            variant="outlined"
                        >
                            <MenuItem value="">Select Category</MenuItem>
                            {categories?.map((category) => (
                                <MenuItem key={category.CategoryID} value={category.CategoryID}>
                                    {category.CategoryName}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Unit</Typography>
                        <TextField
                            fullWidth
                            name="UnitID"
                            onChange={handleChange}
                            required
                            select
                            value={modalData.UnitID || ''}
                            variant="outlined"
                        >
                            <MenuItem value="">Select Unit</MenuItem>
                            {units?.map((unit) => (
                                <MenuItem key={unit.UnitID} value={unit.UnitID}>
                                    {unit.UnitName}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Price</Typography>
                        <TextField
                            fullWidth
                            name="Price"
                            onChange={handleChange}
                            required
                            value={modalData.Price || ''}
                            variant="outlined"
                            InputProps={{
                                startAdornment: '$'
                            }}
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Image URL</Typography>
                        <TextField
                            fullWidth
                            name="Image_URL"
                            onChange={handleChange}
                            value={modalData.Image_URL || ''}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Description</Typography>
                        <TextField
                            fullWidth
                            name="Description"
                            onChange={handleChange}
                            value={modalData.Description || ''}
                            variant="outlined"
                            multiline
                            minRows={3}
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

export default MaterialNewModal;

MaterialNewModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};
