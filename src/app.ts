import { Server } from './server';
import { Room, RoomService } from './services/room.service';

const roomService = new RoomService();

export async function createApp() {
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
    res.end(JSON.stringify(updatedRoom));
  });

  server.listen('3030');
}
