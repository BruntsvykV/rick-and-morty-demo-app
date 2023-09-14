import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EPISODE_BASE_URL, STORE_STATUS } from "../services/Constants";
import { IInfo } from "../services/interfaces/IInfo";
import { IEpisode } from "../services/interfaces/IEpisode";

interface IState {
  info: IInfo;
  episodes: IEpisode[];
  status?: STORE_STATUS;
}

const initialState: IState = {
  info: {
    count: 0,
    next: null,
    pages: 0,
    prev: null,
  },
  episodes: [],
}

export const fetchEpisodes = createAsyncThunk (
  'episode/fetchEpisodes',
  async () => {
    const response = await fetch(EPISODE_BASE_URL);
    const data = response.json();
    return data;
  }
);

const episodeSlices = createSlice({
  name: 'episodes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEpisodes.pending, (state, action) => {
      state.status = STORE_STATUS.LOADING;
    });
    builder.addCase(fetchEpisodes.fulfilled, (state, action) => {
      state.status = STORE_STATUS.RESOLVED;
      state.info = action.payload.info;
      state.episodes = action.payload.results;
    });
  }
});

export default episodeSlices.reducer;
