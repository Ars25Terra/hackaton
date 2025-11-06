import { Movie, Hall, Showtime, ShowtimeWithDetails } from '../types';
import { isShowtimePast } from './dateUtils';

export function combineShowtimeData(
  showtimes: Showtime[],
  movies: Movie[],
  halls: Hall[]
): ShowtimeWithDetails[] {
  const movieMap = new Map(movies.map(m => [m.id, m]));
  const hallMap = new Map(halls.map(h => [h.id, h]));

  return showtimes
    .map(showtime => {
      const movie = movieMap.get(showtime.movieId);
      const hall = hallMap.get(showtime.hallId);
      
      if (!movie || !hall) return null;
      
      return {
        ...showtime,
        movie,
        hall,
      };
    })
    .filter((s): s is ShowtimeWithDetails => s !== null);
}

export function filterUpcomingShowtimes(showtimes: ShowtimeWithDetails[]): ShowtimeWithDetails[] {
  return showtimes.filter(s => !isShowtimePast(s.date, s.startTime));
}

export function filterShowtimesByDate(
  showtimes: ShowtimeWithDetails[],
  date: string
): ShowtimeWithDetails[] {
  return showtimes.filter(s => s.date === date);
}

export function filterShowtimesByMovie(
  showtimes: ShowtimeWithDetails[],
  movieId: string
): ShowtimeWithDetails[] {
  return showtimes.filter(s => s.movieId === movieId);
}

export function filterShowtimesByHall(
  showtimes: ShowtimeWithDetails[],
  hallId: string
): ShowtimeWithDetails[] {
  return showtimes.filter(s => s.hallId === hallId);
}

export function groupShowtimesByDate(
  showtimes: ShowtimeWithDetails[]
): Map<string, ShowtimeWithDetails[]> {
  const grouped = new Map<string, ShowtimeWithDetails[]>();
  
  showtimes.forEach(showtime => {
    const existing = grouped.get(showtime.date) || [];
    existing.push(showtime);
    grouped.set(showtime.date, existing);
  });
  
  grouped.forEach(group => {
    group.sort((a, b) => a.startTime.localeCompare(b.startTime));
  });
  
  return grouped;
}

export function sortShowtimesByTime(showtimes: ShowtimeWithDetails[]): ShowtimeWithDetails[] {
  return [...showtimes].sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    return a.startTime.localeCompare(b.startTime);
  });
}

export function filterShowtimesInDateRange(
  showtimes: ShowtimeWithDetails[],
  startDate: string,
  endDate: string
): ShowtimeWithDetails[] {
  return showtimes.filter(s => s.date >= startDate && s.date <= endDate);
}

