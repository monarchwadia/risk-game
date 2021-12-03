import { State } from "../types";
import entropy from "./entropy";
import aggressor from "../ai/aggressor";
import getPossibleMoves from "./getPossibleMoves";

const play = (state: State) => {
  state.players.forEach(player => {
    // get all possible moves
    const possibleMoves = getPossibleMoves(player, state);

    // let the player pick a move
    const move = player.ai({player, state, possibleMoves});

    // process the move
    switch(move.type) {
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