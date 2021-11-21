import { State } from "../types";
import { TICK_INTERVAL } from "./constants";
import play from "./play";
import render from "./render";
import resize from "./resize";
import { coords } from "./utils";

const state: State = {
  players: [
    {
      color: 'blue',
      cells: [
        coords(20, 20),
      ]
    }
  ]
};

const tick = () => {
  play(state);
  render(state);
}

// start
setInterval(() => tick(), TICK_INTERVAL)

// listen for resizes
window.addEventListener('resize', () => {
  resize();
})
resize();