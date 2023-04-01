import React from 'react';
import { Snackbar as MuiSnackbar, Alert as MuiAlert, Slide, Grow, Fade } from '@mui/material';
import { useSelector } from 'react-redux';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
}

function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
}

function GrowTransition(props) {
    return <Grow {...props} />;
}

const transition = {
    Left: TransitionLeft,
    Up: TransitionUp,
    Right: TransitionRight,
    Down: TransitionDown,
    Grow: GrowTransition,
    Fade: Fade
};

const Snackbar = () => {
    const initSnackbar = useSelector((state) => state.snackbar);
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    React.useEffect(() => {
        setOpen(initSnackbar.open);
    }, [initSnackbar.message, initSnackbar.open]);

    return (
        <MuiSnackbar
            anchorOrigin={initSnackbar.anchorOrigin}
            open={open}
            autoHideDuration={initSnackbar.autoHideDuration}
            onClose={handleClose}
            TransitionComponent={transition[initSnackbar.transition]}
        >
            <Alert variant="filled" onClose={handleClose} severity={initSnackbar.severity} sx={{ width: '100%' }}>
                {initSnackbar.message}
            </Alert>
        </MuiSnackbar>
    );
};

export default Snackbar;
