import React from "react";
import { Link } from "react-router-dom";

interface ICard {
  imageUrl: string;
  name: string;
  status: string;
  species: string;
  locationName: string;
  firstEpisode: string;
  id: number;
}

const Card = ({
  imageUrl,
  name,
  status,
  species,
  locationName,
  firstEpisode,
  id,
}: ICard) => {

  return (
    <div className={"card"}>
      <Link
        to={`/detail/${id}`}
        className={"card-overlay"}
      />
      <img
        src={imageUrl}
        alt={"character"}
        className={"card-img"}
      />
      <div className={"card-info"}>
        <div className={"card-description"}>
          <span className={"character-name"}>{name}</span>
          <div>
            <span
              className={"alive-indicator"}
              style={{
                backgroundColor:
                  status === 'Alive'
                    ? '#55CC44'
                    : status === 'Dead'
                      ? '#D63D2E'
                      : '#9E9E9E' // unknown
              }}
            />
            <span className={"character-status"}>{`${status} - ${species}`}</span>
          </div>
        </div>
        <div className={"card-description"}>
          <span className={"location-title"}>Last known location:</span>
          <span className={"location-description"}>{locationName}</span>
        </div>
        <div className={"card-description"}>
          <span className={"first-seen"}>First seen in:</span>
          <span className={"first-seen"}>{firstEpisode}</span>
        </div>
      </div>
    </div>
  )
};

export default Card;
