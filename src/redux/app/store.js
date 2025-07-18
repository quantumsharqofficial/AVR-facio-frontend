import { configureStore } from "@reduxjs/toolkit";
import toggleSidebar from "../slices/toggleSidebarSlice";
import custDataReducer from "../slices/CustIdSlice";
import productCustDetailsReducer from "../slices/ProductCustDetailsSlice";
import ASDetailsReducer from "../slices/ASDetailsSlice";
import FASDetailsReducer from "../slices/FASDetailsSlice";
export const store = configureStore({
  reducer: {
    toggle: toggleSidebar,
    custData: custDataReducer, // Combined id and name into one slice
    productCustDetails: productCustDetailsReducer, // Added customer id and name into another slice
    ASDetails: ASDetailsReducer, // Added attendance system data into another slice
    FASDetails: FASDetailsReducer, // Added face alert system data into another slice
  },
});
