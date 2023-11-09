/**
 * Type with playingTime property normalized to number, so the component doesn't have to deal with the string "minutes"
 * coming from the api response.
 */
export type TapeViewModel = {
  /**
   * A generated id based on the tape deck id and the index of the tape in the array.
   */
  id: string;
  /**
   * The total playing time of the tape in minutes.
   */
  playingTime?: number;
  page?: string;
  img?: string;
  thumb?: string;
  color?: string;
  brand?: string;
  type?: string;
};
