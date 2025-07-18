import { createSlice } from "@reduxjs/toolkit";

const toggleSidebarSlice = createSlice({
  name: "toggle",
  initialState: { isOpen: true },
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleSidebar } = toggleSidebarSlice.actions;
export default toggleSidebarSlice.reducer;
