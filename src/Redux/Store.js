import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/UserSlice";
import bikeReducer from "./Reducers/BikeSlice";
import ReservReducer from "./Reducers/ReservSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        bike: bikeReducer,
        reserve: ReservReducer
    },
});