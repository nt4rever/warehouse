import React from 'react';
import { PropTypes } from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Slide, TextField, Typography } from '@mui/material';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { snackbarActions } from 'store/reducers/snackbar';
import { employeeServices } from 'api/employee/index';
import { userServices } from 'api/user/index';
import { branchServices } from 'api/branch/index';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EmployeeNewModal = (props) => {
    const { open, onClose } = props;
    const [modalData, setModalData] = React.useState({});
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const { data: branches } = useQuery({
        queryKey: ['branches'],
        queryFn: branchServices.getAll
    });

    const { data: users } = useQuery({
        queryKey: ['users'],
        queryFn: userServices.getAll
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setModalData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const mutation = useMutation({
        mutationFn: employeeServices.create,
        onSuccess: (response) => {
            dispatch(snackbarActions.open({ message: response.message, severity: 'success' }));
            queryClient.invalidateQueries({ queryKey: ['employees'] });
        },
        onError: (error) => {
            const message = error.response.data.message;
            dispatch(snackbarActions.open({ message: message, severity: 'error' }));
        }
    });

    const handleSubmit = () => {
        mutation.mutate(modalData);
        handleClose();
    };

    const handleClose = () => {
        onClose();
        setModalData({});
    };

    return (
        <Dialog fullWidth={true} maxWidth={'xs'} open={open} onClose={handleClose} TransitionComponent={Transition} keepMounted>
            <DialogTitle>Create New Employee</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Employee ID</Typography>
                        <TextField
                            fullWidth
                            name="EmployeeID"
                            onChange={handleChange}
                            required
                            value={modalData.EmployeeID || ''}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Branch ID</Typography>
                        <TextField
                            fullWidth
                            name="BranchID"
                            onChange={handleChange}
                            required
                            value={modalData.BranchID || ''}
                            variant="outlined"
                            select
                        >
                            {branches?.map((branch) => (
                                <MenuItem key={branch.BranchID} value={branch.BranchID}>
                                    {branch.BranchID}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">User ID</Typography>
                        <TextField
                            fullWidth
                            name="UserID"
                            onChange={handleChange}
                            required
                            value={modalData.UserID || ''}
                            variant="outlined"
                            select
                        >
                            {users?.map((user) => (
                                <MenuItem key={user.UserID} value={user.UserID}>
                                    {user.UserName}
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

export default EmployeeNewModal;

EmployeeNewModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
};
