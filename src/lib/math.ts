export enum Orientation {
  NORTH = 'N',
  SOUTH = 'S',
  WEST = 'W',
  EAST = 'E'
}

export function degreesToCardinal(degrees: number): Orientation {
  if (Math.sign(degrees) === -1) {
    degrees = 360 - Math.abs(degrees);
  }

  const cardinals = [Orientation.NORTH, Orientation.EAST, Orientation.SOUTH, Orientation.WEST];
  return cardinals[(degrees % 360) / 90];
}

export function cardinalToDegrees(cardinalDirection: Orientation) {
  const cardinals = [Orientation.NORTH, Orientation.EAST, Orientation.SOUTH, Orientation.WEST];
  const cardinalIndex = cardinals.findIndex(cardinal => cardinal === cardinalDirection);
  return cardinalIndex * 90;
}

export class BoundingBox {
  constructor(
    private x: number,
    private y: number,
    private width: number,
    private height: number
  ) {}

  inBounds(x: number, y: number) {
    return x >= this.x && x <= this.width && y >= this.y && y <= this.height;
  }
}
