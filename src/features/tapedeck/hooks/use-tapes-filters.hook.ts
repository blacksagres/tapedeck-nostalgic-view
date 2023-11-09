import type { TapeViewModel } from '@/features/tapedeck/hooks/types/tape.view-model.type';
import { useEffect, useReducer } from 'react';
import {
  initialState,
  setSelectedValues,
  setSources,
  tapesFiltersReducer,
} from '@/features/tapedeck/hooks/use-tapes-filters.reducer';

type UseTapeFilterConfig = {
  values: {
    selectedBrand: string;
    selectedColor: string;
    playtimeLongerThan: number;
    playtimeShorterThan: number;
    selectedType: string;
  };
  sources: {
    tapes?: TapeViewModel[];
    tapesFiltered?: TapeViewModel[];
  };
};

/**
 * Uses the view model tapes list and generates filters based on the available data,
 * keeping the source of truth in the tapes list and adding the filtered list as a derived state.
 *
 * @param params - for details, check `TapesFilterState` type from {@link import('@/features/tapedeck/hooks/use-tapes-filters.reducer').TapesFilterState)}
 * @returns
 */
export const useTapeFilters = (params: UseTapeFilterConfig) => {
  const [state, dispatch] = useReducer(tapesFiltersReducer, {
    ...initialState,
    ...params,
    sources: {
      tapes: params.sources.tapes ?? [],
      tapesFiltered: params.sources.tapes ?? [],
    },
  });

  useEffect(() => {
    if (params.sources.tapes) {
      dispatch(
        setSources({
          tapes: params.sources.tapes,
          tapesFiltered: params.sources.tapes,
        })
      );
    }
  }, [params.sources.tapes]);

  const handleOnBrandChange = (brand: string) => {
    dispatch(
      setSelectedValues({
        ...state.values,
        selectedBrand: brand,
      })
    );
  };

  const handleOnTypeChange = (type: string) => {
    dispatch(
      setSelectedValues({
        ...state.values,
        selectedType: type,
      })
    );
  };

  const handleOnColorChange = (color: string) => {
    dispatch(
      setSelectedValues({
        ...state.values,
        selectedColor: color,
      })
    );
  };

  const handleOnPlayTimeChange = ({
    min,
    max,
  }: {
    min: number;
    max: number;
  }) => {
    dispatch(
      setSelectedValues({
        ...state.values,
        playtimeLongerThan: min,
        playtimeShorterThan: max,
      })
    );
  };

  return {
    values: {
      selectedBrand: state.values.selectedBrand,
      selectedColor: state.values.selectedColor,
      playtimeLongerThan: state.values.playtimeLongerThan,
      playtimeShorterThan: state.values.playtimeShorterThan,
      selectedType: state.values.selectedType,
    },
    options: {
      brands: state.options.brands,
      colors: state.options.colors,
      types: state.options.types,
    },
    sources: {
      tapes: state.sources.tapes,
      tapesFiltered: state.sources.tapesFiltered,
    },
    eventHandlers: {
      handleOnBrandChange,
      handleOnColorChange,
      handleOnPlayTimeChange,
      handleOnTypeChange,
    },
  };
};
