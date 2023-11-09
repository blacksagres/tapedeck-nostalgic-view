import type { TapeViewModel } from '@/features/tapedeck/hooks/types/tape.view-model.type';
import type { DropdownOption } from '@/types/dropdown-option.type';

const dedupeArray = <T>(array: T[]) => {
  return [...new Set(array)];
};

/**
 * Guard function to check if a value is defined.
 * @param value
 * @returns whether the value is defined or not
 */
const isValueDefined = <T>(value?: T | null): value is T => !!value;

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
  return getAllValuesForKey(tapes, key).map<DropdownOption>((brand) => ({
    id: `brand-dropdown-option-${brand}`,
    label: String(brand),
    value: String(brand),
  }));
};

export const createBrandFilterPredicate = (brand: string) => {
  if (!brand) return () => true;

  return (tape: TapeViewModel) => tape.brand === brand;
};

export const createTypePredicate = (type: string) => {
  if (!type) return () => true;

  return (tape: TapeViewModel) => tape.type === type;
};

export const createColorPredicate = (color: string) => {
  if (!color) return () => true;

  return (tape: TapeViewModel) => tape.color === color;
};

export const createPlaytimePredicate = ({
  start,
  end,
}: {
  start: number;
  end: number;
}) => {
  return (tape: TapeViewModel) => {
    if (!tape.playingTime) return false;

    return tape.playingTime >= start && tape.playingTime <= end;
  };
};
