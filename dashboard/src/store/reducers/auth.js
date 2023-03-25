import { createSlice } from '@reduxjs/toolkit';
import { KEY_LOCAL_STORAGE, removeLocalStorage, saveLocalStorage } from 'utils/storage';

const initialState = {
    isLoggedIn: false,
    loading: false,
    accessToken: undefined,
    currentUser: undefined
};

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loading(state) {
            state.loading = true;
            return state;
        },
        loginSuccess(state, action) {
            state.isLoggedIn = true;
            state.loading = false;
            state.currentUser = action.payload?.user;
            saveLocalStorage(KEY_LOCAL_STORAGE.ACCESS_TOKEN, action.payload?.token);
            return state;
        },
        loginFailed(state) {
            state.loading = false;
            return state;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.currentUser = undefined;
            removeLocalStorage(KEY_LOCAL_STORAGE.ACCESS_TOKEN);
            return state;
        }
    }
});

export default auth.reducer;

export const authActions = auth.actions;
