import type { DropdownOption } from '@/types/dropdown-option.type';
import type { TapeViewModel } from '@/features/tapedeck/hooks/types/tape.view-model.type';
import type { AnyAction } from '@reduxjs/toolkit';
import { createAction, createReducer } from '@reduxjs/toolkit';
import { generateDropdownOptions } from '@/features/tapedeck/hooks/utils/use-tape-filters.utils';

type TapesFilterState = {
  values: {
    selectedBrand: string;
    selectedColor: string;
    playtimeLongerThan: number;
    playtimeShorterThan: number;
    selectedType: string;
  };
  options: {
    brands: DropdownOption[];
    colors: DropdownOption[];
    types: DropdownOption[];
  };
  sources: {
    tapes: TapeViewModel[];
    tapesFiltered: TapeViewModel[];
  };
};

export const initialState: TapesFilterState = {
  values: {
    selectedBrand: '',
    selectedColor: '',
    playtimeLongerThan: Infinity,
    playtimeShorterThan: Infinity,
    selectedType: '',
  },
  options: {
    brands: [],
    colors: [],
    types: [],
  },
  sources: {
    tapes: [],
    tapesFiltered: [],
  },
};

export const setSelectedValues = createAction<TapesFilterState['values']>(
  'tapesFilters/setSelectedValues'
);

export const setSources = createAction<TapesFilterState['sources']>(
  'tapesFilters/setSources'
);

const isChangingSourceOrValue = (action: AnyAction) =>
  [setSelectedValues.type, setSources.type].includes(String(action.type));

export const tapesFiltersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setSelectedValues, (state, action) => {
      state.values = action.payload;
    })
    .addCase(setSources, (state, action) => {
      state.sources = action.payload;

      state.options.brands = generateDropdownOptions(
        action.payload.tapes,
        'brand'
      );
      state.options.colors = generateDropdownOptions(
        action.payload.tapes,
        'color'
      );
      state.options.types = generateDropdownOptions(
        action.payload.tapes,
        'type'
      );
    });
});
