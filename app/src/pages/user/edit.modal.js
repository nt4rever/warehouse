import React from 'react';
import { PropTypes } from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Slide, TextField, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { snackbarActions } from 'store/reducers/snackbar';
import { userServices } from 'api/user/index';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UserEditModal = (props) => {
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
        mutationFn: userServices.update,
        onSuccess: (response) => {
            dispatch(snackbarActions.open({ message: response.message, severity: 'success' }));
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error) => {
            const message = error.response.data.message;
            dispatch(snackbarActions.open({ message: message, severity: 'error' }));
        }
    });

    const handleSubmit = () => {
        mutation.mutate({
            id: modalData.UserID,
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
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">User ID</Typography>
                        <TextField fullWidth name="UserID" disabled required value={modalData.UserID || ''} variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">User Name</Typography>
                        <TextField
                            fullWidth
                            name="UserName"
                            onChange={handleChange}
                            required
                            value={modalData.UserName || ''}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">First Name</Typography>
                        <TextField
                            fullWidth
                            name="FirstName"
                            onChange={handleChange}
                            required
                            value={modalData.FirstName || ''}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Last Name</Typography>
                        <TextField
                            fullWidth
                            name="LastName"
                            onChange={handleChange}
                            required
                            value={modalData.LastName || ''}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Role</Typography>
                        <TextField
                            fullWidth
                            select
                            name="RoleID"
                            onChange={handleChange}
                            required
                            value={modalData.RoleID || ''}
                            variant="outlined"
                        >
                            {roles?.map((role) => (
                                <MenuItem key={role.RoleID} value={role.RoleID}>
                                    {role.RoleName}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Gender</Typography>
                        <TextField
                            fullWidth
                            select
                            name="Gender"
                            onChange={handleChange}
                            required
                            value={modalData.Gender || ''}
                            variant="outlined"
                        >
                            {genders?.map((gender) => (
                                <MenuItem key={gender} value={gender}>
                                    {gender}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Email Address</Typography>
                        <TextField
                            fullWidth
                            name="Email"
                            onChange={handleChange}
                            required
                            value={modalData.Email || ''}
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
                            multiline
                            value={modalData.Address || ''}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Password</Typography>
                        <TextField
                            fullWidth
                            type="password"
                            name="Password"
                            onChange={handleChange}
                            required
                            value={modalData.Password || ''}
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

export default UserEditModal;

const roles = [
    {
        RoleID: 'ADMIN',
        RoleName: 'Quản trị viên'
    },
    {
        RoleID: 'EMPLOYEE',
        RoleName: 'Nhân viên'
    }
];

const genders = ['Male', 'Female', 'Other'];

UserEditModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};
