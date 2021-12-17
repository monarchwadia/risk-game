import play from "../game/play";
import { State } from "../types";
import alwaysPass from "./alwaysPass";
import smartAggressor from "./smartAggressor";

const buildState = () => ({
  players: [
    {
      ai: smartAggressor,
      cells: [
        {
          x: 0,
          y: 0
        }
      ],
      color: 'red'
    },
    {
      ai: alwaysPass,
      cells: [
        {
          x: 1,
          y: 0
        }
      ],
      color: 'blue'
    }
  ],
  camera: {
    origin: {
      x: 0,
      y: 0
    },
    zoom: 0
  },
  settings: {
    entropy: 0
  }
})

describe("smartAggressor", () => {
  it("will always pick an attacking move, if available.", () => {
    for (let i = 0; i < 10; i++) {
      const state = buildState();
      play(state);
  
      expect(state.players[0].cells.length).toBe(2);
      expect(state.players[1].cells.length).toBe(0);
    }
  })
})