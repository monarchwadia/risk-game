export type Player = {
  color: string,
  cells: Coords[]
}

export type State = {
  players: Player[],
  camera: {
    focus: Coords,
    size: Coords
  }
}

export type Coords = {
  x: number,
  y: number
}