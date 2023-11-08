import type { Tape } from '../api/types/tape.type';

export type TapeViewModel = Tape & {
  /**
   * The total playing time of the tape in minutes.
   */
  playingTime?: number;
};
