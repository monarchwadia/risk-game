export type Player = {
  color: string,
  cells: Coords[]
}

export type State = {
  players: Player[]
}

export type Coords = {
  x: number,
  y: number
}

