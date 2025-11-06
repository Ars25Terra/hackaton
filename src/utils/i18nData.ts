import { TFunction } from 'i18next';
import { Hall, Movie } from '../types';

export function getTranslatedMovie(movie: Movie, t: TFunction): Movie {
  const translation = t(`movieData.${movie.id}`, { returnObjects: true, defaultValue: null });
  
  if (!translation || typeof translation === 'string') {
    return movie;
  }

  return {
    ...movie,
    title: (translation as any).title || movie.title,
    description: (translation as any).description || movie.description,
    genre: (translation as any).genre || movie.genre,
  };
}

export function getTranslatedHall(hall: Hall, t: TFunction): Hall {
  const translation = t(`hallData.${hall.id}`, { returnObjects: true, defaultValue: null });
  
  if (!translation || typeof translation === 'string') {
    return hall;
  }

  const translatedHall = {
    ...hall,
    name: (translation as any).name || hall.name,
  };

  if ((translation as any).features) {
    const featuresMap = (translation as any).features;
    translatedHall.features = hall.features.map(feature => {
      const key = feature.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
      return featuresMap[key] || feature;
    });
  }

  return translatedHall;
}

