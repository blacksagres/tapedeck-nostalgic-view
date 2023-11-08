export type Tape = {
  page?: string;
  img?: string;
  thumb?: string;
  playingTime?: string;
  color?: Color;
  brand?: string;
  type?: Type;
};

type Color =
  | 'Green'
  | 'Black'
  | 'Grey'
  | 'Blue'
  | 'White'
  | 'Red'
  | 'Purple'
  | 'Yellow'
  | 'Orange';

export type Type = 'Ferro' | 'Chrome' | 'Metal' | 'Ferrochrom';

export type TapeDeckApiEntry = {
  [key: string]: Tape[];
};
