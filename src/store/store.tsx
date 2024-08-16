import { configureStore } from "@reduxjs/toolkit";
import hospitalsSlice, { HospitalsState } from "./slice";

export type RootState = {
  hospitals: HospitalsState;
};

const store = configureStore<RootState>({
  reducer: {
    hospitals: hospitalsSlice,
  },
});

export default store;
