import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./settingsSlice";
import postReducer from "./postSlice";

export const store = configureStore({
  reducer: {
    // Define a top-level state field named `settings`, handled by `settingsReducer`
    settings: settingsReducer,
    post: postReducer,
  },
});
