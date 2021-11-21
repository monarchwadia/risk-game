export type Coords = {
  x: number,
  y: number
}

export type Player = {
  color: string,
  cells: Coords[]
}  

export type Camera = {
  origin: Coords,
  zoom: number
}

export type State = {
  players: Player[],
  camera: Camera
}  

