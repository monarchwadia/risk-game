import { Coords, Player } from "../types";
import { Component } from "./component.type";

const ORIGIN: Coords = {
  x: 20,
  y: 20
}
const LINE_HEIGHT = 20;

type Props = {
  players: Player[]
}
const ScoreComponent: Component<Props> = ({players, canvas}) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = "black";
  ctx.font = "20px Georgia"
  players.forEach((player, i) => {
    const x = ORIGIN.x;
    const y = ORIGIN.y * (i + 1);
    ctx?.fillText(`${player.color}: ${player.cells.length}`, x, y)
  })
}

export default ScoreComponent;