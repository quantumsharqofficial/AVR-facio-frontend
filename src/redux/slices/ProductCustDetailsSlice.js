import { createSlice } from "@reduxjs/toolkit";

const ProductCustDetailsSlice = createSlice({
  name: "productCustDetails",
  initialState: {
    customerId: "",
    customerName: "",
  },
  reducers: {
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    setCustomerName: (state, action) => {
      state.customerName = action.payload;
    },
  },
});

export const { setCustomerId, setCustomerName } =
  ProductCustDetailsSlice.actions;
export default ProductCustDetailsSlice.reducer;
