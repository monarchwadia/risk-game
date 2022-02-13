import CoordinateSet from "../data/CoordinateSet";
import { Ai, Coords, MoveType, PossibleMove } from "../types";
import { pick } from "../utils";

const PRIORITIES: Record<MoveType, number> = {
  "ATTACK": 1000,
  "COLONIZE": 500,
  "PASS": 0
}

class GridBucket {
  coordinateSet: CoordinateSet<number>;

  constructor(private bucketSize: number) {
    this.coordinateSet = new CoordinateSet();
  }

  increment(x: number, y: number) {
    const bucketIndex = this.getBucketIndex({x, y});

    this.coordinateSet.modify(bucketIndex.x, bucketIndex.y, (oldVal) => {
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

  getScoreOfBucket(bucketCoords: Coords) {
    const {x, y} = this.getBucketIndex(bucketCoords);
    return this.coordinateSet.get(x, y)
  }

  private getBucketIndex(coords: Coords): Coords {
    const x = Math.floor(coords.x / this.bucketSize);
    const y = Math.floor(coords.y / this.bucketSize);
    return {x, y};
  }
}

const smartAggressor: Ai = ({player: self, possibleMoves, occupiedCells}): PossibleMove => {
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
    const sortedArr = possibleMoves.sort((a, b) => {
      if(PRIORITIES[a.type] !== PRIORITIES[b.type]) {
        return (PRIORITIES[b.type] - PRIORITIES[a.type]);
      }

      const aScore: number = a.type === "PASS"
        ? 0
        : (bucket.getScoreOfBucket(a.targetCell.coords) || 0)

      const bScore: number = a.type === "PASS"
        ? 0
        : (bucket.getScoreOfBucket(a.targetCell.coords) || 0)

      const score = bScore - aScore;
      return score;
    });

    pickedMove = sortedArr[0];
    // console.log("PICKED MOVE", pickedMove)
  } else {
    // there are no enemies, probably. Do anything.
    pickedMove = pick(possibleMoves)
  }

  return pickedMove || { type: "PASS" }
}

export default smartAggressor;