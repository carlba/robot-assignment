import * as http from 'http';

export function replyWithJson(res: http.ServerResponse, obj: { [key: string]: any }, code = 200) {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(obj));
  res.end();
}
