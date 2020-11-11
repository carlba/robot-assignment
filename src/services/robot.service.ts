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

  move(directions: string) {
    const currentRobot = this.get();
    const currentRoom = this.roomService.get();
    const bbox = new BoundingBox(0, 0, currentRoom.width!, currentRoom.depth!);

    for (const direction of directions) {
      if (direction === 'L') {
        currentRobot.orientation = degreesToCardinal(
          cardinalToDegrees(currentRobot.orientation!) - 90
        );
      } else if (direction === 'R') {
        currentRobot.orientation = degreesToCardinal(
          cardinalToDegrees(currentRobot.orientation!) + 90
        );
      } else if (direction === 'F') {
        if (
          currentRobot.orientation === Orientation.NORTH &&
          bbox.inBounds(currentRobot.x, currentRobot.y - 1)
        ) {
          currentRobot.y -= 1;
        } else if (
          currentRobot.orientation === Orientation.EAST &&
          bbox.inBounds(currentRobot.x + 1, currentRobot.y)
        ) {
          currentRobot.x += 1;
        } else if (
          currentRobot.orientation === Orientation.SOUTH &&
          bbox.inBounds(currentRobot.x, currentRobot.y + 1)
        ) {
          currentRobot.y += 1;
        } else if (
          currentRobot.orientation === Orientation.WEST &&
          bbox.inBounds(currentRobot.x - 1, currentRobot.y)
        ) {
          currentRobot.x -= 1;
        }
      }
    }
    this.update(currentRobot);
  }
}
