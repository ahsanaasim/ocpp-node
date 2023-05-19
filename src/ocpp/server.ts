import { BootNotificationBodyHelper, IBootNotificationRequestBody } from '../interfaces/IBootNotificationRequestBody';
import { BootStatus, IBootNotificationResponse } from '../interfaces/IBootNotificationResponse';
import { IChangeConfiguration } from '../interfaces/IChangeConfiguration';
import { ChangeConfigurationStatus, IChangeConfigurationResponse } from '../interfaces/IChangeConfigurationResponse';
import { IStatusNotification } from '../interfaces/IStatusNotification';
import { ITriggerMessageRequest, IMessageTrigger } from '../interfaces/ITriggerMessageRequest';
import { logger } from '../system/logging';

const { RPCServer, RPCClient, createRPCError } = require('ocpp-rpc');

class Server {
  rpcServer: any;
  clients: any[] = [];

  init = (httpServer: any) => {
    this.rpcServer = new RPCServer({
      protocols: ['ocpp1.6'],
    });
    httpServer.on('upgrade', this.rpcServer.handleUpgrade);

    this.onClientRegister();
  };

  onClientRegister = () => {
    this.rpcServer.on('client', (client: any) => {
      // RPC client connected
      // client.call('Say', `Hello, ${client.identity}!`);
      this.clients.push(client);
      this.onClientBootNotificationRequest(client);
      this.onHeartbeatRequest(client);
      this.onStatusNotification(client);
    });
  };

  onClientBootNotificationRequest = (client: any) => {
    client.handle('BootNotification', async (body: any) => {
      const params: IBootNotificationRequestBody = body.params;
        logger.info(`Server got BootNotification from ${client.identity}:`);
      const response: IBootNotificationResponse = {
        status: BootStatus.Accepted,
        interval: 3000,
        currentTime: new Date().toISOString(),
      };
      return response;
      // if (!BootNotificationBodyHelper.isBodyValid(params)) {
      //   const response: IBootNotificationResponse = {
      //     status: BootStatus.Rejected,
      //     interval: 300,
      //     currentTime: new Date().toISOString(),
      //   };
      //   return response;
      // }
      // if (client.identity == 'cp1') {
      //   console.log(client.handshake);
      //   if (client.handshake.password?.toString('utf8') == 'golalu') {
      //     const response: IBootNotificationResponse = {
      //       status: BootStatus.Accepted,
      //       interval: 3000,
      //       currentTime: new Date().toISOString(),
      //     };
      //     return response;
      //   } else {
      //     const response: IBootNotificationResponse = {
      //       status: BootStatus.Pending,
      //       interval: 300,
      //       currentTime: new Date().toISOString(),
      //     };
      //     body.reply(response);
      //     setTimeout(() => {
      //       this.makeChangeConfigurationRequest(client, { key: 'password', value: 'golalu' });
      //     }, 4000);
      //   }
      // } else {
      //   const response: IBootNotificationResponse = {
      //     status: BootStatus.Rejected,
      //     interval: 300,
      //     currentTime: new Date().toISOString(),
      //   };
      //   return response;
      // }
    });
  };

  onHeartbeatRequest = (client: any) => {
    client.handle('Heartbeat', (body: any) => {
      logger.info(`CS: Heartbeat: ${JSON.stringify(body)}`);
      return {
        currentTime: new Date().toISOString(),
      };
    });
  };

  onStatusNotification = (client: any) => {
    client.handle('StatusNotification', (body: any) => {
      const param: IStatusNotification = body.params;
      logger.info(`CS: StatusNotification ${JSON.stringify(param)}`);
      return {};
    });
  };

  triggerMessageRequest = (client: any, requestType: IMessageTrigger) => {
    const data: ITriggerMessageRequest = {
      requestedMessage: requestType,
    };

    client.call('TriggerMessageRequest', data).then((body: any) => {
      logger.info(`CS: TriggerMessageRequest: ${JSON.stringify(body)}`);
    });
  };

  makeGetConfigurationRequest = (client: any) => {
    client.call('GetConfigurationRequest').then((data: IChangeConfigurationResponse) => {
      logger.info(`CS: GetConfigurationRequest: ${JSON.stringify(data)}`);
    });
  };

  makeChangeConfigurationRequest = (client: any, configuration: IChangeConfiguration) => {
    //  This has to be stored in DB. not here
    client['configuration'] = configuration;
    // ^^^^^^^^^^^
    client.call('ChangeConfigurationRequest', configuration).then((data: IChangeConfigurationResponse) => {
      logger.info(`CS: ChangeConfigurationRequest: ${JSON.stringify(data)}`);
      switch (data.status) {
        case ChangeConfigurationStatus.Accepted:
          if (client['configuration'].key == 'AuthorizationKey') {
            client.close();
          }
          break;
        case ChangeConfigurationStatus.Rejected:
          break;
        case ChangeConfigurationStatus.NotSupported:
          break;
        case ChangeConfigurationStatus.RebootRequired:
          break;
        default:
          break;
      }
    });
  };
}

export const ocppServer = new Server();
