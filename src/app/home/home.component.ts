import { Component, OnInit } from '@angular/core';
import { DataService, Movie } from '../data.service';
import { GenreType, genreType } from 'src/content/movie.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DataService]
})
export class HomeComponent implements OnInit {

  allMovies: Movie[];
  displayedMovies: Movie[];
  searchForm:FormGroup;
  genres: string[] = ['All genres'];
  selectedGenre: string = 'All genres';
  showGenreMenu: boolean = false;
  searchError:boolean = false;

  constructor(private _data:DataService, private _formBuilder:FormBuilder) {
    this.searchForm = this._formBuilder.group({
      searchInput: ['']
    });
  }

  ngOnInit() {
    // Fetch the list of Movies and sort by rating
    this.allMovies = this._data.getMovies();
    this.displayedMovies = this._data.getMovies();
    this.sortByRating(this.displayedMovies);
    // Fetch genres
    for (let g in genreType) {
      this.genres.push(g);
    }
  }

  getImg(movie: Movie): string {
    return this._data.getImgSrc(movie.img);
  }

  // Genre change
  onNewGenre(genre: string) {
    this.selectedGenre = genre;
    if (this.selectedGenre === 'All genres') {
      // Display full list
      this.displayedMovies = this.allMovies;
    } else {
      // Perform category query
      this.displayedMovies = this.categoryQuery(this.allMovies, this.selectedGenre);
    }
    this.showGenreMenu = false;
  }

  // Search submit
  onSearchSubmit() {
    let searchValue:string = this.searchForm.controls.searchInput.value;
    const searchMovies:Movie[] = this.titleQuery(this.allMovies, searchValue);
    if (searchMovies.length === 0) {
      // Pop-up that no results found
      this.searchError = true;
      setTimeout(() => {
        this.searchError = false;
      }, 1500);
    } else {
      this.displayedMovies = searchMovies;
    }
  }

  // Filter list by titles
  titleQuery(list: Movie[], query: string): Movie[] {
    return list.filter(movie => {
      return movie.name.toLowerCase().includes(query.toLowerCase());
    });
  }

  // Filters list by categories
  categoryQuery(list: Movie[], query: string): Movie[] {
    return list.filter(movie => {
      return movie.genres.includes(query as GenreType);
    });
  }

  // Sort list by rating
  sortByRating(list: Movie[]): Movie[] {
    return list.sort( function(a, b) {
      return b.rate.localeCompare(a.rate);
    });
  }
}
