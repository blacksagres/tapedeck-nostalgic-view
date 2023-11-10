import classNames from 'classnames';
import { useState } from 'react';
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

  const onLoadError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const onLoadSuccess = () => {
    setHasError(false);
    setIsLoading(false);
  };

  const onLoadStart = () => {
    setIsLoading(true);
  };

  const imageSource = (() => {
    if (isLoading) return props.fallbackSrc;
    if (hasError) return tapeNotFoundFallbackImage;

    return props.src;
  })();

  return (
    <div className="relative">
      <img
        src={imageSource}
        loading="lazy"
        alt={props.alt}
        onError={onLoadError}
        onLoad={onLoadSuccess}
        onLoadStart={onLoadStart}
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
