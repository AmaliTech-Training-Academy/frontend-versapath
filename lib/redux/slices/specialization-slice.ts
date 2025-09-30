import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { apiRequest } from "@/lib/api/api-request";
import { ListData } from "@/lib/types/api";
type SpecializationProps = {
  id: number;
  specId: string;
  specName: string;
};
const initialState: {
  specializations: SpecializationProps[];
  isFetching: boolean;
  isFetchingError: boolean;
} = {
  specializations: [],
  isFetching: false,
  isFetchingError: false,
};
const fetchSpecializations = createAsyncThunk<
  SpecializationProps[],
  void,
  { state: RootState }
>("specialization/fetchSpecializations", async (_, { getState }) => {
  const response = await apiRequest<ListData<SpecializationProps>>(
    "/users/specializations",
    "GET"
  );
  if (Array.isArray(response.data?.items)) {
    return response.data?.items || [];
  } else {
    return [];
  }
});

const specSlice = createSlice({
  name: "specialization",
  initialState,
  reducers: {
    setSpecializations: (state, action) => {
      state.specializations = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSpecializations.fulfilled, (state, action) => {
      state.specializations = action.payload;
      state.isFetching = false;
      state.isFetchingError = false;
    });
    builder.addCase(fetchSpecializations.pending, (state) => {
      state.isFetching = true;
      state.isFetchingError = false;
    });
    builder.addCase(fetchSpecializations.rejected, (state) => {
      state.isFetching = false;
      state.isFetchingError = true;
    });
  },
});

export default specSlice.reducer;
export { fetchSpecializations };
export const { setSpecializations } = specSlice.actions;
