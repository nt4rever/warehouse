// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import auth from './auth';
import snackbar from './snackbar';
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, auth, snackbar });

export default reducers;
