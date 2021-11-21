import { Color } from "p5";
import { Camera, Coords, Player, State } from "../types";
import { SQUARE_BORDER, SQUARE_HEIGHT, SQUARE_WIDTH } from "./constants";
import { iterate } from "./utils";

const drawRect = (ctx: CanvasRenderingContext2D, {x, y}: Coords, color: string) => {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.fillRect(x * SQUARE_HEIGHT, y * SQUARE_HEIGHT, (SQUARE_HEIGHT - SQUARE_BORDER), (SQUARE_WIDTH - SQUARE_BORDER))
}

const transpose = (camera: Camera, original: Coords): Coords => {
  return {
    x: original.x - camera.origin.x,
    y: original.y - camera.origin.y
  }
}

const render = (state: State) => {
  const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return;
  }

  // draw players
  state.players.forEach(player => {
    player.cells.forEach((coords) => {
      const { x, y } = transpose(state.camera, coords);
      drawRect(ctx, {x, y}, player.color)
    })
  })
}

export default render;