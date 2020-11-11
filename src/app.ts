import { Server } from './server';
import { Robot, RobotService } from './services/robot.service';
import { Room, RoomService } from './services/room.service';

export const roomService = new RoomService();
export const robotService = new RobotService();

export async function createApp(port = '3030') {
  const server = new Server();

  server.addRoute('robot', 'GET', (req, res) => {
    res.write(JSON.stringify({ message: 'test' }));
    res.statusCode = 200;
    res.end();
  });

  server.addRoute('room', 'PUT', (req, res) => {
    if (!req.body?.width || !req.body?.depth) {
      res.statusCode = 422;
      return res.end('Missing width or depth in body');
    }

    const updatedRoom = roomService.update(req.body as Room);
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(updatedRoom));
    res.end();
  });

  server.addRoute('robot', 'PUT', (req, res) => {
    if (!req.body?.x || !req.body?.y || !req.body?.orientation) {
      res.statusCode = 422;
      return res.end('Missing x, y or direction in body');
    }

    const updatedRobot = robotService.update(req.body as Robot);
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(updatedRobot));
    res.end();
  });

  server.addRoute('api/robot/actions', 'POST', (req, res) => {
    if (!req.body?.type || !req.body?.params) {
      res.statusCode = 422;
      return res.end('Missing type, params in body');
    }

    const updatedRobot = robotService.move(req.body.params);
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(updatedRobot));
    res.end();
  });

  server.listen(port);
  return server;
}
