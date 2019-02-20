import { Component, OnInit } from '@angular/core';
import { DataService, Movie } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  movie: Movie;
  key: string;

  constructor(private data: DataService, private route: ActivatedRoute) {}

  ngOnInit() {
    // Get the key of the movie (from url parameter)
    this.key = this.route.snapshot.paramMap.get('key');

    // Get the movie object
    this.movie = this.data.getMovies().find(obj => {
      return obj.key == this.key;
    });
  }

  getImg() {
    return this.data.getImgSrc(this.movie.img);
  }

}
