import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export interface UserData {
  _id?: string;
  name?: string;
  username?: string;
  email: string;
  avatar?: string;
  location?: string;
}

export interface UserState {
  user: UserData | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunk for registering a user (sign-up)
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (
    credentials: { username: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error || "Failed to register");
      }

      const data = await response.json();
      return data.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Called by SyncSession when NextAuth session changes
    setUser: (state, action: PayloadAction<UserData | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    // Clears user from Redux on sign-out or session expiration
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle registerUser
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        // We do NOT automatically set user here,
        // because we rely on NextAuth to handle the session after signIn.
        // If you want to store user data immediately, you could do so:
        // state.user = action.payload;
        // state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;

export default userSlice.reducer;
