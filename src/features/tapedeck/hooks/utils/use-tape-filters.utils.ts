import type { TapeViewModel } from '@/features/tapedeck/hooks/types/tape.view-model.type';
import type { DropdownOption } from '@/types/dropdown-option.type';

const UNSPECIFIED_OPTION = 'unspecified';

export const PLAYTIME_CONFIG = {
  ANY: 'Any',
  WITHOUT_PLAYTIME: 'Without play time',
  WITH_PLAYTIME: 'With play time',
};

export const generatePlayTimeConfigOptions = () => {
  return Object.values(PLAYTIME_CONFIG).map<DropdownOption>((option) => ({
    id: `playtime-config-${option}`,
    label: option,
    value: option,
  }));
};

const dedupeArray = <T>(array: T[]) => {
  return [...new Set(array)];
};

/**
 * Guard function to check if a value is defined.
 * @param value
 * @returns whether the value is defined or not
 */
const isValueDefined = <T>(value?: T | null): value is T => !!value;

/**
 * To be used with undefined values.
 * @param value
 * @returns whether the value is empty or not
 */
const isValueEmpty = <T>(value?: T | null): value is T => !value;

const getAllValuesForKey = (
  tapes: TapeViewModel[],
  key: keyof TapeViewModel
) => {
  const mappedValues = tapes.map((tape) => tape[key]).filter(isValueDefined);
  return dedupeArray(mappedValues);
};

/**
 * Maps the list of tapes to a list of values for the given key, filtering out undefined values and
 * also duplicate entries. Then maps it all to a list of {@link DropdownOption} objects.
 *
 * @param tapes - the list of tapes to get the values from
 * @param key - the key to get the values for
 * @returns the list of values for the given key
 */
export const generateDropdownOptions = (
  tapes: TapeViewModel[],
  key: keyof TapeViewModel
) => {
  const result = getAllValuesForKey(tapes, key).map<DropdownOption>(
    (brand) => ({
      id: `brand-dropdown-option-${brand}`,
      label: String(brand),
      value: String(brand),
    })
  );

  result.sort((a, b) => a.label.localeCompare(b.label));

  return [
    {
      id: `filter-option-unspecified-${key}`,
      label: 'Unspecified',
      value: UNSPECIFIED_OPTION,
    },
    ...result,
  ];
};

/**
 * Options to be used in the playtime range slider.
 * @param tapes - the list of tapes to get the values from
 * @returns the min and max values for the playtime range slider
 */
export const generatePlayTimeOptions = (
  tapes: TapeViewModel[]
): {
  min: number;
  max: number;
} => {
  const playingTimes = tapes
    .map((tape) => tape.playingTime)
    .filter(isValueDefined);

  const min = Math.min(...playingTimes);
  const max = Math.max(...playingTimes);

  return {
    min,
    max,
  };
};

export const createBrandFilterPredicate = (brand: string) => {
  if (!brand) return () => true;
  if (brand === UNSPECIFIED_OPTION)
    return (tape: TapeViewModel) => isValueEmpty(tape.brand);

  return (tape: TapeViewModel) => tape.brand === brand;
};

export const createTypePredicate = (type: string) => {
  if (!type) return () => true;
  if (type === UNSPECIFIED_OPTION)
    return (tape: TapeViewModel) => isValueEmpty(tape.type);

  return (tape: TapeViewModel) => tape.type === type;
};

export const createColorPredicate = (color: string) => {
  if (!color) return () => true;

  console.log(color);
  if (color === UNSPECIFIED_OPTION) {
    return (tape: TapeViewModel) => isValueEmpty(tape.color);
  }

  return (tape: TapeViewModel) => tape.color === color;
};

export const createPlaytimeConfigPredicate = (playTimeConfig: string) => {
  switch (playTimeConfig) {
    case PLAYTIME_CONFIG.ANY:
      return () => true;
    case PLAYTIME_CONFIG.WITHOUT_PLAYTIME:
      return (tape: TapeViewModel) => isValueEmpty(tape.playingTime);
    case PLAYTIME_CONFIG.WITH_PLAYTIME:
      return (tape: TapeViewModel) => isValueDefined(tape.playingTime);
    default:
      return () => true;
  }
};

export const createPlaytimePredicate = ({
  start,
  end,
}: {
  start: number;
  end: number;
}) => {
  return (tape: TapeViewModel) => {
    if (start === Infinity && end === Infinity) return true;
    if (!tape.playingTime) return true;

    return tape.playingTime >= start && tape.playingTime <= end;
  };
};
