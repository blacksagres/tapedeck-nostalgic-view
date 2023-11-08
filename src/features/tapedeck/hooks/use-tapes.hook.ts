import type { UseQueryResult } from 'react-query';
import { useQuery } from 'react-query';
import { fetchTapes } from '@/features/tapedeck/api/tapedeck.api';
import type { TapeViewModel } from '@/features/tapedeck/hooks/tape.view-model.type';
import { transformTapeApiResponseToViewModel } from '@/features/tapedeck/utils/tape.transformer';

/**
 * Fetches the tapes from the api and transforms the response to a flat array of tapes with normalized playingTime and unique ids.
 * @returns {UseQueryResult<TapeViewModel[], unknown>} a react-query useQuery result
 */
export const useTapes = (): UseQueryResult<TapeViewModel[], unknown> => {
  const query = useQuery<TapeViewModel[]>('tapes', async () => {
    const tapes = await fetchTapes();
    return transformTapeApiResponseToViewModel(tapes);
  });

  return query;
};
