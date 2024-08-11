import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Hospital { // Structure of the hospital
  id: string;
  hospitalName: string;
  address: string;
  location: number;
}

export interface HospitalsState { // Had to export the state because for some reason it did not show up in the store
  hospitals: Hospital[];
}

const initialState: HospitalsState = {
  hospitals: [],
};

const hospitalsSlice = createSlice({
  name: "hospitals",
  initialState,
  reducers: {
    addHospital: (state, action: PayloadAction<Hospital>) => {
      state.hospitals.push(action.payload);
    },
  },
});

export const { addHospital } = hospitalsSlice.actions;
export default hospitalsSlice.reducer;
