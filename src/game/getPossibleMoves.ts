import { Player, PossibleMove, State } from "../types";
import CoordinateSet from "../data/CoordinateSet";
import { coords, fromTo } from "../utils";

const getPossibleMoves = (player: Player, state: State): PossibleMove[] => {
  // const decisionTree = new CoordinateSet<PossibleMove>();

  // Make a 'map' of all occupied cells
  const occupiedCells = new CoordinateSet<Player>();
  state.players.forEach(player => {
    player.cells.forEach(cell => {
      occupiedCells.add(cell.x, cell.y, player);
    })
  })

  // ADDRESSABLE CELLS STEP 1
  // create a tree of all unique cells that are adjacent to any cell that this 
  // player owns, regardless of whether they're occupied.
  const addressableTree = new CoordinateSet<boolean>();
  player.cells.forEach(cell => {
    fromTo(-1, 1, (x) => {
      fromTo(-1, 1, (y) => {
        addressableTree.add(cell.x + x, cell.y + y, true);
      })
    });
  });

  // ADDRESSABLE CELLS STEP 2
  // second pass: player-occupied cells are not a possible move, so remove them
  player.cells.forEach(cell => {
    addressableTree.remove(cell.x, cell.y);
  })

  const addressableArr = addressableTree.toArray().filter(c => c.val === true);

  // DECISIONS
  // other-occupied cells can be attacked
  const decisionTree = new CoordinateSet<PossibleMove>();
  addressableArr.forEach(({x, y}) => {
    if (occupiedCells.has(x, y)) {
      const player = occupiedCells.get(x, y);

      // handling weird edge case for Typescript's sake
      if (!player) return;

      decisionTree.add(x, y, {
        type: "ATTACK",
        targetCell: {
          coords: coords(x,y),
          owner: player
        }
      })
    } else {
      decisionTree.add(x, y, {
        type: "COLONIZE",
        targetCell: {
          coords: coords(x,y)
        }
      })
    }
  });

  // ADD POSSIBILITY OF PASSING THE TURN
  const possibleMoves = decisionTree.toArray().map(c => c.val);
  possibleMoves.push({
    type: "PASS"
  });

  return possibleMoves;
}

export default getPossibleMoves;