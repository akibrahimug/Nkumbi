// Slice for static data
// src/store/features/staticSlice.ts
"use client";

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Example of some static data, like a list of categories or statuses
const initialStaticData = {
  categories: ["Electronics", "Books", "Clothing"],
  companyInfo: {
    name: "My Company",
    address: "123 Example St.",
  },
};

const staticSlice = createSlice({
  name: "static",
  initialState: initialStaticData,
  reducers: {
    // If you want to allow updating these, add reducers here
    // e.g. updateCompanyName(state, action: PayloadAction<string>) { ... }
  },
});

export default staticSlice.reducer;

// example selectors
export const selectCategories = (state: RootState) => state.static.categories;
export const selectCompanyInfo = (state: RootState) => state.static.companyInfo;
