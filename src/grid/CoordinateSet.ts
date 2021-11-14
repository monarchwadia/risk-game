// uses an internal tree structure to simulate set-like behaviour
export default class CoordinateSet {
  tree: Record<string, Record<string, boolean>> = {}

  add(x: number, y: number) {
    this.tree[x] ||= {}
    this.tree[x][y] = true;
  }

  remove(x: number, y: number) {
    // if the coordinate doesn't exist, don't do anything
    if (!this.tree[x] || !this.tree[y]) {
      return;
    }

    // otherwise, delete it
    delete this.tree[x][y];

    // if the branch has no leaves, delete the branch, too
    if (!Object.keys(this.tree[x]).length) {
      delete this.tree[x]
    }
  }

  has(x: number, y: number) {
    return !!this.tree[x]?.[y];
  }

  toArray() {
    type CoordinateArray = {x: number, y: number}[]
    const arr: CoordinateArray = [];

    Object.keys(this.tree).forEach((x) => {
      Object.keys(this.tree[x]).forEach((y) => {
        arr.push({x: +x, y: +y})
      })
    })
    return arr;
  }
}