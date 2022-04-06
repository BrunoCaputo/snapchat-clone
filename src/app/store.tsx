import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import appReducer from "../features/appSlice";
import cameraReducer from "../features/cameraSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    camera: cameraReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
