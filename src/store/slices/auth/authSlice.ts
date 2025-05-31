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
  isAuthenticated: false,
  message: null,
  token: localStorage.getItem("blog-cms-token")
    ? localStorage.getItem("blog-cms-token")
    : null,
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
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.isError = true;
        state.isAuthenticated = false;
        state.message = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload.message;
        state.user = action.payload.data;
      });
    //   .addCase(getProfile.pending, (state) => {
    //     state.isLoading = true;
    //     // state.token = localStorage.getItem("token")
    //     //   ? localStorage.getItem("token")
    //     //   : null;
    //   })
    //   .addCase(getProfile.rejected, (state, action) => {
    //     state.isError = true;
    //   })
    //   .addCase(getProfile.fulfilled, (state, action) => {
    //     state.isAuthenticated = true;
    //     state.isLoading = false;
    //     state.isError = false;
    //     state.user = action.payload;
    //     // state.user = action.payload;
    //   });
  },
  //   reducers: {
  //     login: (state, action) => {},
  //     signup: (state, action) => {},
  //   },
});

export const { login, signup } = authSlice.actions;

export default authSlice.reducer;
