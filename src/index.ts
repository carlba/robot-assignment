import * as http from 'http';

class Server {
  server: http.Server;
  handlers: any[] = [];
  constructor(port: number, contentType: string) {
    this.server = http.createServer(this.onRequest.bind(this)).listen(port);
  }

  onRequest(req: http.IncomingMessage, res: http.ServerResponse) {
    const { url, method } = req;
    console.log(this.trimLocation(url!));

    const handler =
      typeof url === 'string'
        ? this.handlers.find(
            handler => this.trimLocation(url) === handler.path && method === handler.method
          )
        : null;

    if (handler) {
      return handler.handler(req, res);
    } else {
      res.statusCode = 404;
      return res.end();
    }
  }

  addRoute(
    path: string,
    method: 'POST' | 'GET' | 'PUT' | 'DELETE',
    handler: (req: http.IncomingMessage, res: http.ServerResponse) => any
  ) {
    this.handlers.push({ path, method, handler });
  }

  trimLocation(location: string) {
    return location.replace(/^\/(.*)/g, '$1');
  }
}

const server = new Server(3030, 'application/json');

server.addRoute('robot', 'GET', (req, res) => {
  res.write(JSON.stringify({ message: 'test' }));
  res.statusCode = 200;
  res.end();
});
