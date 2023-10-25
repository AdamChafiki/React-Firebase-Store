// productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define an initial state
const initialState = {
  data: null,
  status: "idle",
  error: null,
};

// Define an async thunk for fetching products
export const fetchData = createAsyncThunk(
  "api/fetchData",
  async (url) => {
    // Fetch your data from the dummy JSON API here
    const response = await axios.get(url); // Replace with your API endpoint
    return response.data;
  }
);

// Create a product slice
const fetchSlice = createSlice({
  name: "dataFetch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default fetchSlice.reducer;
