import type { TapeViewModel } from '@/features/tapedeck/hooks/types/tape.view-model.type';

export const sortByBrand = (a: TapeViewModel, b: TapeViewModel) => {
  if (!a.brand) return 0;
  if (!b.brand) return 0;

  return a.brand.localeCompare(b.brand);
};
