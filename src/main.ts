import "./reset.css"

import { State } from "./types";
import { TICK_INTERVAL } from "./constants";
import play from "./game/play";
import render from "./view/render";
import resize from "./listeners/resize";
import { coords } from "./utils";
import dragHoc from "./listeners/drag";
import clearCanvas from "./view/clearCanvas";
import aggressor from "./ai/aggressor";
import scaredycat from "./ai/scaredycat";
import smartAggressor from "./ai/smartAggressor";

const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;

const state: State = {
  players: [
    {
      color: 'black',
      ai: scaredycat,
      cells: [
        coords(20, 20),
      ],
    },
    {
      color: 'pink',
      ai: aggressor,
      cells: [
        coords(15, 15),
      ]
    },
    {
      color: 'cyan',
      ai: smartAggressor,
      cells: [
        coords(25, 25),
      ]
    }
  ],
  camera: {
    origin: coords(-100,-100),
    zoom: 5
  },
  settings: {
    entropy: 0
  }
};

// start game
setInterval(() => play(state), TICK_INTERVAL)

// start animation
const doRender = () => {
  clearCanvas({canvas});
  render({state, canvas});
  requestAnimationFrame(doRender);
}
requestAnimationFrame(doRender)

// listen for resizes
window.addEventListener('resize', () => {
  resize();
  clearCanvas({canvas});
})
resize();

// listener for dragging
dragHoc(state, () => {
  clearCanvas({canvas})
});