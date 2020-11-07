import * as http from 'http';

interface JSONEnrichedRequest extends http.IncomingMessage {
  json?: string;
}

class Server {
  server: http.Server;
  handlers: any[] = [];
  constructor(port: number, contentType: string) {
    this.server = http.createServer(this.onRequest.bind(this)).listen(port);
  }

  async onRequest(req: JSONEnrichedRequest, res: http.ServerResponse) {
    const { url, method } = req;

    const handler =
      typeof url === 'string'
        ? this.handlers.find(
            handler => this.trimLocation(url) === handler.path && method === handler.method
          )
        : null;

    if (['POST', 'PUT', 'PATCH'].includes(handler.method)) {
      try {
        req.json = await this.getJsonFromRequest(req);
      } catch (e) {
        res.statusCode = 422;
        res.write(e.message);
        res.end();
      }
    }

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

  getJsonFromRequest(req: http.IncomingMessage): Promise<string> {
    return new Promise((resolve, reject) => {
      let data = '';
      req.on('data', chunk => (data += chunk));
      req.on('end', () => {
        if (data.length === 0) {
          reject(new Error('Missing data in request'));
        }
        let result: string;
        try {
          result = JSON.parse(data);
          resolve(result);
        } catch (err) {
          reject(new Error('Unable to parse JSON data'));
        }
      });
    });
  }
}

const server = new Server(3030, 'application/json');

server.addRoute('robot', 'GET', (req, res) => {
  res.write(JSON.stringify({ message: 'test' }));
  res.statusCode = 200;
  res.end();
});

server.addRoute('room', 'POST', (req, res) => {
  res.end();
});
