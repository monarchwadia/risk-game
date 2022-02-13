import { Coords, Player } from "../types";
import { Component } from "./component.type";

const ORIGIN: Coords = {
  x: 20,
  y: 120
}

const OFFSET = 10;
const SQUARE_SIZE = 25;

type Props = {
  players: Player[]
}
const ToolboxComponent: Component<Props> = ({canvas, players}) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  players.forEach((p, i) => {
    ctx.fillStyle = p.color;
    const initial = p.name[0].toUpperCase();

    const xOffset = ORIGIN.x + ((OFFSET + SQUARE_SIZE) * i);

    // draw the square
    ctx.fillRect(xOffset, ORIGIN.y, SQUARE_SIZE, SQUARE_SIZE);

    // write the initial
    ctx.textBaseline = "top";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.font = "bold 21px sans-serif";
    const textXOffset = xOffset + 12;
    const textYOffset = ORIGIN.y + 2;
    ctx.fillText(initial, textXOffset, textYOffset, SQUARE_SIZE)
    ctx.strokeText(initial, textXOffset, textYOffset, SQUARE_SIZE)
  })

}

export default ToolboxComponent;