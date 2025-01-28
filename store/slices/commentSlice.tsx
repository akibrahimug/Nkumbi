// src/store/features/commentsSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";

// A single Comment object
export interface Comment {
  _id?: string;
  text: string;
}

// State for the slice
interface CommentsState {
  items: Comment[];
  total: number; // total documents in DB for this collection
  skip: number; // how many we've loaded so far
  limit: number; // how many we fetch at a time
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: CommentsState = {
  items: [],
  total: 0,
  skip: 0,
  limit: 5, // you can change to 10 or something else
  isLoading: false,
  error: null,
};

// The thunk can accept skip/limit or you can get from getState().
export const fetchComments = createAsyncThunk<
  // Return type of fulfilled action
  { data: Comment[]; total: number },
  // Argument to the thunk
  { skip?: number; limit?: number } | undefined,
  // ThunkAPI
  { rejectValue: string; state: RootState }
>("comments/fetchComments", async (arg, { rejectWithValue, getState }) => {
  try {
    // If skip/limit are passed, use them, otherwise use what's in state
    const state = getState().comments;
    const skip = arg?.skip ?? state.skip;
    const limit = arg?.limit ?? state.limit;

    // Construct the query
    const url = `/api/comments?skip=${skip}&limit=${limit}`;
    const response = await fetch(url);
    const json = await response.json();

    if (!response.ok) {
      return rejectWithValue(json.error || "Failed to fetch comments");
    }

    // returns { success: boolean, data: Comment[], total: number }
    return { data: json.data as Comment[], total: json.total as number };
  } catch (err) {
    return rejectWithValue("Network error while fetching comments");
  }
});

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    // If you want to reset or do other local actions, you can define them here.
    resetComments: (state) => {
      state.items = [];
      state.total = 0;
      state.skip = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;
        const { data, total } = action.payload;

        // We want to append these new items rather than replace
        state.items = [...state.items, ...data];
        state.total = total;

        // Move skip forward so next "page" starts after current items
        state.skip = state.items.length;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetComments } = commentsSlice.actions;

// A selector to get the entire comment state
export const selectCommentsState = (state: RootState) => state.comments;

// Or specific selectors
export const selectAllComments = (state: RootState) => state.comments.items;
export const selectTotalComments = (state: RootState) => state.comments.total;
export const selectCommentsLoading = (state: RootState) =>
  state.comments.isLoading;
export const selectCommentsError = (state: RootState) => state.comments.error;

export default commentsSlice.reducer;
