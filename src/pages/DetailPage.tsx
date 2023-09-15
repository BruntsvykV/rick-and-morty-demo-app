import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ICharacter } from "../services/interfaces/ICharacter";
import { LOCAL_STORAGE_KEY } from "../services/Constants";
import { useAppSelector } from "../store";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios from "axios";

const DetailPage = () => {

  const { id } = useParams();

  const info = useAppSelector(state => state.character.info);
  const [character, setCharacter] = useState<ICharacter>({
    id: 0,
    name: '',
    gender: '',
    status: '',
    species: '',
    type: '',
    url: '',
    image: '',
    created: '',
    episode: [],
    location: { name: '', url: '' },
    origin: { name: '', url: '' },
  });
  const [firstEpisode, setFirstEpisode] = useState<string[]>([]);


  // Load character from his id
  useEffect(() => {

    axios.get(`https://rickandmortyapi.com/api/character/${id}`)
      .then(res => {
        setCharacter(res.data);
      })
      .catch(error => {
        console.error(`Error fetching character: ${id}`, error);
        return null;
      })

  }, [id]);

  // Getting name of first episodes
  useEffect(() => {

    const episodes = character.episode[0];

    axios.get(episodes)
      .then(res => {
        setFirstEpisode(res.data.name);
      })
      .catch(error => {
        console.error(`Error fetching character: ${id}`, error);
        return null;
      })

    if (character.name) {

      const currentHistoryJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
      const currentHistory: { id: number; value: string }[] = currentHistoryJSON
        ? JSON.parse(currentHistoryJSON)
        : [];

      const newHistoryEntry = {
        id: character.id,
        value: `Переглянуто інформацію що до ${character.name}`,
      };

      const isDuplicate = currentHistory.some(entry => entry.id === newHistoryEntry.id);

      if (!isDuplicate) {
        currentHistory.unshift(newHistoryEntry);
        const slicedHistory = currentHistory.slice(0, 10);

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(slicedHistory));
      }

    }

  }, [character]);

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 367);
  }, []);


  return (
    <>
      <Stack paddingTop={3} direction="row">
        <Button>
          <Link
            to={info.prev === null
              ? "/"
              : `/?page=${parseInt(info.prev.split('=')[1]) + 1}`}
            style={{ color: "#1976D2" }}
          >
            Back to characters
          </Link>
        </Button>
      </Stack>
      <div className={"detail-card-container"}>
        <img src={character.image} alt={"detail card"} className={"detail-card-image"}/>
        <div className={"detail-card-info"}>
          <div className={"detail-card-description"}>
            <span className={"character-name"}>{character.name}</span>
            <div>
            <span
              className={"alive-indicator"}
              style={{
                backgroundColor:
                  character.status === 'Alive'
                    ? '#55CC44'
                    : character.status === 'Dead'
                      ? '#D63D2E'
                      : '#9E9E9E' // unknown
              }}
            />
              <span className={"character-status"}>{`${character.status} - ${character.species}`}</span>
            </div>
          </div>
          <div className={"detail-card-description"}>
            <span className={"location-title"}>Last known location:</span>
            <span className={"location-description"}>{character.location.name}</span>
          </div>
          <div className={"detail-card-description"}>
            <span className={"first-seen"}>First seen in:</span>
            <span className={"first-seen"}>{firstEpisode}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailPage;
