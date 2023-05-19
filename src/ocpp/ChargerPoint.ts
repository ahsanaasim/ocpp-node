import { BootStatus, IBootNotificationResponse } from '../interfaces/IBootNotificationResponse';
import { IChangeConfiguration } from '../interfaces/IChangeConfiguration';
import { ChangeConfigurationStatus } from '../interfaces/IChangeConfigurationResponse';
import { ChargerStatus, IStatusNotification, NotificationErrorCode } from '../interfaces/IStatusNotification';
import { ITriggerMessageRequest, IMessageTrigger } from '../interfaces/ITriggerMessageRequest';
import { logger } from '../system/logging';

const { RPCClient } = require('ocpp-rpc');

export class ChargerPoint {
  cli: any;
  identity: string = '';
  authKey: string = '123sdsfad21';
  status: ChargerStatus = ChargerStatus.Available;
  bootStatus: BootStatus = BootStatus.Pending;

  init = (identity: string, endpoint: string) => {
    this.identity = identity;
    this.cli = new RPCClient({
      endpoint: endpoint,
      identity: identity,
      protocols: ['ocpp1.6'],
      password: this.authKey,
    });

    this.cli.handle('Say', ({ params }: any) => {
      logger.info(`Server said: ${params}`);

      setTimeout(() => {
        logger.info(`Sending Boot Notification`);
        this.sendBootNotification('sad', 'das');
      }, 4000);
    });

    this.cli.handle('TriggerMessageRequest', (body: any) => {
      logger.info(`Server said: ${JSON.stringify(body)}`);
      const params: ITriggerMessageRequest = body.params;
      if (params.requestedMessage == IMessageTrigger.Heartbeat) {
        this.sendHeartbeatRequest();
      } else if (params.requestedMessage == IMessageTrigger.StatusNotification) {
        const notification: IStatusNotification = {
          connectorId: 0,
          errorCode: NotificationErrorCode.NoError,
          status: this.status,
        };
        this.sendStatusNotification(notification);
      }
    });

    this.cli.handle('ChangeConfigurationRequest', (body: any) => {
      logger.info(`CP: ChangeConfigurationRequest: ${JSON.stringify(body)}`);
      const config: IChangeConfiguration = body.params;
      if (config.key == 'AuthorizationKey') {
        this.cli.reconfigure({ password: config.value });
      }
      return { status: ChangeConfigurationStatus.Accepted };
    });

    this.cli.connect();
  };

  sendBootNotification = (chargePointVendor: string, chargePointModel: string) => {
    this.cli
      .call('BootNotification', {
        chargePointVendor: chargePointVendor,
        chargePointModel: chargePointModel,
        imsi: '123971asdjashdkajsdh',
      })
      .then((data: IBootNotificationResponse) => {
        logger.info(`CP: IBootNotificationResponse: ${JSON.stringify(data)}`);

        this.bootStatus = data.status;
        if (this.bootStatus == BootStatus.Accepted) {
          this.status = ChargerStatus.Available;
          this.sendHeartbeatRequest();
          // const self = this;
          // setInterval(function () {
          //   self.sendHeartbeatRequest();
          // }, data.interval);
        } else {
          this.status = ChargerStatus.Unavailable;
        }
      });
  };

  sendHeartbeatRequest = () => {
    this.cli.call('Heartbeat', {}).then((data: any) => {
      logger.info(`CP: Heartbeat: ${JSON.stringify(data)}`);
    });
  };

  sendStatusNotification = (notification: IStatusNotification) => {
    this.cli.call('StatusNotification', notification).then((data: any) => {
      // logger.info(`CP: ${JSON.stringify(data)}`);
    });
  };
}

// export const chargerPoint = new ChargerPoint();
