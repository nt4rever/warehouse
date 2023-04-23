import React from 'react';
import { PropTypes } from 'prop-types';
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, TextField, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { materialServices } from 'api/material/index';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const initialModalData = {
    MaterialID: '',
    MaterialName: '',
    CategoryName: '',
    UnitName: '',
    Price: 0,
    Quantity: 0
};

const DetailModal = (props) => {
    const { open, onClose, onSubmit } = props;
    const [modalData, setModalData] = React.useState(initialModalData);

    const { data: materials } = useQuery({
        queryKey: ['materials'],
        queryFn: materialServices.getAll
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setModalData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        onSubmit(modalData);
        handleClose();
        setModalData(initialModalData);
    };

    const handleClose = () => {
        onClose();
        setModalData(initialModalData);
    };

    return (
        <Dialog fullWidth={true} maxWidth={'xs'} open={open} onClose={handleClose} TransitionComponent={Transition} keepMounted>
            <DialogTitle>Add Detail Order</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Material</Typography>
                        <Autocomplete
                            fullWidth
                            size="small"
                            onChange={(event, value) => {
                                setModalData((prev) => ({
                                    ...prev,
                                    MaterialID: value?.MaterialID,
                                    MaterialName: value?.MaterialName,
                                    CategoryName: value?.CategoryName,
                                    UnitName: value?.UnitName,
                                    Price: value?.Price
                                }));
                            }}
                            value={materials?.find((item) => item.MaterialID === modalData.MaterialID) || null}
                            options={materials || []}
                            getOptionLabel={(option) => option.MaterialName}
                            renderInput={(params) => <TextField size="small" {...params} variant="outlined" />}
                        />
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
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Category</Typography>
                        <TextField fullWidth disabled value={modalData.CategoryName || ''} variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Unit</Typography>
                        <TextField fullWidth disabled value={modalData.UnitName || ''} variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Price</Typography>
                        <TextField
                            fullWidth
                            disabled
                            value={modalData.Price || 0}
                            variant="outlined"
                            InputProps={{
                                startAdornment: '$'
                            }}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DetailModal;

DetailModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};
