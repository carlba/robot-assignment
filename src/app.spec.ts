import * as supertest from 'supertest';

import { createApp, roomService } from './app';

test('Room: Should be possible to PUT room', async done => {
  const app = await createApp('5001');
  const response = await supertest('http://localhost:5001')
    .put('/room')
    .send({ width: 5, depth: 7 });
  expect(response.status).toBe(200);
  expect(response.headers['content-type']).toBe('application/json');
  expect(response.body).toEqual({ width: 5, depth: 7 });
  expect(roomService.get()).toEqual({ width: 5, depth: 7 });
  app.close();
  done();
});
