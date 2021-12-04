// uses an internal tree structure to simulate set-like behaviour
export default class CoordinateSet<T> {
  tree: Record<string, Record<string, T>> = {}

  add(x: number, y: number, val: T) {
    this.tree[x] ||= {}
    this.tree[x][y] = val;
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

  get(x: number, y: number): T | undefined {
    if (!this.has(x, y)) {
      return undefined;
    }

    return this.tree[x][y];
  }

  has(x: number, y: number) {
    const hasX = Object.prototype.hasOwnProperty.call(this.tree, "" + x);
    if (!hasX) {
      return false;
    }
    const hasY = Object.prototype.hasOwnProperty.call(this.tree[x], "" + y);
    if (!hasY) {
      return false;
    }
    return true;
  }

  /**
   * 
   * @param x The x coordinate
   * @param y The y coordinate
   * @param callback Use this callback to set the new value. No-op if it returns undefined.
   */
  modify(x: number, y: number, callback: (val: T | undefined) => T | undefined) {
    const oldVal = this.get(x, y);
    const newVal = callback(oldVal);
    if (newVal !== undefined) {
      this.add(x, y, newVal)
    }
  }

  toArray() {
    type CoordinateArray = {x: number, y: number, val: T}[]
    const arr: CoordinateArray = [];

    Object.keys(this.tree).forEach((x) => {
      Object.keys(this.tree[x]).forEach((y) => {
        arr.push({x: +x, y: +y, val: this.tree[x][y]})
      })
    })
    return arr;
  }
}