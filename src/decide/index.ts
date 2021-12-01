import { Player, State } from "../../types";
import { pick } from "../utils";
import getPossibleMoves from "./getPossibleMoves";

const decide = (player: Player, state: State) => {
  const possibleMoves = getPossibleMoves(player, state);
  const move = pick(possibleMoves);
  player.cells.push(move);
}

export default decide;