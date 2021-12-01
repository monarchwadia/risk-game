import { State } from "../types";
import makeMove from "./makeMove";
import entropy from "./entropy";

const play = (state: State) => {
  state.players.forEach(player => {

    // let the player pick a move
    const move = makeMove(player, state);

    // process the move
    if (move) {
      player.cells.push(move);
    }
  });
  
  entropy(state);
}

export default play;