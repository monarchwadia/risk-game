import { Coords } from "../types";
import { Component } from "./component.type";

const ORIGIN: Coords = {
  x: 20,
  y: 120
}

const DIMENSIONS: Coords = {
  x: 200,
  y: 40
}

type Props = {

}
const ToolboxComponent: Component<Props> = ({canvas}) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = "darkblue"
  ctx.strokeStyle = "gold"

  ctx.strokeRect(ORIGIN.x, ORIGIN.y, DIMENSIONS.x, DIMENSIONS.y);
  ctx.fillRect(ORIGIN.x, ORIGIN.y, DIMENSIONS.x, DIMENSIONS.y);
}

export default ToolboxComponent;