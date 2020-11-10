export enum Orientation {
  NORTH = 'N',
  SOUTH = 'S',
  WEST = 'W',
  EAST = 'E'
}

export interface Robot {
  x?: number;
  y?: number;
  orientation?: Orientation;
}

export class RobotService {
  robot: Robot;
  constructor() {
    this.robot = {};
  }

  update(robot: Robot) {
    this.robot = robot;
    return { ...robot };
  }

  get() {
    return { ...this.robot };
  }
}
