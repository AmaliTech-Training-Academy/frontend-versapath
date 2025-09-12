import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {  FetchedRolesProps } from "@/lib/types/api";
import { apiRequest } from "@/lib/api/api-request";

const initialState: {
  roles: FetchedRolesProps[];
  isFetchingRoles: boolean;
  isFetchingError: boolean;
} = {
  roles: [],
  isFetchingRoles: false,
  isFetchingError: false,
};

const fetchRoles = createAsyncThunk<
  FetchedRolesProps[],
  void,
  { state: RootState }
>("roles/fetchRoles", async (_, { getState }) => {
  const { roles: existingRoles } = getState().rolesReducer;
  if (existingRoles.length > 0) {
    return existingRoles; // Return cached roles if they exist
  }
  const response = await apiRequest<FetchedRolesProps>("/roles", "GET");

  if (Array.isArray(response?.data)) {
    return response.data;
  } else if (response?.data) {
    return [response.data];
  } else {
    return [];
  }
});
const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoles.fulfilled, (state, action) => {
      state.roles = action.payload;
      state.isFetchingRoles = false;
      state.isFetchingError = false;
    });
    builder.addCase(fetchRoles.pending, (state) => {
      state.isFetchingRoles = true;
      state.isFetchingError = false;
    });
    builder.addCase(fetchRoles.rejected, (state) => {
      state.isFetchingRoles = false;
      state.isFetchingError = true;
    });
  },
});
export default rolesSlice.reducer;

export { fetchRoles };
