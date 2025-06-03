import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authAPIService from "./authService";

const initialState = {
  user: {
    email: "",
    createdAt: "",
    updatedAt: "",
  },
  isLoading: false,
  isError: false,
  isAuthenticatedFlag: false,
  message: null,
  token: localStorage.getItem("auth") ? localStorage.getItem("auth") : null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData: any, thunkAPI) => {
    try {
      const res = await authAPIService.loginService(userData);
      return res;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticatedFlag = false;
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.isError = true;
        state.isAuthenticatedFlag = false;
        state.message = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticatedFlag = true;
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload.message;
        state.user = action.payload.data;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
