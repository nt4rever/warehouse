import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Button, DialogActions, DialogContent, DialogTitle, Dialog as MuiDialog, Slide } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    root: {
        '&>div:nth-child(3)': {
            justifyContent: 'flex-end',
            '&>div': {
                margin: '0px',
                borderRadius: '0px',
                with: '50%',
                maxWidth: '100%',
                maxHeight: '100%'
            }
        }
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const Dialog = ({ children }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <MuiDialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} className={classes.root}>
            <DialogTitle></DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button variant="text" onClick={handleClose} color="primary">
                    Close
                </Button>
                <Button variant="contained"></Button>
            </DialogActions>
        </MuiDialog>
    );
};

export default Dialog;
