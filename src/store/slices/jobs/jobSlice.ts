import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jobApiService from "./jobService";

export interface JobApplication {
  id: number;
  name: string;
  description: string | null;
  link: string;
  expectedSalary: string;
  status: "APPLIED" | "INTERVIEWING" | "OFFERED" | "REJECTED" | string; // Add more statuses if needed
  appliedDate: string; // e.g. "2025-05-31"
  contractSignedDate: string | null;
  offerExtendedDate: string | null;
  offerRejectedDate: string | null;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

interface JobState {
  jobs: JobApplication[];
  isLoading: boolean;
  errorMessage: string;
}

const initialState: JobState = {
  jobs: [],
  isLoading: true,
  errorMessage: "",
};

export const fetchJobs = createAsyncThunk("job/all", async (thunkAPI) => {
  try {
    console.log("I am called");
    const res = await jobApiService.fetchJobService();

    console.log(res, "jd");
    return res;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.message;

    return thunkAPI.rejectWithValue(message);
  }
});

export const postJobApplication = createAsyncThunk(
  "job/add",
  async (data: any, thunkAPI) => {
    try {
      const res = jobApiService.postfetchJobService(data);
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

const jobSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action: any) => {
        state.isLoading = false;
      })
      .addCase(postJobApplication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postJobApplication.fulfilled, (state, action: any) => {
        state.isLoading = false;
        // state.jobs = action.payload;
      })
      .addCase(postJobApplication.rejected, (state, action: any) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      });
  },
});

export const { reset } = jobSlice.actions;
export default jobSlice.reducer;
