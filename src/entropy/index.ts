import { Player, State } from "../../types";
import { getRandomInt } from "../utils";

const entropy = ( state: State) => {
  // randomly kill one cell each turn
  state.players.forEach(player => {
    const numberOfCellsToKill = getRandomInt(10);
    if (numberOfCellsToKill >= player.cells.length / 100) {
      return;
    }

    const numberOfCells = player.cells.length;
    const randomCellIndex = getRandomInt(numberOfCells);
    player.cells.splice(randomCellIndex, 1);
  })
}

export default entropy;