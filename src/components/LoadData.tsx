import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import {STORE_STATUS} from "../services/Constants";
import {fetchCharacters} from "../store/characterSlice";
import { fetchLocations } from "../store/locationSlice";
import { fetchEpisodes } from "../store/episodeSlice";

const LoadData = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.character.status) === STORE_STATUS.LOADING

  useEffect(() => {
      dispatch(fetchCharacters());
      dispatch(fetchLocations());
      dispatch(fetchEpisodes());
  }, [dispatch]);

  if (isLoading) {
      return <h2>Loading, please wait ...</h2>
  }

  return <></>
};

export default LoadData;
