import { Coords, Player, State } from "../types";
import { fromTo, iterate, pick } from "./utils";

// first x, then y
type PossibleMoves = Record<number, Record<number, boolean>>;

const getPossibleMoves = (player: Player, state: State): Coords[] => {
  const decisionTree: PossibleMoves = {};
  const possibleMoves: Coords[] = [];

  player.cells.forEach(cell => {
    fromTo(-1, 1, (x) => {
      fromTo(-1, 1, (y) => {
        decisionTree[cell.x + x] ||= {};
        decisionTree[cell.x + x][cell.y + y] ||= true;
      })
    });
  });

  // player-occupied cells are not a possible move
  player.cells.forEach(cell => {
    if (decisionTree[cell.x] !== undefined) {
      decisionTree[cell.x][cell.y] = false;
    }
  })

  // other-occupied cells cannot be attacked... for now
  state.players.forEach(other => {
    // ignore self
    if (other === player) {
      return;
    }

    console.log('other cells length', other.cells.length)
    other.cells.forEach((cell, i) => {
      if (decisionTree[cell.x] !== undefined) {
        decisionTree[cell.x][cell.y] = false;
      }
    })
  })

  Object.keys(decisionTree).forEach(x => {
    Object.keys(decisionTree[x]).forEach(y => {
      if (decisionTree[x][y] === true) {
        possibleMoves.push({ x: +x, y: +y });
      }
    });
  })

  return possibleMoves;
}

const play = (state: State) => {
  state.players.forEach(player => {
    const possibleMoves = getPossibleMoves(player, state);
    console.log('possibleMoves', possibleMoves);
    const move = pick(possibleMoves);
    console.log('move', move);
    player.cells.push(move);
  })
}

export default play;