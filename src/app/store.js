import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../features/todoCrud/usersSlice";

const store = configureStore({
    reducer: {
        userCrud: usersSlice,
    }
});

export default store;