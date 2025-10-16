import express, { Express, Request, Response } from 'express';
import { system } from './src/system/system';
import { ChargerPoint } from './src/ocpp/ChargerPoint';
import { IMessageTrigger } from './src/interfaces/ITriggerMessageRequest';
import { logger } from './src/system/logging';
import { BootStatus } from './src/interfaces/IBootNotificationResponse';

const app: Express = express();
system.configure(app);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

system.start(app);
// just a comment

const chargerPoint = new ChargerPoint();
// chargerPoint.init('cp1', 'ws://localhost:3000');

const chargerPoint2 = new ChargerPoint();
// chargerPoint2.init('cp2', 'ws://localhost:3000');
