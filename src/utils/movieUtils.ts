import { Movie } from '../types';

export function filterMoviesBySearch(movies: Movie[], query: string): Movie[] {
  if (!query.trim()) {
    return movies;
  }

  const normalizedQuery = query.toLowerCase().trim();

  return movies.filter((movie) => {
    const titleMatch = movie.title.toLowerCase().includes(normalizedQuery);
    const genreMatch = movie.genre.toLowerCase().includes(normalizedQuery);
    const directorMatch = movie.director.toLowerCase().includes(normalizedQuery);

    return titleMatch || genreMatch || directorMatch;
  });
}

export function sortMovies(movies: Movie[]): Movie[] {
  return [...movies].sort((a, b) => a.title.localeCompare(b.title));
}

