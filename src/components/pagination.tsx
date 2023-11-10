import { Button } from '@/components/ui/button';

type PaginationProps = {
  setNextPage: () => void;
  setPreviousPage: () => void;
  nextEnabled: boolean;
  previousEnabled: boolean;
  startIndex: number;
  endIndex: number;
  totalItems: number;
};

export const Pagination = ({
  setNextPage,
  setPreviousPage,
  nextEnabled,
  previousEnabled,
  startIndex,
  endIndex,
  totalItems,
}: PaginationProps) => {
  const normalizedTotalItems = (() => {
    if (nextEnabled) return endIndex;

    return totalItems < endIndex ? totalItems : endIndex;
  })();

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Showing {startIndex + 1} - {normalizedTotalItems} of {totalItems} tapes
      </div>
      <div className="flex items-center justify-end py-4 space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={setPreviousPage}
          disabled={!previousEnabled}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={setNextPage}
          disabled={!nextEnabled}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
