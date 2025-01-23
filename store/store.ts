import { configureStore } from "@reduxjs/toolkit";
import staticReducer from "@/store/features/staticSlice";
import commentsReducer from "@/store/features/commentsSlice";
export const store = configureStore({
  reducer: {
    static: staticReducer,
    comments: commentsReducer,
  },
});

// Types for convenience if you're using TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
