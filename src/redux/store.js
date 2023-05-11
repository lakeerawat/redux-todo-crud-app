import { configureStore } from "@reduxjs/toolkit";
import ContactReducer from "./features/contactSlice";

export default configureStore({
    reducer:{
        contact: ContactReducer
    }
}) 