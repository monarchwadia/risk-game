import { Coords, Player, State } from "../types";
import CoordinateSet from "./grid/CoordinateSet";
import { fromTo, iterate, pick } from "./utils";

// first x, then y
type PossibleMoves = Record<number, Record<number, boolean>>;

const getPossibleMoves = (player: Player, state: State): Coords[] => {
  const decisionTree = new CoordinateSet();

  // create a tree of all unique cells that are adjacent to any cell that this player owns, regardless of whether they're occupied.
  player.cells.forEach(cell => {
    fromTo(-1, 1, (x) => {
      fromTo(-1, 1, (y) => {
        decisionTree.add(x,y);
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

  // // only return
  // Object.keys(decisionTree).forEach(x => {
  //   Object.keys(decisionTree[x]).forEach(y => {
  //     if (decisionTree[x][y] === true) {
  //       possibleMoves.push({ x: +x, y: +y });
  //     }
  //   });
  // })

  // return possibleMoves;

  return []
}

const play = (state: State) => {
  state.players.forEach(player => {
    // do moves
    const possibleMoves = getPossibleMoves(player, state);
    const move = pick(possibleMoves);
    player.cells.push(move);
  })
}

export default play;