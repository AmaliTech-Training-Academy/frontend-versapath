//Redux slices for managing user updates
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const updateUserSLice = createSlice({
  name: "updateUser",
  initialState: { user: [] },
  reducers: {
    updateUser: (state, action: PayloadAction<string[]>) => {
      return { ...state, ...action.payload };
    },
  },
});
export default updateUserSLice.reducer;
