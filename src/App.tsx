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
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { CassetteTape } from 'lucide-react';

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
      tapes: queryResult.data?.slice(0, 30),
      tapesFiltered: queryResult.data?.slice(0, 30),
    },
  });

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
        <h1 className="flex flex-row mb-16 space-x-4 text-4xl font-extrabold tracking-tight text-center scroll-m-20 lg:text-5xl">
          <span>Welcome to the Tapedeck</span> <CassetteTape size={60} />
        </h1>
        <div className="mb-4 space-x-4">
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
        <div
          className={classnames([
            'grid gap-4',
            'xl:grid-cols-4',
            'md:grid-cols-3',
            'sm:grid-cols-2',
          ])}
        ></div>

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
                <TableCell>
                  <Dialog>
                    <DialogTrigger>
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
      </div>
    </div>
  );
}

export default App;
