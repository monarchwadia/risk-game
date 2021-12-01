import { Coords, Player, State } from "../types";
import decide from "./decide";
import entropy from "./entropy";
import CoordinateSet from "./grid/CoordinateSet";
import { fromTo, getRandomInt, iterate, pick } from "./utils";



const play = (state: State) => {
  state.players.forEach(player => {
    decide(player, state);
  });
  
  entropy(state);
}

export default play;