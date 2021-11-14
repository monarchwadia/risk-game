import CoordinateSet from "./CoordinateSet";

describe("CoordinateSet", () => {
  it("Can add a coordinate", () => {
    const cs = new CoordinateSet();
    expect(cs.has(1,1)).toBeFalsy();
    cs.add(1, 1);
    expect(cs.has(1,1)).toBeTruthy();
  });

  it("Can remove a coordinate", () => {
    const cs = new CoordinateSet();
    cs.add(1, 1);
    expect(cs.has(1,1)).toBeTruthy();
    cs.remove(1,1);
    expect(cs.has(1,1)).toBeFalsy();
  })

  it("Can convert coordinates into a list", () => {
    const cs = new CoordinateSet();
    cs.add(1,1);
    cs.add(1,2);
    expect(cs.toArray()).toEqual(expect.arrayContaining([{x: 1, y: 1}, {x: 1, y: 2}]))
    cs.remove(1,1);
    expect(cs.toArray()).toEqual(expect.arrayContaining([{x: 1, y: 2}]))
  })
})