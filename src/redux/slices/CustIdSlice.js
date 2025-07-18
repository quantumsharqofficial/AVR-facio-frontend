import { createSlice } from "@reduxjs/toolkit";

const CustIdSlice = createSlice({
  name: "custData",
  initialState: { id: "", name: "" }, // Added name in initialState
  reducers: {
    setCustId: (state, action) => {
      state.id = action.payload;
    },
    setCustName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setCustId, setCustName } = CustIdSlice.actions;
export default CustIdSlice.reducer;
