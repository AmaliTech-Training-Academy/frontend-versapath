import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ListData, Tag } from "@/lib/types/api";
import { apiRequest } from "@/lib/api/api-request";
const initialState: {
  tags: Tag[];
  isFetchingTags: boolean;
  isFetchingError: boolean;
} = {
  tags: [],
  isFetchingTags: false,
  isFetchingError: false,
};
const fetchTags = createAsyncThunk<Tag[], void, { state: RootState }>(
  "tags/fetchTags",
  async (_, { getState }) => {
    const { tags: existingTags } = getState().tagsReducer;
    if (existingTags.length > 0) {
      return existingTags;
    }
    const response = await apiRequest<ListData<Tag>>("/tags", "GET");
    if (response?.data?.items) {
      return response.data.items;
    } else {
      return [];
    }
  }
);

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    setTags: (state, action) => {
      state.tags = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.tags = action.payload;
      state.isFetchingTags = false;
      state.isFetchingError = false;
    });
    builder.addCase(fetchTags.pending, (state) => {
      state.isFetchingTags = true;
      state.isFetchingError = false;
    });
    builder.addCase(fetchTags.rejected, (state) => {
      state.isFetchingTags = false;
      state.isFetchingError = true;
    });
  },
});
export default tagsSlice.reducer;
export { fetchTags };
