// src/store/features/commentsSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Comment {
  _id?: string;
  post: string; // or an ObjectId
  author: string; // or an ObjectId
  content: string;
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
  limit: 5,
  isLoading: false,
  error: null,
};

// fetch comments for a post with skip/limit
export const fetchCommentsForSinglePost = createAsyncThunk<
  { data: Comment[]; total: number },
  { postId: string; skip: number; limit: number }
>("comments/fetch", async ({ postId, skip, limit }) => {
  const url = `/api/comments?postId=${postId}&skip=${skip}&limit=${limit}`;
  const res = await fetch(url);
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to fetch comments");
  return { data: json.data, total: json.total };
});

// edit userComment
export const editUserComment = createAsyncThunk<
  Comment, // Returned data
  { _id: string; content: string }, // Args
  { rejectValue: string } // Rejected error
>("comments/editComment", async ({ _id, content }, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/comments", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id, content }),
    });
    const json = await response.json();

    if (!response.ok) {
      return rejectWithValue(json.error || "Failed to edit comment");
    }
    // json.data should be the updated comment doc
    return json.data as Comment;
  } catch (err) {
    return rejectWithValue("Network error while editing comment");
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
      .addCase(fetchCommentsForSinglePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCommentsForSinglePost.fulfilled, (state, action) => {
        state.isLoading = false;
        const { data, total } = action.payload;

        // We want to append these new items rather than replace
        state.items = [...state.items, ...data];
        state.total = total;

        // Move skip forward so next "page" starts after current items
        state.skip = state.items.length;
      })
      .addCase(fetchCommentsForSinglePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(editUserComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editUserComment.fulfilled, (state, action) => {
        state.isLoading = false;
        const updated = action.payload;
        // Find the existing comment and replace it
        const idx = state.items.findIndex((c) => c._id === updated._id);
        if (idx !== -1) {
          state.items[idx] = updated;
        }
      })
      .addCase(editUserComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to edit comment";
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
