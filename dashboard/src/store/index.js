// third-party
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

// project import
import reducers from './reducers';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const __prod__ = process.env.NODE_ENV === 'production';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
    stateReconciler: autoMergeLevel2
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    devTools: !__prod__,
    middleware: []
});

export const persistor = persistStore(store);

const { dispatch } = store;

export { store, dispatch };
