import "./reset.css"

import { State } from "../types";
import { TICK_INTERVAL } from "./constants";
import play from "./play";
import render from "./render";
import resize from "./listeners/resize";
import { coords } from "./utils";
import dragHoc from "./listeners/drag";
import clearCanvas from "./clearCanvas";

const state: State = {
  players: [
    {
      color: 'blue',
      cells: [
        coords(20, 20),
      ]
    },
    {
      color: 'red',
      cells: [
        coords(15, 15),
      ]
    }
  ],
  camera: {
    origin: coords(-100,-100),
    zoom: 5
  }
};

// start game
setInterval(() => play(state), TICK_INTERVAL)

// start animation
const doRender = () => {
  clearCanvas();
  render(state);
  requestAnimationFrame(doRender);
}
requestAnimationFrame(doRender)

// listen for resizes
window.addEventListener('resize', () => {
  resize();
  clearCanvas();
})
resize();

// listener for dragging
dragHoc(state, () => {
  clearCanvas()
});