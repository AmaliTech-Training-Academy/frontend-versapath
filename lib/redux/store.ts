//Redux setup for the application
import updateUser from "./slices/update-user-slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import rolesReducer from "./slices/roles-slice";
import categoriesReducer from "./slices/category-slice";
import tagsReducer from "./slices/tags-slice";
const rootReducer = combineReducers({
  updateUser,
  rolesReducer,
  categoriesReducer,
  tagsReducer,
});
const persistConfig = {
  key: "root",
  storage,
  //   whitelist: ["auth"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
