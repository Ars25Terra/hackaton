export interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: number;
  rating: string;
  coverImageUrl: string;
  description: string;
}

export interface Hall {
  id: string;
  name: string;
  capacity: number;
  features: string[];
}

export interface Showtime {
  id: string;
  movieId: string;
  hallId: string;
  date: string;
  startTime: string;
}

export interface ShowtimeWithDetails extends Showtime {
  movie: Movie;
  hall: Hall;
}

