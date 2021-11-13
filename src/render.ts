import { Color } from "p5";
import { Coords, Player, State } from "../types";
import { SQUARE_BORDER, SQUARE_HEIGHT, SQUARE_WIDTH } from "./constants";
import { iterate } from "./utils";

const drawRect = (ctx: CanvasRenderingContext2D, {x, y}: Coords, color: string) => {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.fillRect(x * SQUARE_HEIGHT, y * SQUARE_HEIGHT, (SQUARE_HEIGHT - SQUARE_BORDER), (SQUARE_WIDTH - SQUARE_BORDER))
}

const render = (state: State) => {
  const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  // draw board
  iterate(state.camera.size.x, state.camera.size.y, ({x, y}) => {
    drawRect(ctx, {x, y}, `lightgrey`)
  })

  // draw players
  state.players.forEach(player => {
    player.cells.forEach(({x, y}) => {
      drawRect(ctx, {x, y}, player.color)
    })
  })
}

export default render;