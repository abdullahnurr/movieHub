export interface Cast {
  id: string;
  name: string;
  character: string;
  profile_path: string;
}

export interface Movie {
  id: string;
  movie_id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  casts: Cast[];
}
