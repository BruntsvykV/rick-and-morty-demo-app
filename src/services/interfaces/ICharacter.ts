import { ILink } from "./ILink";

export interface ICharacter {
  id: number;
  name: string;
  gender: string;
  status: string;
  species: string;
  type: string;
  url: string;
  image: string;
  created: string;
  episode: string[];
  location: ILink;
  origin: ILink;
}
