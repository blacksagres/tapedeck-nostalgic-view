import type { Tape } from '../api/types/tape.type';

/**
 * Type with playingTime property normalized to number, so the component doesn't have to deal with the string "minutes"
 * coming from the api response.
 */
export type TapeViewModel = Omit<Tape, 'playingTime'> & {
  id: string;
  /**
   * The total playing time of the tape in minutes.
   */
  playingTime?: number;
};
