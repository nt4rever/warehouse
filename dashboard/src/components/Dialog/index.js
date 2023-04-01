import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Button, DialogActions, DialogContent, DialogTitle, Dialog as MuiDialog, Slide } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    useradddialog: {
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

    const handleClosedialog = () => {
        setOpen(false);
    };

    return (
        <MuiDialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClosedialog} className={classes.useradddialog}>
            <DialogTitle></DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button variant="text" onClick={handleClosedialog} color="primary">
                    Close
                </Button>
                <Button variant="contained"></Button>
            </DialogActions>
        </MuiDialog>
    );
};

export default Dialog;
