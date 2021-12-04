import CoordinateSet from "../data/CoordinateSet";
import { Ai, Coords, PossibleMove } from "../types";
import { pick } from "../utils";

class GridBucket {
  coordinateSet: CoordinateSet<number>;

  constructor(private bucketSize: number) {
    this.coordinateSet = new CoordinateSet();
  }

  increment(x: number, y: number) {
    const _x = Math.floor(x / this.bucketSize);
    const _y = Math.floor(y / this.bucketSize);

    this.coordinateSet.modify(_x, _y, (oldVal) => {
      if (oldVal === undefined) {
        return 0;
      } else {
        return oldVal + 1;
      }
    });
  }

  getHighest(): Coords | undefined {
    const sortedCoords = this.coordinateSet.toArray().sort(({val: valA}, {val: valB}) => {
      return valB - valA
    });
    
    if (!sortedCoords.length) {
      return undefined;
    }

    return sortedCoords[0];
  }
}

const aggressor: Ai = ({player: self, possibleMoves, occupiedCells}): PossibleMove => {
  // "score" 9x9 grids of cells by how many enemies they have.
  // (9x9 is just illustrative, it could be a different size)
  // then, colonize or atack a cell that's the closest to the center of the most clustered bucket
  const BUCKET_SIZE = 12;
  const bucket = new GridBucket(BUCKET_SIZE);
  occupiedCells.toArray().forEach(({x, y, val: player}) => {
    // don't score for self
    if (player === self) {
      return;
    }

    bucket.increment(x, y);
  });
  const bestCoord: Coords | undefined = bucket.getHighest();

  let pickedMove: PossibleMove | undefined;

  if (bestCoord) {
    // TODO evaluate & pick the most aggressive move possible
    // possibleMoves
    //   .map()
    pickedMove = pick(possibleMoves)
  } else {
    // there are no enemies, probably. Do anything.
    pickedMove = pick(possibleMoves)
  }

  return pick(possibleMoves) || { type: 'PASS' };
}

export default aggressor;