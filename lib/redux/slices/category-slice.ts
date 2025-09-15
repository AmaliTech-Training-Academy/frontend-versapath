import { apiRequest } from "@/lib/api/api-request";
import { ListData, Cluster } from "@/lib/types/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: {
  categories: Cluster[];
  isFetchingCategories?: boolean;
  isFetchingError?: boolean;
} = {
  categories: [],
  isFetchingCategories: false,
  isFetchingError: false,
};
const fetchCategories = createAsyncThunk<Cluster[], void, { state: RootState }>(
  "categories/fetchCategories",
  async (_, { getState }) => {
    const { categories: existingCategories } = getState().categoriesReducer;
    if (existingCategories.length > 0) {
      return existingCategories;
    }
    const response = await apiRequest<ListData<Cluster>>("/clusters", "GET");

    if (response?.data?.items) {
      return response.data.items;
    }
    return [];
  }
);
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.isFetchingCategories = false;
      state.isFetchingError = false;
    });
    builder.addCase(fetchCategories.pending, (state) => {
      state.categories = [];
      state.isFetchingCategories = true;
      state.isFetchingError = false;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.categories = [];
      state.isFetchingCategories = false;
      state.isFetchingError = true;
    });
  },
});

export default categorySlice.reducer;
export const { setCategories } = categorySlice.actions;
export { fetchCategories };
