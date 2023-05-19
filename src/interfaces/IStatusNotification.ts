export enum NotificationErrorCode {
  ConnectorLockFailure = 'ConnectorLockFailure',
  EVCommunicationError = 'EVCommunicationError',
  GroundFailure = 'GroundFailure',
  HighTemperature = 'HighTemperature',
  InternalError = 'InternalError',
  LocalListConflict = 'LocalListConflict',
  NoError = 'NoError',
  OtherError = 'OtherError',
  OverCurrentFailure = 'OverCurrentFailure',
  PowerMeterFailure = 'PowerMeterFailure',
  PowerSwitchFailure = 'PowerSwitchFailure',
  ReaderFailure = 'ReaderFailure',
  ResetFailure = 'ResetFailure',
  UnderVoltage = 'UnderVoltage',
  OverVoltage = 'OverVoltage',
  WeakSignal = 'WeakSignal',
}
export enum ChargerStatus {
  Available = 'Available',
  Preparing = 'Preparing',
  Charging = 'Charging',
  SuspendedEVSE = 'SuspendedEVSE',
  SuspendedEV = 'SuspendedEV',
  Finishing = 'Finishing',
  Reserved = 'Reserved',
  Unavailable = 'Unavailable',
  Faulted = 'Faulted',
}

export interface IStatusNotification {
  connectorId: number;
  errorCode: NotificationErrorCode;
  info?: string;
  status: ChargerStatus;
  timestamp?: string;
  vendorId?: string;
  vendorErrorCode?: string;
}

export class StatusNotificationHelper {
  static isConnectorIdValid = (connectorId: number): boolean => {
    if (connectorId == 0) return false;
    return true;
  };

  static isErrorCodeValid = (errorCode: string): boolean => {
    if ((<any>Object).values(NotificationErrorCode).includes(errorCode)) {
      return true;
    }
    return false;
  };

  static isStatusValid = (status: string): boolean => {
    if ((<any>Object).values(ChargerStatus).includes(status)) {
      return true;
    }
    return false;
  };

  static isInfoValid = (info?: string): boolean => {
    if (!info) return true;
    if (info!.length > 50) return false;
    return true;
  };

  static isTimestampValid = (timestamp?: string): boolean => {
    if (!timestamp) return true;
    var parsedDate = Date.parse(timestamp);
    return !isNaN(parsedDate);
  };

  static isVendorIdValid = (vendorId?: string): boolean => {
    if (!vendorId) return true;
    if (vendorId.length > 255) return false;
    return true;
  };

  static isVendorErrorCodeValid = (vendorErrorCode?: string): boolean => {
    if (!vendorErrorCode) return true;
    if (vendorErrorCode.length > 50) return false;
    return true;
  };

  static isBodyValid = (params: IStatusNotification): boolean => {
    let allOkay = true;
    if (!params.connectorId || !params.errorCode || !params.status) {
      allOkay = false;
    }
    if (!StatusNotificationHelper.isConnectorIdValid(params.connectorId)) {
      allOkay = false;
    }

    if (!StatusNotificationHelper.isErrorCodeValid(params.errorCode)) {
      allOkay = false;
    }

    if (!StatusNotificationHelper.isInfoValid(params.info)) {
      allOkay = false;
    }

    if (!StatusNotificationHelper.isStatusValid(params.status)) {
      allOkay = false;
    }

    if (!StatusNotificationHelper.isTimestampValid(params.timestamp)) {
      allOkay = false;
    }

    if (!StatusNotificationHelper.isVendorIdValid(params.vendorId)) {
      allOkay = false;
    }

    if (!StatusNotificationHelper.isVendorErrorCodeValid(params.vendorErrorCode)) {
      allOkay = false;
    }

    return allOkay;
  };
}
