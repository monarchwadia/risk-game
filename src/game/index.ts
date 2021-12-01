import { Player, State } from "../../types";
import { pick } from "../utils";
import getPossibleMoves from "./getPossibleMoves";

const decide = (player: Player, state: State) => {
  // analyze possible moves
  const possibleMoves = getPossibleMoves(player, state);

  // choose a move based on some logic
  const move = pick(possibleMoves);

  // make the move
  if (move) {
    player.cells.push(move);
  }
}

export default decide;