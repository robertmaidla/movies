import { Injectable, EventEmitter, Output } from '@angular/core';
import { GenreType } from '../content/movie.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  allMovies: Movie[];

  constructor() { 
    this.allMovies = require('../content/movie.mock-data').movies;
  }
  
  getMovies(): Movie[] {
    return this.allMovies;
  }

  getImgSrc(img: string): string {
    return `../assets/images/movie-covers/${img}`;
  }
}

export class Movie {
    id: string;
		key: string;
		name: string;
		description: string;
		genres: GenreType[];
		rate: string;
		length: string;
		img: string;
}


