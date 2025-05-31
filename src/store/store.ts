import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slices/auth/authSlice";
import JobReducer from "./slices/jobs/jobSlice";
export const store = configureStore({
  reducer: {
    AuthReducer,
    jobs: JobReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
