import { Coords } from "../types"

export const coords = (_x: number, _y: number): Coords => ({ x: _x, y: _x })

export const iterate = (_x: number, _y: number, callback: (coords: Coords) => void) => {
  console.log("iterate called");
  for (let x = 0; x < _x; x++) {
    for (let y = 0; y < _y; y++) {
      console.log("Callback", x, y)
      callback({ x, y });
    }
  }

}