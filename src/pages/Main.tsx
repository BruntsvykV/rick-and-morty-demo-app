import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { Pagination, PaginationItem } from "@mui/material";
import { CHARACTER_BASE_URL, LOCAL_STORAGE_KEY } from "../services/Constants";
import { ICharacter } from "../services/interfaces/ICharacter";
import { fetchCharacters } from "../store/characterSlice";
import { useSearchParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import exportFromJSON from "export-from-json";
import axios from 'axios';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Main = () => {

  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageQuery = searchParams.get('page');
  const pageQueryToNum = !!pageQuery && parseInt(pageQuery);

  const info = useAppSelector(state => state.character.info);
  const characters = useAppSelector(state => state.character.characters);
  const locations = useAppSelector(state => state.location.locations);
  const episodes = useAppSelector(state => state.episode.episodes);
  const [firstEpisode, setFirstEpisode] = useState<string[]>([]);
  const [query, setQuery]: [string, any] = useState('');
  const [page, setPage]: [number, any] = useState(pageQueryToNum || 1);
  const [charactersState, setCharactersState] = useState<ICharacter[]>([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Set characters & response with first episode to state
  useEffect(() => {

    const charactersData = characters.map(item => ({
      id: item.id,
      name: item.name,
      gender: item.gender,
      status: item.status,
      species: item.species,
      type: item.type,
      url: item.url,
      image: item.image,
      created: item.created,
      episode: firstEpisode,
      location: item.location,
      origin: item.origin,
    }));

    setCharactersState(charactersData);

  }, [characters, firstEpisode]);


  // Fetch characters with page parameter
  useEffect(() => {

    dispatch(fetchCharacters(CHARACTER_BASE_URL + `?page=${page}`));

  }, [page, pageQueryToNum, dispatch]);


  // Getting array with name of all first episodes
  useEffect(() => {

    const episodes = characters.map(item => item.episode[0]);

    const episodePromises = episodes.map(episodeUrl =>
      axios.get(episodeUrl)
        .then(res => res.data.name)
        .catch(error => {
          console.error(`Error fetching episode: ${episodeUrl}`, error);
          return null;
        })
    );

    Promise.all(episodePromises)
      .then(episodes => {
        setFirstEpisode(episodes);
      })
      .catch(error => {
        console.error("Error fetching episodes:", error);
      });

  }, [characters]);

  const currentHistoryJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
  const currentHistory: { id: number; value: string }[] = currentHistoryJSON
    ? JSON.parse(currentHistoryJSON)
    : [];

  const handleDownloadCSV = () => {

    const data = charactersState;
    const fileName = 'csvFromJson';
    const exportType =  exportFromJSON.types.csv;

    exportFromJSON({ data, fileName, exportType })
  };

  return (
    <>
      <Stack spacing={10} paddingTop={3} direction="row">
        <Button onClick={handleDownloadCSV}>Download CSV</Button>
        <Button onClick={handleOpen}>Show history</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Last viewed characters
            </Typography>
            {<Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {currentHistory.length > 0
                ? currentHistory.map((item, index) => (
                  <div key={item.id}>
                    <span>{`${index + 1}. ${item.value}`}</span><br/>
                  </div>))
                : "History of search empty now yet. Please make some search ; )"
              }
            </Typography>}
          </Box>
        </Modal>
      </Stack>
      <div className={"card-container"}>
        {!!charactersState && charactersState.map((item, index) => (
          <Card
            imageUrl={item.image}
            name={item.name}
            status={item.status}
            species={item.species}
            locationName={item.location.name}
            firstEpisode={item.episode[index]}
            id={item.id}
            key={index}
          />
        ))}
      </div>
      <div className={"pagination"}>
        <Pagination
          count={info.pages}
          page={page}
          onChange={(_, num) => setPage(num)}
          variant={"outlined"}
          shape={"rounded"}
          size={"medium"}
          color={"primary"}
          sx={{ paddingBottom: 2 }}
          renderItem={
            (item) => (
              <PaginationItem
                component={Link}
                to={`/?page=${item.page}`}
                {...item}
              />
            )
          }
        />
      </div>
    </>
  )
}

export default Main;
