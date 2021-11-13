import { State } from "../types";
import play from "./play";
import render from "./render";
import { coords } from "./utils";

const state: State = {
  players: [
    {
      color: 'red',
      cells: [
        coords(0,0),
        coords(0,1),
        coords(0,2)
      ],
    },
    {
      color: 'blue',
      cells: [
        coords(5, 5),
        coords(5, 6),
        coords(5, 7),
      ]
    }
  ],
  camera: {
    focus: coords(0,0),
    size: coords(10,10)
  },
};

const tick = () => {
  play(state);
  render(state);
}

setInterval(() => tick(), 100)