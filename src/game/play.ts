import { State } from "../../types";
import decide from ".";
import entropy from "./entropy";

const play = (state: State) => {
  state.players.forEach(player => {
    decide(player, state);
  });
  
  entropy(state);
}

export default play;