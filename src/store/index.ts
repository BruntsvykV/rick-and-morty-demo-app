import { configureStore } from "@reduxjs/toolkit";
import characterReducer from "./characterSlice";
import locationReducer from "./locationSlice";
import episodeReducer from "./episodeSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


export function makeStore() {
  return configureStore({
    reducer: {
      character: characterReducer,
      location: locationReducer,
      episode: episodeReducer,
    },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default store;
