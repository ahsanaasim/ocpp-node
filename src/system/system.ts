import { Express } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import { logger } from './logging';
import { ocppServer } from '../ocpp/server';
import { IMessageTrigger } from '../interfaces/ITriggerMessageRequest';

export class System {
  configure = (app: Express) => {
    dotenv.config();
    app.use(helmet());
    app.use(compression());
  };

  start = (app: Express) => {
    const port: number = process.env.PORT ? +process.env.PORT : 3000;
    const httpServer = app.listen(port, () => {
      logger.info(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
    ocppServer.init(httpServer);
  };

  triggerMessage = (cp: string, triggerType: IMessageTrigger) => {
    const client = ocppServer.clients.find((client) => client.identity == cp);
    if (client) {
      logger.info(`Size of Client Array: ${ocppServer.clients.length}`);
      ocppServer.triggerMessageRequest(client, triggerType);
    }
  };
}

export const system = new System();
