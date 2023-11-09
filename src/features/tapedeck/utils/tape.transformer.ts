import type {
  TapeApiEntry,
  TapeDeckApiEntry,
} from '@/features/tapedeck/api/types/tape.type';
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
 * Takes the tuple entry of the tape and reduces it to a single object, so the shape goes from:
 *
 * `[{ page: 'A1' }, { img: 'https://example.com/tape1.jpg' }, ...]`
 *
 * to
 *
 * `{ page: 'A1', img: 'https://example.com/tape1.jpg', ... }`.
 *
 * @param tape - the tape tuple entry
 * @returns a single tape object that almost matches the TapeViewModel type, leaving out the normalized playingTime and id properties
 */
const reduceTapeTupleEntry = (tape: TapeApiEntry) => {
  const tapeObjectReduced = tape.reduce((resultObject, tapeTupleEntry) => {
    /**
     * Each entry of the tape tuple is an object with one key-value pair.
     * So we can use Object.keys to get the the first key.
     */
    const [key] = Object.keys(tapeTupleEntry);
    /**
     * Another solution here would be to loosen the type of the tape tuple to
     * `Record<string, string>[]` and then use `tapeTupleEntry[key]`.
     *
     * But having more info on the keys is better and safer.
     */
    const value = tapeTupleEntry[key as keyof typeof tapeTupleEntry];
    return {
      ...resultObject,
      [key]: value,
    };
  }, {}) as Omit<TapeViewModel, 'id' | 'playingTime'> & {
    playingTime?: string;
  };

  return tapeObjectReduced;
};

/**
 * In the api response, the tape is a tuple-like shape with the object key-values split in an array.
 * This function transforms the api response to a flat array of tapes.
 *
 * Normalizes the playingTime property to a number and giving each tape a unique id.
 * @param tapeApiEntries the api response
 * @returns {TapeViewModel[]} an array of tapes
 */
export const transformTapeApiResponseToViewModel = (
  tapeApiEntries: TapeDeckApiEntry[]
): TapeViewModel[] => {
  const result = tapeApiEntries.flatMap<TapeViewModel>(
    (tapeApiEntry, index) => {
      const [id] = Object.keys(tapeApiEntry);
      const tapeTuple = tapeApiEntry[id];

      const tapeObjectReduced = reduceTapeTupleEntry(tapeTuple);

      return {
        id: `${id}-${index + 1}`,
        ...tapeObjectReduced,
        playingTime: tryParsingPlayingTime(tapeObjectReduced.playingTime),
      };
    }
  );

  return result;
};
