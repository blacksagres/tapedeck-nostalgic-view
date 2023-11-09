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

function App() {
  const queryResult = useTapes();

  const getFallBackTextWhenEmpty = (value?: string | number) => {
    return value ?? 'unspecified';
  };

  return (
    <>
      <ModeToggle />
      <Table className="w-1/2 mx-auto">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Brand</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-left">Playing Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(queryResult.data ?? []).map((tape) => (
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
    </>
  );
}

export default App;
