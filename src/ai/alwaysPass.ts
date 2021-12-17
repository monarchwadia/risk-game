import { Ai, PossibleMove } from "../types";

const alwaysPass: Ai = (): PossibleMove => {
  return {
    type: "PASS"
  }
}

export default alwaysPass;