import { BoundingBox, cardinalToDegrees, degreesToCardinal, Orientation } from '../lib/math';
import { RoomService } from './room.service';

export interface Robot {
  x: number;
  y: number;
  orientation?: Orientation;
}

export class RobotService {
  robot: Robot;
  roomService: RoomService;

  constructor(roomService?: RoomService) {
    this.robot = { x: 0, y: 0 };
    this.roomService = roomService ?? new RoomService();
  }

  update(robot: Robot) {
    this.robot = robot;
    return { ...robot };
  }

  get() {
    return { ...this.robot };
  }

  rotateLeft(robot: Robot) {
    robot.orientation = degreesToCardinal(cardinalToDegrees(robot.orientation!) - 90);
  }

  rotateRight(robot: Robot) {
    robot.orientation = degreesToCardinal(cardinalToDegrees(robot.orientation!) + 90);
  }

  moveForward(robot: Robot, bbox: BoundingBox) {
    if (robot.orientation === Orientation.NORTH && bbox.inBounds(robot.x, robot.y - 1)) {
      robot.y -= 1;
    } else if (robot.orientation === Orientation.EAST && bbox.inBounds(robot.x + 1, robot.y)) {
      robot.x += 1;
    } else if (robot.orientation === Orientation.SOUTH && bbox.inBounds(robot.x, robot.y + 1)) {
      robot.y += 1;
    } else if (robot.orientation === Orientation.WEST && bbox.inBounds(robot.x - 1, robot.y)) {
      robot.x -= 1;
    }
  }

  move(directions: string) {
    const currentRobot = this.get();
    const currentRoom = this.roomService.get();
    const bbox = new BoundingBox(0, 0, currentRoom.width! - 1, currentRoom.depth! - 1);

    for (const direction of directions) {
      if (direction === 'L') {
        this.rotateLeft(currentRobot);
      } else if (direction === 'R') {
        this.rotateRight(currentRobot);
      } else if (direction === 'F') {
        this.moveForward(currentRobot, bbox);
      }
    }
    return this.update(currentRobot);
  }
}
