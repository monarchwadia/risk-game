import { Camera, Coords, State } from "../../types";
import { Component } from "./component.type";
import { SQUARE_BORDER } from "../constants";
import {  subtractCoords } from "../utils";

const drawRect = (ctx: CanvasRenderingContext2D, coords: Coords, color: string, camera: Camera) => {
  const { x, y } = subtractCoords(coords, camera.origin)
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.fillRect(x * camera.zoom, y * camera.zoom, (camera.zoom - SQUARE_BORDER), (camera.zoom - SQUARE_BORDER))
}

const render: Component<{ state: State}> = ({state}) => {
  const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return;
  }

  // draw players
  state.players.forEach(player => {
    player.cells.forEach((coords) => {
    
      drawRect(ctx, coords, player.color, state.camera)
    })
  })
}

export default render;