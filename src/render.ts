import { Coords, State } from "../types";
import { SQUARE_BORDER, SQUARE_HEIGHT, SQUARE_WIDTH } from "./constants";
import {  subtractCoords } from "./utils";

const drawRect = (ctx: CanvasRenderingContext2D, {x, y}: Coords, color: string) => {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.fillRect(x * SQUARE_HEIGHT, y * SQUARE_HEIGHT, (SQUARE_HEIGHT - SQUARE_BORDER), (SQUARE_WIDTH - SQUARE_BORDER))
}

const render = (state: State) => {
  const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return;
  }

  console.log(`ctx`, state.camera.origin)

  // draw players
  state.players.forEach(player => {
    player.cells.forEach((coords) => {
      const { x, y } = subtractCoords(coords, state.camera.origin)
      drawRect(ctx, {x, y}, player.color)
    })
  })
}

export default render;