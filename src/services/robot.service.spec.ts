import { Orientation } from '../lib/math';
import { RobotService } from './robot.service';
import { RoomService } from './room.service';

test('Should move the robot to the left', async done => {
  const robotService = new RobotService();
  robotService.update({ x: 2, y: 2, orientation: Orientation.NORTH });
  robotService.move('L');
  expect(robotService.get()).toEqual({ x: 2, y: 2, orientation: Orientation.WEST });
  done();
});

test('Should move the robot to the right', async done => {
  const robotService = new RobotService();
  robotService.update({ x: 2, y: 2, orientation: Orientation.NORTH });
  robotService.move('R');
  expect(robotService.get()).toEqual({ x: 2, y: 2, orientation: Orientation.EAST });
  done();
});

test('Should move the robot forward when heading NORTH', async done => {
  const roomService = new RoomService();
  roomService.update({ width: 5, depth: 5 });
  const robotService = new RobotService(roomService);
  robotService.update({ x: 1, y: 2, orientation: Orientation.NORTH });
  robotService.move('F');
  expect(robotService.get()).toEqual({ x: 1, y: 1, orientation: Orientation.NORTH });
  done();
});

test('Should move the robot forward when heading SOUTH', async done => {
  const roomService = new RoomService();
  roomService.update({ width: 5, depth: 5 });
  const robotService = new RobotService(roomService);
  robotService.update({ x: 1, y: 2, orientation: Orientation.SOUTH });
  robotService.move('F');
  expect(robotService.get()).toEqual({ x: 1, y: 3, orientation: Orientation.SOUTH });
  done();
});

test('Should move the robot forward when heading EAST', async done => {
  const roomService = new RoomService();
  roomService.update({ width: 5, depth: 5 });
  const robotService = new RobotService(roomService);
  robotService.update({ x: 1, y: 2, orientation: Orientation.EAST });
  robotService.move('F');
  expect(robotService.get()).toEqual({ x: 2, y: 2, orientation: Orientation.EAST });
  done();
});

test('Should move the robot forward when heading WEST', async done => {
  const roomService = new RoomService();
  roomService.update({ width: 5, depth: 5 });
  const robotService = new RobotService(roomService);
  robotService.update({ x: 1, y: 2, orientation: Orientation.WEST });
  robotService.move('F');
  expect(robotService.get()).toEqual({ x: 0, y: 2, orientation: Orientation.WEST });
  done();
});

test('Should not move the robot forward when hitting room boundary', async done => {
  const roomService = new RoomService();
  roomService.update({ width: 5, depth: 5 });
  const robotService = new RobotService(roomService);
  robotService.update({ x: 5, y: 5, orientation: Orientation.EAST });
  robotService.move('F');
  expect(robotService.get()).toEqual({ x: 5, y: 5, orientation: Orientation.EAST });
  done();
});

test('Should not move the robot forward when hitting room boundary2', async done => {
  const roomService = new RoomService();
  roomService.update({ width: 5, depth: 5 });
  const robotService = new RobotService(roomService);
  robotService.update({ x: 0, y: 0, orientation: Orientation.WEST });
  robotService.move('F');
  expect(robotService.get()).toEqual({ x: 0, y: 0, orientation: Orientation.WEST });
  done();
});

test('Should not move the robot forward when hitting room boundary3', async done => {
  const roomService = new RoomService();
  roomService.update({ width: 5, depth: 5 });
  const robotService = new RobotService(roomService);
  robotService.update({ x: 0, y: 0, orientation: Orientation.NORTH });
  robotService.move('F');
  expect(robotService.get()).toEqual({ x: 0, y: 0, orientation: Orientation.NORTH });
  done();
});

test('Should move the robot along a path', async done => {
  const roomService = new RoomService();
  roomService.update({ width: 5, depth: 5 });
  const robotService = new RobotService(roomService);
  robotService.update({ x: 1, y: 2, orientation: Orientation.NORTH });
  robotService.move('RFRFFRFRF');
  expect(robotService.get()).toEqual({ x: 1, y: 3, orientation: Orientation.NORTH });
  done();
});

test('Should move the robot along a path2', async done => {
  const roomService = new RoomService();
  roomService.update({ width: 5, depth: 5 });
  const robotService = new RobotService(roomService);
  robotService.update({ x: 0, y: 0, orientation: Orientation.EAST });
  robotService.move('RFLFFLRF');
  expect(robotService.get()).toEqual({ x: 3, y: 1, orientation: Orientation.EAST });
  done();
});
