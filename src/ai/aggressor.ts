import { Ai, PossibleMove, MoveType } from "../types";
import { pick } from "../utils";

const PRIORITIES: Record<MoveType, number> = {
  "ATTACK": 1000,
  "COLONIZE": 500,
  "PASS": 0
}

const aggressor: Ai = ({possibleMoves}): PossibleMove => {
  // choose a move based on some logic, and return it
  let tentativeMove: PossibleMove | undefined;
  
  const aggressiveMoves = possibleMoves
    .filter(pm => pm.type === "ATTACK" || pm.type === "COLONIZE")
    .sort((a, b) => {
      return PRIORITIES[b.type] - PRIORITIES[a.type];
    })

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