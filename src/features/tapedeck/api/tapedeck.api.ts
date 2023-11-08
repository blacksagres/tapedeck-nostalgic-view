import { TapeDeckApiEntry } from '@/features/tapedeck/api/types/tape.type';

export const fetchTapes = async (): Promise<TapeDeckApiEntry[]> => {
  return await fetch('https://tapedeck-api-fresk.vercel.app/api').then(
    (res) => res.json() as Promise<TapeDeckApiEntry[]>
  );
};
