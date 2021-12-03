import { Ai, PossibleMove } from "../types";
import { pick } from "../utils";

const scaredycat: Ai = ({possibleMoves}): PossibleMove => {
  // choose a move based on some logic, and return it
  let tentativeMove: PossibleMove | undefined;
  
  tentativeMove = pick(possibleMoves.filter(pm => pm.type !== "ATTACK"));

  if (!tentativeMove) {
    tentativeMove = {
      type: "PASS"
    }
  }

  return tentativeMove;
}

export default scaredycat;