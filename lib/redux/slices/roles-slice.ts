import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ApiResponse, FetchedRolesProps } from "@/lib/types/api";
import { Authorization } from "@/lib/api/users"; // This will be fixed later. We are doing so, becuase the login is not yet intergrated and the token is still being passed in the header directly.
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
