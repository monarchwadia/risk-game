import CoordinateSet from "./data/CoordinateSet"

export type Coords = {
  x: number,
  y: number
}

export type Player = {
  color: string,
  cells: Coords[],
  ai: Ai
}  

export type Camera = {
  origin: Coords,
  zoom: number
}

export type State = {
  players: Player[],
  camera: Camera
}  

export type PossibleMove = 
| {
  type: "ATTACK"
  targetCell: {
    coords: Coords,
    owner: Player
  },
}
| {
  type: "PASS"
}
| {
  type: "COLONIZE",
  targetCell: {
    coords: Coords
  }
}

export type Ai = (props: {possibleMoves: PossibleMove[], player: Player, state: State, occupiedCells: CoordinateSet<Player>}) =>  PossibleMove;