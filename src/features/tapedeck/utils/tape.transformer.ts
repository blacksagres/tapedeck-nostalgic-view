import type { TapeDeckApiEntry } from '@/features/tapedeck/api/types/tape.type';
import type { TapeViewModel } from '@/features/tapedeck/hooks/tape.view-model.type';

/**
 * Assuming based on the data that the `playingTime` property is always a string with the format "X minutes",
 * this function tries to parse the number from the string.
 *
 * If the string is not in the expected format, it returns undefined.
 * @param playingTime the playingTime string to parse
 * @returns  {number | undefined} a number or undefined
 */
const tryParsingPlayingTime = (
  playingTime: string | undefined
): number | undefined => {
  if (!playingTime) return undefined;

  try {
    return parseInt(playingTime.replace('minutes', ''), 10);
  } catch (error) {
    console.error('Unexpected format: Error parsing playingTime', error);
    return undefined;
  }
};

/**
 * In the api response, the tapes are grouped by the id of the tape deck.
 * This function transforms the api response to a flat array of tapes.
 *
 * Normalizes the playingTime property to a number and giving each tape a unique id.
 * @param tapeApiEntries
 * @returns
 */
export const transformTapeApiResponseToViewModel = (
  tapeApiEntries: TapeDeckApiEntry[]
): TapeViewModel[] => {
  const result = tapeApiEntries.flatMap((tapeApiEntry) => {
    const [id] = Object.keys(tapeApiEntry);
    const tapes = tapeApiEntry[id];

    return tapes.map((tape, index) => ({
      id: `${id}-${index + 1}`,
      ...tape,
      playingTime: tryParsingPlayingTime(tape.playingTime),
    }));
  });

  return result;
};
