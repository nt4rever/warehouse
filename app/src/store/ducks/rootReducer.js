import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";

const createRootReducer = () => {
  return combineReducers({
    auth: authReducer,
  });
};

export default createRootReducer;
