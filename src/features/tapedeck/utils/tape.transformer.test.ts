import { transformTapeApiResponseToViewModel } from '@/features/tapedeck/utils/tape.transformer';
import { describe, expect, test } from 'vitest';
import type { TapeDeckApiEntry } from '@/features/tapedeck/api/types/tape.type';

describe('tape.transformer', () => {
  test('should transform the api response to the view model', () => {
    const apiResponse: TapeDeckApiEntry[] = [
      {
        abcd: [
          { page: 'A1' },
          { img: 'https://example.com/tape1.jpg' },
          { thumb: 'https://example.com/tape1-thumb.jpg' },
          { playingTime: '30 minutes' },
          { color: 'Green' },
          { brand: 'Maxell' },
          { type: 'Ferro' },
        ],
      },
      {
        efgh: [
          { page: 'B1' },
          { img: 'https://example.com/tape3.jpg' },
          { thumb: 'https://example.com/tape3-thumb.jpg' },
          { playingTime: '60 minutes' },
          { color: 'Blue' },
          { brand: 'Sony' },
          { type: 'Metal' },
        ],
      },
    ];

    const expected = [
      {
        id: 'abcd-1',
        page: 'A1',
        img: 'https://example.com/tape1.jpg',
        thumb: 'https://example.com/tape1-thumb.jpg',
        playingTime: 30,
        color: 'Green',
        brand: 'Maxell',
        type: 'Ferro',
      },

      {
        id: 'efgh-2',
        page: 'B1',
        img: 'https://example.com/tape3.jpg',
        thumb: 'https://example.com/tape3-thumb.jpg',
        playingTime: 60,
        color: 'Blue',
        brand: 'Sony',
        type: 'Metal',
      },
    ];

    const result = transformTapeApiResponseToViewModel(apiResponse);

    expect(result).toEqual(expected);
  });
});
