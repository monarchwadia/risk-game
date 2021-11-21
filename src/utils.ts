import { Coords } from "../types"

export const coords = (_x: number, _y: number): Coords => ({ x: _x, y: _x })
export const addCoords = (a: Coords, b: Coords): Coords => ({
  x: a.x + b.x,
  y: a.y + b.y,
})
export const subtractCoords = (a: Coords, b: Coords): Coords => ({
  x: a.x - b.x,
  y: a.y - b.y,
})

export const iterate = (_x: number, _y: number, callback: (coords: Coords) => void) => {
  for (let x = 0; x < _x; x++) {
    for (let y = 0; y < _y; y++) {
      callback({ x, y });
    }
  }

}

export const fromTo = (start, end, callback: (num: number) => void) => {
  for (let i = start; i <= end; i++) {
    callback(i);
  }
}

export const pick = <T>(arr: T[]): T => {
  if (arr.length === 0) {
    return undefined;
  }

  const index = getRandomInt(arr.length - 1)

  if (index === undefined) {
    return undefined;
  }

  return arr[index];
}

export const getRandomInt = (max: number) => Math.floor(Math.random() * max)