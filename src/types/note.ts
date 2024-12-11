export interface Note {
  $id: number | string;
  body: string;
  colors: string;
  position: string;
}

export interface Colors {
  id: string;
  colorHeader: string;
  colorBody: string;
  colorText: string;
}

export interface Position {
  x: number;
  y: number;
}
