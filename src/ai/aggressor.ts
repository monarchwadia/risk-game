import { Ai, PossibleMove } from "../types";
import { pick } from "../utils";

const aggressor: Ai = ({possibleMoves}): PossibleMove => {
  // choose a move based on some logic, and return it
  let tentativeMove: PossibleMove | undefined;
  
  const aggressiveMoves = possibleMoves.filter(pm => pm.type === "ATTACK");

  // always pick aggressive moves
  if (aggressiveMoves.length) {
    tentativeMove = pick(aggressiveMoves);
  } else {
    tentativeMove = pick(possibleMoves)
  }

  if (!tentativeMove) {
    tentativeMove = {
      type: "PASS"
    }
  }

  return tentativeMove;
}

export default aggressor;