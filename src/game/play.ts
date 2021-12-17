import { Player, State } from "../types";
import entropy from "./entropy";
import aggressor from "../ai/aggressor";
import getPossibleMoves from "./getPossibleMoves";
import CoordinateSet from "../data/CoordinateSet";

const play = (state: State) => {
    // Make a 'map' of all occupied cells
    const occupiedCells = new CoordinateSet<Player>();
    state.players.forEach(player => {
      player.cells.forEach(cell => {
        occupiedCells.add(cell.x, cell.y, player);
      })
    })
    
  state.players.forEach(player => {
    // get all possible moves
    const possibleMoves = getPossibleMoves(player, state, occupiedCells);

    // let the player pick a move
    const move = player.ai({player, state, possibleMoves, occupiedCells});

    // process the move
    switch(move.type) {
      case "ATTACK":
        // player.cells.push(move.targetCell.coords);
        move.targetCell.owner.cells = move.targetCell.owner.cells.filter(cell => cell.x !== move.targetCell.coords.x || cell.y !== move.targetCell.coords.y)
        player.cells.push({
          x: move.targetCell.coords.x,
          y: move.targetCell.coords.y
        })
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