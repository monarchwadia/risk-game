import { State } from "../types";
import makeMove from "./makeMove";
import entropy from "./entropy";

const play = (state: State) => {
  state.players.forEach(player => {

    // let the player pick a move
    const move = makeMove(player, state);

    // process the move
    switch(move?.type) {
      case "ATTACK":
        // player.cells.push(move.targetCell.coords);
        move.targetCell.owner.cells = move.targetCell.owner.cells.filter(cell => cell.x !== move.targetCell.coords.x || cell.y !== move.targetCell.coords.y)
        break;
      case "COLONIZE":
        player.cells.push(move.targetCell.coords);
        break;
      case "PASS":
        break;
      default:
        break;
    }
  });
  
  entropy(state);
}

export default play;