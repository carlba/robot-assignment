import * as fs from 'fs';
import * as path from 'path';
import { replyWithJson } from './lib/request';

import { Server } from './server';
import { Robot, RobotService } from './services/robot.service';
import { Room, RoomService } from './services/room.service';

export const roomService = new RoomService();
export const robotService = new RobotService(roomService);

export async function createApp(port = '3030') {
  const server = new Server();

  server.addRoute('/api/robot', 'GET', (req, res) => {
    res.write(JSON.stringify({ message: 'test' }));
    res.statusCode = 200;
    res.end();
  });

  server.addRoute('/api/room', 'PUT', (req, res) => {
    if (!req.body?.width || !req.body?.depth) {
      return replyWithJson(res, { message: 'Missing width or depth in body' }, 422);
    }

    const updatedRoom = roomService.update(req.body as Room);
    return replyWithJson(res, updatedRoom);
  });

  server.addRoute('/api/robot', 'PUT', (req, res) => {
    if (
      req.body?.x === undefined ||
      req.body?.y === undefined ||
      req.body?.orientation === undefined
    ) {
      res.statusCode = 422;
      return replyWithJson(res, { message: 'Missing x, y or orientation in body' }, 422);
    }

    const updatedRobot = robotService.update(req.body as Robot);
    return replyWithJson(res, updatedRobot);
  });

  server.addRoute('/api/robot/actions', 'POST', (req, res) => {
    if (req.body?.type === undefined || req.body?.params === undefined) {
      res.statusCode = 422;
      return replyWithJson(res, { message: 'Missing type, params in body' }, 422);
    }

    if (req.body?.type !== 'move') {
      res.statusCode = 422;
      return replyWithJson(res, { message: 'Incorrect action type. Choose one of "move"' }, 422);
    }

    const updatedRobot = robotService.move(req.body.params);
    return replyWithJson(res, updatedRobot);
  });

  server.addRoute('/', 'GET', (req, res) => {
    fs.readFile(
      path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url!),
      function (err, data) {
        if (err) {
          res.writeHead(404);
          res.end(JSON.stringify(err));
          return;
        }
        res.writeHead(200);
        res.end(data);
      }
    );
  });

  await server.listen(port);
  console.log(`Server listening on port ${port}`);
  return server;
}
