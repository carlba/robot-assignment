import { BoundingBox, cardinalToDegrees, degreesToCardinal, Orientation } from './math';

test('Should convert degree to cardinal direction ', async done => {
  expect(degreesToCardinal(-90)).toEqual('W');
  expect(degreesToCardinal(0)).toEqual('N');
  expect(degreesToCardinal(90)).toEqual('E');
  expect(degreesToCardinal(180)).toEqual('S');
  expect(degreesToCardinal(270)).toEqual('W');
  done();
});

test('Should cardinal direction degrees ', async done => {
  expect(cardinalToDegrees(Orientation.NORTH)).toEqual(0);
  expect(cardinalToDegrees(Orientation.EAST)).toEqual(90);
  expect(cardinalToDegrees(Orientation.SOUTH)).toEqual(180);
  expect(cardinalToDegrees(Orientation.WEST)).toEqual(270);
  done();
});

test('BoundingBox 0,0 in (0,0,20,20)', () => {
  const bbox = new BoundingBox(0, 0, 20, 20);

  expect(bbox.inBounds(0, 0)).toBe(true);
});

test('BoundingBox 20,20 in (0,0,20,20)', () => {
  const bbox = new BoundingBox(0, 0, 20, 20);

  expect(bbox.inBounds(20, 20)).toBe(true);
});

test('BoundingBox 7,18 in (0,0,20,20)', () => {
  const bbox = new BoundingBox(0, 0, 20, 20);

  expect(bbox.inBounds(7, 18)).toBe(true);
});
