import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CHARACTER_BASE_URL, STORE_STATUS } from "../services/Constants";
import { IInfo } from "../services/interfaces/IInfo";
import { ICharacter } from "../services/interfaces/ICharacter";

interface IState {
  info: IInfo;
  characters: ICharacter[];
  status?: STORE_STATUS;
}

const initialState: IState = {
  info: {
    count: 0,
    next: null,
    pages: 0,
    prev: null,
  },
  characters: [],
}


export const fetchCharacters = createAsyncThunk(
  'character/fetchCharacters',
  async (searchURL?: string) => {
    const response = await fetch(searchURL || CHARACTER_BASE_URL);
    const data = await response.json();
    return data;
  }
);

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCharacters.pending, (state) => {
      state.status = STORE_STATUS.LOADING;
    });
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      state.status = STORE_STATUS.RESOLVED;
      state.info = action.payload.info;
      state.characters = action.payload.results;
    });
  },
});

export default characterSlice.reducer;
