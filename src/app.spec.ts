import * as supertest from 'supertest';

import { createApp, robotService, roomService } from './app';
import { Orientation, Robot } from './services/robot.service';

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

test('Room: Should return 422 on missing body parameters', async done => {
  const app = await createApp('5001');
  const response = await supertest('http://localhost:5001').put('/room').send({ width: 5 });
  expect(response.status).toBe(422);
  app.close();
  done();
});

test('Robot: Should be possible to PUT robot', async done => {
  const app = await createApp('5001');

  const sampleRobot: Robot = { x: 10, y: 5, orientation: Orientation.EAST };

  const response = await supertest('http://localhost:5001').put('/robot').send(sampleRobot);
  expect(response.status).toBe(200);
  expect(response.headers['content-type']).toBe('application/json');
  expect(response.body).toEqual(sampleRobot);
  expect(robotService.get()).toEqual(sampleRobot);
  app.close();
  done();
});

test('Room: Should return 422 on missing body parameters', async done => {
  const app = await createApp('5001');
  const response = await supertest('http://localhost:5001').put('/room').send({ x: 5 });
  expect(response.status).toBe(422);
  app.close();
  done();
});
