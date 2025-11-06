import { useMemo, useState } from 'react';
import { Movie, Hall, Showtime, ShowtimeWithDetails } from '../types';

const dataCache: {
  movies?: Movie[];
  halls?: Hall[];
  showtimes?: Showtime[];
} = {};

async function loadData<T>(url: string, key: keyof typeof dataCache): Promise<T[]> {
  if (dataCache[key]) {
    return dataCache[key] as T[];
  }
  
  const response = await fetch(url);
  const data = await response.json();
  dataCache[key] = data;
  return data;
}

export function useData() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [halls, setHalls] = useState<Hall[]>([]);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [loading, setLoading] = useState(true);

  useMemo(() => {
    Promise.all([
      loadData<Movie>('/data/movies.json', 'movies'),
      loadData<Hall>('/data/halls.json', 'halls'),
      loadData<Showtime>('/data/showtimes.json', 'showtimes'),
    ]).then(([moviesData, hallsData, showtimesData]) => {
      setMovies(moviesData);
      setHalls(hallsData);
      setShowtimes(showtimesData);
      setLoading(false);
    });
  }, []);

  return { movies, halls, showtimes, loading };
}

