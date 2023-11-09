import type { TapeApiEntry } from '@/features/tapedeck/api/types/tape.type';

/**
 * Type with playingTime property normalized to number, so the component doesn't have to deal with the string "minutes"
 * coming from the api response.
 */
export type TapeViewModel = Omit<TapeApiEntry, 'playingTime'> & {
  /**
   * A generated id based on the tape deck id and the index of the tape in the array.
   */
  id: string;
  /**
   * The total playing time of the tape in minutes.
   */
  playingTime?: number;
};
