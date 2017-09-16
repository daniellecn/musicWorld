import { Artist } from './../Modules/artist';

export class Song{
  _id: string;
  name: string;
  artist: Artist;
  album?: string;
  publisher: string;
  publicationYear: number;
  genere: string;
  views?: number;
  words: string;
}