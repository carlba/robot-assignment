import * as http from 'http';

interface JSONEnrichedRequest extends http.IncomingMessage {
  body?: { [key: string]: any };
}

export class Server {
  server: http.Server;
  handlers: any[] = [];
  constructor() {
    this.server = http.createServer(this.onRequest.bind(this));
  }

  async onRequest(req: JSONEnrichedRequest, res: http.ServerResponse) {
    const { url, method } = req;

    const handler =
      typeof url === 'string'
        ? this.handlers.find(
            handler => this.trimLocation(url) === handler.path && method === handler.method
          )
        : null;

    if (handler && ['POST', 'PUT', 'PATCH'].includes(handler.method)) {
      try {
        req.body = await this.getParsedJsonFromRequest(req);
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
    handler: (req: JSONEnrichedRequest, res: http.ServerResponse) => any
  ) {
    this.handlers.push({ path, method, handler });
  }

  trimLocation(location: string) {
    return location.replace(/^\/(.*)/g, '$1');
  }

  getParsedJsonFromRequest(req: JSONEnrichedRequest): Promise<{ [key: string]: any }> {
    return new Promise((resolve, reject) => {
      let data = '';
      req.on('data', chunk => (data += chunk));
      req.on('end', () => {
        if (data.length === 0) {
          reject(new Error('Missing data in request'));
        }
        let result: { [key: string]: any };
        try {
          result = JSON.parse(data);
          resolve(result);
        } catch (err) {
          reject(new Error('Unable to parse JSON data'));
        }
      });
    });
  }

  listen(port: string): void {
    this.server.listen(port);
  }

  close(): void {
    this.server.close();
  }
}
