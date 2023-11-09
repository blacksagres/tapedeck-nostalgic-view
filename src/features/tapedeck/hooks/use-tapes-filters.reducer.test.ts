import { describe, expect, test } from 'vitest';
import {
  tapesFiltersReducer,
  initialState,
  setSelectedValues,
} from '@/features/tapedeck/hooks/use-tapes-filters.reducer';

describe('use-tapes-filters.reducer', () => {
  test('should set the selected values', () => {
    const expected = {
      selectedBrand: 'Maxell',
      selectedColor: 'Green',
      playtimeLongerThan: 30,
      playtimeShorterThan: 60,
      selectedType: 'Ferro',
    };

    const resultState = tapesFiltersReducer(
      initialState,
      setSelectedValues(expected)
    );

    expect(resultState.values).toEqual(expected);
  });

  test('should not change the state if the action is not recognized', () => {
    const resultState = tapesFiltersReducer(initialState, {
      type: 'NOT_RECOGNIZED_ACTION',
    });

    expect(resultState).toEqual(initialState);
  });

  describe('when filtering', () => {
    const tapes = [
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
      {
        id: 'ijkl-3',
        page: 'C1',
        img: 'https://example.com/tape3.jpg',
        thumb: 'https://example.com/tape3-thumb.jpg',
        playingTime: 90,
        color: 'Red',
        brand: 'TDK',
        type: 'Chrome',
      },
    ];

    test.each([{}])(
      'when changing the selected values for brand, it should filter the tapes',
      () => {
        const [expected] = tapes;

        const resultState = tapesFiltersReducer(
          {
            ...initialState,
            sources: {
              tapes,
              tapesFiltered: [],
            },
          },
          setSelectedValues({
            ...initialState.values,
            selectedBrand: 'Maxell',
          })
        );

        expect(resultState.sources.tapesFiltered).toEqual([expected]);
      }
    );
  });
});
