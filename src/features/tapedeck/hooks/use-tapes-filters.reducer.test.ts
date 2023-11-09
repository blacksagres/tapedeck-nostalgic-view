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
});
