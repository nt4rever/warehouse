import { createSlice } from '@reduxjs/toolkit';

const initialState = {};
const auth = createSlice({
    name: '',
    initialState,
    reducers: {}
});

export default auth.reducer;

export const authActions = auth.actions;
