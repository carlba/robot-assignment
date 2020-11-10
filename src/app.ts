import { Server } from './server';
import { Room, RoomService } from './services/room.service';

export const roomService = new RoomService();

export async function createApp(port = '3030') {
  const server = new Server();

  server.addRoute('robot', 'GET', (req, res) => {
    res.write(JSON.stringify({ message: 'test' }));
    res.statusCode = 200;
    res.end();
  });

  server.addRoute('room', 'PUT', (req, res) => {
    if (req.body?.width && req.body?.height) {
      res.statusCode = 422;
      res.end('Missing width or depth in body');
    }

    const updatedRoom = roomService.update(req.body as Room);
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(updatedRoom));
    res.end();
  });

  server.listen(port);
  return server;
}
