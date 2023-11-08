import type { TapeDeckApiEntry } from '@/features/tapedeck/api/types/tape.type';

export const fetchTapes = async (): Promise<TapeDeckApiEntry[]> => {
  return await fetch('https://tapedeck-api-fresk.vercel.app/api', {
    headers: {
      Accept: 'application/json',
      'x-api-key': import.meta.env.VITE_API_KEY as string,
    },
  }).then((res) => res.json() as Promise<TapeDeckApiEntry[]>);
};
