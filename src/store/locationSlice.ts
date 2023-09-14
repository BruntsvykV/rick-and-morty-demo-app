import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOCATION_BASE_URL, STORE_STATUS } from "../services/Constants";
import { IInfo } from "../services/interfaces/IInfo";
import { ILocation } from "../services/interfaces/ILocation";

interface IState {
  info: IInfo;
  locations: ILocation[];
  status?: STORE_STATUS;
}

const initialState: IState = {
  info: {
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  },
  locations: [],
}

export const fetchLocations = createAsyncThunk(
  'location/fetchLocations',
  async () => {
    const response = await fetch(LOCATION_BASE_URL);
    const data = await response.json();
    return data;
  }
);

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLocations.pending, (state) => {
      state.status = STORE_STATUS.LOADING;
    });
    builder.addCase(fetchLocations.fulfilled, (state, action) => {
      state.status = STORE_STATUS.RESOLVED;
      state.info = action.payload.info;
      state.locations = action.payload.results;
    });
  }
});

export default locationSlice.reducer;
