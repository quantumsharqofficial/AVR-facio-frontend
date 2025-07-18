import { createSlice } from "@reduxjs/toolkit";

const ASDetailsSlice = createSlice({
  name: "ASDetails",
  initialState: {
    attendanceSystemData: [],
  },
  reducers: {
    setAttendanceSystemData: (state, action) => {
      state.attendanceSystemData = action.payload;
    },
    updateAttendance: (state, action) => {
        state.attendanceSystemData = action.payload;
      },
  },
});

export const {updateAttendance,setAttendanceSystemData} = ASDetailsSlice.actions;
export default ASDetailsSlice.reducer;