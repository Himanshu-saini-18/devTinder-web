import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./constants";

export const fetchFeed = createAsyncThunk(
  "feed/fetchFeed",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        BASE_URL + "/feed",
        
        { withCredentials: true },
      );
      return res?.data?.data;
    } catch (err) {
      return rejectWithValue(err.message || "Failed To Fetch Feed");
    }
  },
);

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feed: null,
    loading: false,
    error: null,
  },
  reducers: {
    removeUserFromFeed: (state, action) => {
      state.feed = state.feed?.filter((user) => user._id !== action.payload);
    },
    clearFeed: (state) => {
      state.feed = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers:(builder)=>{
     builder
     .addCase(fetchFeed.pending,(state)=>{
         state.loading = true,
         state.error = null
     })
     .addCase(fetchFeed.fulfilled,(state,action)=>{
      state.loading = false,
      state.feed = action.payload,
      state.error = null
     })
     .addCase(fetchFeed.rejected,(state,action)=>{
      state.loading = false,
      state.error = action.payload
     })
  }
});

export const { clearFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
