import { createSlice } from "@reduxjs/toolkit";

const genSlice = createSlice({
  name: "gen",
  initialState: {
    theme: "dark",
  },
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
    
    
  },
});

export const { setTheme } = genSlice.actions;
export default genSlice.reducer;
