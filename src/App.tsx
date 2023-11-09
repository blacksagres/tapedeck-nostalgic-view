import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ModeToggle } from '@/components/theme-mode-toggle';
import { useTapes } from '@/features/tapedeck/hooks/use-tapes.hook';
import classnames from 'classnames';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/loading-spinner';
import { useTapeFilters } from '@/features/tapedeck/hooks/use-tapes-filters.hook';
import { Combobox } from '@/components/combobox';

function App() {
  const queryResult = useTapes();
  const filterState = useTapeFilters({
    values: {
      selectedBrand: '',
      selectedColor: '',
      selectedType: '',
      playtimeLongerThan: Infinity,
      playtimeShorterThan: Infinity,
    },
    sources: {
      tapes: queryResult.data,
      tapesFiltered: queryResult.data,
    },
  });

  console.log('filterState', filterState);

  const getFallBackTextWhenEmpty = (value?: string | number) => {
    return value ?? 'unspecified';
  };

  if (queryResult.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4 transform animate-in">
        <h2 className="flex items-center pb-2 text-3xl font-semibold tracking-tight border-b scroll-m-20 first:mt-0">
          <LoadingSpinner />
          Loading...
        </h2>
        <p>Please wait while we load your tapes.</p>
      </div>
    );
  }

  if (queryResult.error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <h2 className="pb-2 text-3xl font-semibold tracking-tight border-b scroll-m-20 first:mt-0">
          Really sorry 😥, something went wrong on our side.
        </h2>
        <div>
          <Button
            title="Refresh this page."
            onClick={() => window.location.reload()}
          >
            Try again
          </Button>
        </div>
        <p>If refreshing the page does not help, please contact our support.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 ">
      <div className="self-end">
        <ModeToggle />
      </div>
      <h1 className="mb-16 text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl">
        Welcome to the Tapedeck 📼
      </h1>
      <div className="flex flex-col justify-center w-1/2 mx-auto">
        <div className="space-x-4">
          <Combobox
            options={filterState.options.brands}
            onChange={filterState.eventHandlers.handleOnBrandChange}
            placeholderForSearch="Search for a brand..."
            placeholderForUnselected="Select a brand"
            value={filterState.values.selectedBrand}
          />
          <Combobox
            options={filterState.options.colors}
            onChange={filterState.eventHandlers.handleOnColorChange}
            placeholderForSearch="Search for a color..."
            placeholderForUnselected="Select a color"
            value={filterState.values.selectedColor}
          />
          <Combobox
            options={filterState.options.types}
            onChange={filterState.eventHandlers.handleOnTypeChange}
            placeholderForSearch="Search for a type..."
            placeholderForUnselected="Select a type"
            value={filterState.values.selectedType}
          />
        </div>
        <Table className="">
          <TableCaption>
            {filterState.sources.tapesFiltered.length === 0
              ? 'No matches for this query. 🔍'
              : ''}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Brand</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-left">Playing Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterState.sources.tapesFiltered.map((tape) => (
              <TableRow key={tape.id} className="capitalize">
                <TableCell
                  className={classnames({
                    'opacity-50': !tape.brand,
                  })}
                >
                  {getFallBackTextWhenEmpty(tape.brand)}
                </TableCell>
                <TableCell
                  className={classnames({
                    'opacity-50': !tape.color,
                  })}
                >
                  {getFallBackTextWhenEmpty(tape.color)}
                </TableCell>
                <TableCell
                  className={classnames({
                    'opacity-50': !tape.type,
                  })}
                >
                  {getFallBackTextWhenEmpty(tape.type)}
                </TableCell>
                <TableCell
                  className={classnames('text-left', {
                    'opacity-50': !tape.playingTime,
                  })}
                >
                  {tape.playingTime
                    ? `${tape.playingTime} minutes`
                    : getFallBackTextWhenEmpty(tape.playingTime)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default App;
