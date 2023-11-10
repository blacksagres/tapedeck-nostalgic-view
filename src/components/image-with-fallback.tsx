import classNames from 'classnames';
import { useEffect, useState } from 'react';
import tapeNotFoundFallbackImage from '@/components/assets/tape-not-found-fallback.jpg';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

type ImageWithFallbackProps = {
  src?: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
};

export const ImageWithFallback = (props: ImageWithFallbackProps) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageSource, setImageSource] = useState(props.fallbackSrc);

  useEffect(() => {
    if (props.src) {
      const image = new Image();

      image.src = props.src;

      setIsLoading(true);

      image.onload = () => {
        setImageSource(props.src as string);
        setIsLoading(false);
      };

      image.onerror = () => {
        setHasError(true);
        setIsLoading(false);
        setImageSource(tapeNotFoundFallbackImage);
      };
    }
  }, [props.src]);

  return (
    <div className="relative">
      <img
        src={imageSource}
        alt={props.alt}
        className={classNames(
          {
            'animate-pulse': isLoading,
            'blur-md grayscale': hasError || isLoading,
          },
          props.className
        )}
      />

      <Alert
        className={classNames(
          [
            'absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2',
            'w-auto text-center',
            'transition-opacity',
          ],
          {
            'opacity-0': !hasError,
            'opacity-100': hasError,
          }
        )}
      >
        <AlertTitle>Something went wrong.</AlertTitle>
        <AlertDescription>Could not load this image.</AlertDescription>
      </Alert>
    </div>
  );
};
