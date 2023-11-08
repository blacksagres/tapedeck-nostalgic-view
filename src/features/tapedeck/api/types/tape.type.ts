export type Tape = {
  page?: string;
  img?: string;
  thumb?: string;
  playingTime?: string;
  color?: string;
  brand?: string;
  type?: string;
};

export type Type = 'Ferro' | 'Chrome' | 'Metal' | 'Ferrochrom';

export type TapeDeckApiEntry = {
  [key: string]: Tape[];
};
