import { Player, State } from "../types";
import { pick } from "../utils";
import getPossibleMoves from "./getPossibleMoves";

const makeMove = (player: Player, state: State) => {
  // analyze possible moves
  const possibleMoves = getPossibleMoves(player, state);

  // choose a move based on some logic, and return it
  return pick(possibleMoves);
}

export default makeMove;