import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authAPIService from "./authService";

const initialState = {
  user: {
    email: "",
    createdAt: "",
    updatedAt: "",
  },
  signUpData: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
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

export const singUpUser = createAsyncThunk(
  "auth/signup",
  async (userData: any, thunkAPI) => {
    try {
      const res = await authAPIService.signUpService(userData);
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
    updateSignUpData: (state, action) => {
      state.signUpData = {
        ...state.signUpData,
        ...action.payload,
      };
    },
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
      })
      .addCase(singUpUser.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticatedFlag = false;
      })
      .addCase(singUpUser.fulfilled, (state) => {
        state.isAuthenticatedFlag = true;
        state.isLoading = false;
      })
      .addCase(singUpUser.rejected, (state, action: any) => {
        state.isError = true;
        state.isAuthenticatedFlag = false;
        state.message = action.payload;
      });
  },
});

export const { reset, updateSignUpData } = authSlice.actions;

export default authSlice.reducer;
