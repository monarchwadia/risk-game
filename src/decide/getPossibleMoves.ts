import { Coords, Player, State } from "../../types";
import CoordinateSet from "../data/CoordinateSet";
import { fromTo } from "../utils";

const getPossibleMoves = (player: Player, state: State): Coords[] => {
  const decisionTree = new CoordinateSet();

  // create a tree of all unique cells that are adjacent to any cell that this player owns, regardless of whether they're occupied.
  player.cells.forEach(cell => {
    fromTo(-1, 1, (x) => {
      fromTo(-1, 1, (y) => {
        decisionTree.add(cell.x + x, cell.y + y);
      })
    });
  });

  // second pass: player-occupied cells are not a possible move, so remove them
  player.cells.forEach(cell => {
    decisionTree.remove(cell.x, cell.y);
  })

  // other-occupied cells cannot be attacked... for now... so remove them
  state.players.forEach(other => {
    // ignore self
    if (other === player) {
      return;
    }

    other.cells.forEach((cell, i) => {
      decisionTree.remove(cell.x, cell.y);
    })
  });

  return decisionTree.toArray()
}

export default getPossibleMoves;