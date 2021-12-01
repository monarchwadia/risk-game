import CoordinateSet from "./CoordinateSet";

describe("CoordinateSet", () => {
  it("Can add a coordinate", () => {
    const cs: CoordinateSet<boolean> = new CoordinateSet();

    expect(cs.has(1,1)).toStrictEqual(false);
    cs.add(1, 1, true);
    expect(cs.has(1,1)).toStrictEqual(true);

    expect(cs.has(1,2)).toStrictEqual(false);
    cs.add(1, 2, true);
    expect(cs.has(1,2)).toStrictEqual(true);
  });

  it("Can remove a coordinate", () => {
    const cs: CoordinateSet<boolean> = new CoordinateSet();
    cs.add(1, 1, true);
    expect(cs.has(1,1)).toStrictEqual(true);
    cs.remove(1,1);
    expect(cs.has(1,1)).toStrictEqual(false);
  })

  it("Can convert coordinates into a list", () => {
    const cs: CoordinateSet<boolean> = new CoordinateSet();
    cs.add(1,1, true);
    cs.add(1,2, false);
    expect(cs.toArray()).toEqual(expect.arrayContaining([{x: 1, y: 1, val: true}, {x: 1, y: 2, val: false}]))
    cs.remove(1,1);
    expect(cs.toArray()).toEqual(expect.arrayContaining([{x: 1, y: 2, val: false}]))
  })
})