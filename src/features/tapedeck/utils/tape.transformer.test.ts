import { transformTapeApiResponseToViewModel } from '@/features/tapedeck/utils/tape.transformer';
import { describe, test, expect } from 'vitest';
import type { TapeDeckApiEntry } from '../api/types/tape.type';

describe('tape.transformer', () => {
  test('should transform the api response to the view model', () => {
    const apiResponse: TapeDeckApiEntry[] = [
      {
        abcd: [
          {
            page: 'A1',
            img: 'https://example.com/tape1.jpg',
            thumb: 'https://example.com/tape1-thumb.jpg',
            playingTime: '30 minutes',
            color: 'Green',
            brand: 'Maxell',
            type: 'Ferro',
          },
          {
            page: 'A2',
            img: 'https://example.com/tape2.jpg',
            thumb: 'https://example.com/tape2-thumb.jpg',
            playingTime: '45 minutes',
            color: 'Black',
            brand: 'TDK',
            type: 'Chrome',
          },
        ],
      },
      {
        efgh: [
          {
            page: 'B1',
            img: 'https://example.com/tape3.jpg',
            thumb: 'https://example.com/tape3-thumb.jpg',
            playingTime: '60 minutes',
            color: 'Blue',
            brand: 'Sony',
            type: 'Metal',
          },
        ],
      },
    ];

    const expected = [
      {
        id: 'abcd-01',
        page: 'A1',
        img: 'https://example.com/tape1.jpg',
        thumb: 'https://example.com/tape1-thumb.jpg',
        playingTime: '30 minutes',
        color: 'Green',
        brand: 'Maxell',
        type: 'Ferro',
      },
      {
        id: 'abcd-02',
        page: 'A2',
        img: 'https://example.com/tape2.jpg',
        thumb: 'https://example.com/tape2-thumb.jpg',
        playingTime: '45 minutes',
        color: 'Black',
        brand: 'TDK',
        type: 'Chrome',
      },
      {
        id: 'efgh-01',
        page: 'B1',
        img: 'https://example.com/tape3.jpg',
        thumb: 'https://example.com/tape3-thumb.jpg',
        playingTime: '60 minutes',
        color: 'Blue',
        brand: 'Sony',
        type: 'Metal',
      },
    ];

    const result = transformTapeApiResponseToViewModel(apiResponse);

    expect(result).toEqual(expected);
  });
});
