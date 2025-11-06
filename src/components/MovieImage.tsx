import { Box, BoxProps } from '@mui/material';
import { useState } from 'react';

interface MovieImageProps extends BoxProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
}

export function MovieImage({ src, alt, fallbackSrc, ...boxProps }: MovieImageProps) {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  const imageSrc = error && fallbackSrc ? fallbackSrc : src;

  return (
    <Box
      component="img"
      src={error ? '/placeholder-movie.svg' : imageSrc}
      alt={alt}
      onError={handleError}
      {...boxProps}
    />
  );
}

