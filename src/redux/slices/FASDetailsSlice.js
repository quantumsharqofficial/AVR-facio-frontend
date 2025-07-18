import { createSlice } from "@reduxjs/toolkit";

const FASDetailsSlice = createSlice({
    name: 'FASDetails',
    initialState: {
        faceAlertSystemData: [],
    },
    reducers: {
        setFaceAlertSystemData: (state, action) => {
            state.faceAlertSystemData = action.payload;
        },
    },
});

export const { setFaceAlertSystemData } = FASDetailsSlice.actions;
export default FASDetailsSlice.reducer;