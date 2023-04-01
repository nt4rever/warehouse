import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    open: false,
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
    },
    message: '',
    severity: 'info',
    transition: 'Fade',
    autoHideDuration: 2000
};

const snackbar = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        open(state, action) {
            const { anchorOrigin, message, severity, transition, autoHideDuration } = action.payload;
            state.open = true;
            state.anchorOrigin = anchorOrigin ? anchorOrigin : initialState.anchorOrigin;
            state.message = message ? message : initialState.message;
            state.severity = severity ? severity : initialState.severity;
            state.transition = transition ? transition : initialState.transition;
            state.autoHideDuration = autoHideDuration ? autoHideDuration : initialState.autoHideDuration;
            return state;
        }
    }
});

export default snackbar.reducer;

export const snackbarActions = snackbar.actions;
