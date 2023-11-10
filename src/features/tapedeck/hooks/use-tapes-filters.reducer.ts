import type { DropdownOption } from '@/types/dropdown-option.type';
import type { TapeViewModel } from '@/features/tapedeck/hooks/types/tape.view-model.type';
import type { AnyAction } from '@reduxjs/toolkit';
import { createAction, createReducer } from '@reduxjs/toolkit';
import {
  createBrandFilterPredicate,
  createColorPredicate,
  createPlaytimePredicate,
  createTypePredicate,
  generateDropdownOptions,
  generatePlayTimeOptions,
} from '@/features/tapedeck/hooks/utils/use-tape-filters.utils';

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
    playTime: {
      min: number;
      max: number;
    };
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
    playTime: {
      min: 0,
      max: 0,
    },
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

      state.options.playTime = generatePlayTimeOptions(action.payload.tapes);
      state.values.playtimeLongerThan = state.options.playTime.min;
      state.values.playtimeShorterThan = state.options.playTime.max;
    })
    .addMatcher(isChangingSourceOrValue, (state) => {
      const combinePredicates = (
        predicates: ((tape: TapeViewModel) => boolean)[]
      ) => {
        return (tape: TapeViewModel) => {
          return predicates.every((predicate) => predicate(tape));
        };
      };

      const filterPredicate = combinePredicates([
        createBrandFilterPredicate(state.values.selectedBrand),
        createColorPredicate(state.values.selectedColor),
        createTypePredicate(state.values.selectedType),
        createPlaytimePredicate({
          start: state.values.playtimeLongerThan,
          end: state.values.playtimeShorterThan,
        }),
      ]);

      state.sources.tapesFiltered = state.sources.tapes.filter(filterPredicate);
    });
});
