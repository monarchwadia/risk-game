import { Coords, Player, State } from "../types";
import CoordinateSet from "./grid/CoordinateSet";
import { fromTo, getRandomInt, iterate, pick } from "./utils";

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

const play = (state: State) => {
  // do moves
  state.players.forEach(player => {
    const possibleMoves = getPossibleMoves(player, state);
    const move = pick(possibleMoves);
    player.cells.push(move);
  })

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

export default play;