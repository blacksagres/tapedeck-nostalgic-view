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

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { CassetteTape } from 'lucide-react';
import { usePagination } from '@/features/tapedeck/hooks/use-pagination.hook';
import { Pagination } from '@/components/pagination';
import { Slider } from '@/components/ui/slider';
import classNames from 'classnames';

function App() {
  const queryResult = useTapes();
  const filterState = useTapeFilters({
    values: {
      selectedBrand: '',
      selectedColor: '',
      selectedType: '',
      playtimeLongerThan: Infinity,
      playtimeShorterThan: Infinity,
      selectedDurationConfig: '',
    },
    sources: {
      tapes: queryResult.data,
      tapesFiltered: queryResult.data,
    },
  });

  const itemsPerPage = 50;

  const {
    currentPage,
    setNextPage,
    setPreviousPage,
    nextEnabled,
    previousEnabled,
    resetPagination,
  } = usePagination(filterState.sources.tapesFiltered.length, itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentDataPage = filterState.sources.tapesFiltered.slice(
    startIndex,
    endIndex
  );

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
      <div className="max-w-[1800px]">
        <div className="mb-16">
          <h1 className="flex flex-row justify-center space-x-4 text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl">
            <span>The Tapedeck Shack!</span> <CassetteTape size={50} />
          </h1>
          <p className="text-sm leading-7 text-center">
            Use the filters below to find the tape(s) you are looking for.
          </p>
        </div>
        <div className="mb-8 space-y-4">
          <div className="space-x-4">
            <Combobox
              options={filterState.options.brands}
              onChange={(value) => {
                filterState.eventHandlers.handleOnBrandChange(value);
                resetPagination();
              }}
              placeholderForSearch="Search for a brand..."
              placeholderForUnselected="Select a brand"
              value={filterState.values.selectedBrand}
            />
            <Combobox
              options={filterState.options.colors}
              onChange={(value) => {
                filterState.eventHandlers.handleOnColorChange(value);
                resetPagination();
              }}
              placeholderForSearch="Search for a color..."
              placeholderForUnselected="Select a color"
              value={filterState.values.selectedColor}
            />
            <Combobox
              options={filterState.options.types}
              onChange={(value) => {
                filterState.eventHandlers.handleOnTypeChange(value);
                resetPagination();
              }}
              placeholderForSearch="Search for a type..."
              placeholderForUnselected="Select a type"
              value={filterState.values.selectedType}
            />
            <Combobox
              options={filterState.options.durationConfig}
              onChange={(value) => {
                filterState.eventHandlers.handleOnDurationConfigChange(value);
                resetPagination();
              }}
              placeholderForSearch="Play time..."
              placeholderForUnselected="Play time config"
              value={filterState.values.selectedType}
            />
          </div>
          <div
            className={classNames(
              'space-y-4 transform transition-all ease-in-out',
              {
                'opacity-0': !filterState.config.shouldEnablePlayTimeSlider,
                'opacity-1': filterState.config.shouldEnablePlayTimeSlider,
              }
            )}
          >
            <p>
              Playing time (shorter than):{' '}
              {filterState.values.playtimeShorterThan} minutes
            </p>
            <Slider
              value={[filterState.values.playtimeShorterThan]}
              min={filterState.options.playTime.min}
              max={filterState.options.playTime.max}
              onValueChange={(value) => {
                const [newValue] = value;
                filterState.eventHandlers.handleOnPlayTimeChange({
                  min: filterState.options.playTime.min,
                  max: newValue,
                });
              }}
              step={1}
            />
          </div>
        </div>

        <Pagination
          nextEnabled={nextEnabled}
          previousEnabled={previousEnabled}
          setNextPage={setNextPage}
          setPreviousPage={setPreviousPage}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={filterState.sources.tapesFiltered.length}
        />
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
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentDataPage.map((tape) => (
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
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Details</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <img
                          src={tape.img}
                          alt={tape.thumb}
                          className="w-full mt-4 mb-4 rounded-xl"
                        />
                        <DialogTitle>Tape details</DialogTitle>
                        <DialogDescription className="flex flex-col space-y-1">
                          <span>
                            Brand: {getFallBackTextWhenEmpty(tape.brand)}
                          </span>

                          <span>
                            Color: {getFallBackTextWhenEmpty(tape.color)}
                          </span>
                          <span>
                            Playing time:{' '}
                            {tape.playingTime
                              ? `${tape.playingTime} minutes`
                              : getFallBackTextWhenEmpty(tape.playingTime)}
                          </span>
                          <span>
                            Type: {getFallBackTextWhenEmpty(tape.type)}
                          </span>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          nextEnabled={nextEnabled}
          previousEnabled={previousEnabled}
          setNextPage={setNextPage}
          setPreviousPage={setPreviousPage}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={filterState.sources.tapesFiltered.length}
        />
      </div>
    </div>
  );
}

export default App;
