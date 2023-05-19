export interface IBootNotificationRequestBody {
  chargePointVendor: string;
  chargePointModel: string;
  chargePointSerialNumber?: string;
  chargeBoxSerialNumber?: string;
  firmwareVersion?: string;
  iccid?: string;
  imsi?: string;
  meterType?: string;
  meterSerialNumber?: string;
}

export class BootNotificationBodyHelper {
  static isChargerPointVendorValid = (chargePointVendor: string): boolean => {
    if (chargePointVendor.length > 20) return false;
    return true;
  };

  static isChargerPointModelValid = (chargePointModel: string): boolean => {
    if (chargePointModel.length > 20) return false;
    return true;
  };

  static isChargerPointSerialNumberValid = (chargePointSerialNumber?: string): boolean => {
    if (!chargePointSerialNumber) return true;
    if (chargePointSerialNumber!.length > 25) return false;
    return true;
  };

  static isChargerBoxSerialNumberValid = (chargeBoxSerialNumber?: string): boolean => {
    if (!chargeBoxSerialNumber) return true;
    if (chargeBoxSerialNumber!.length > 25) return false;
    return true;
  };

  static isFirmwareVersionValid = (firmwareVersion?: string): boolean => {
    if (!firmwareVersion) return true;
    if (firmwareVersion.length > 50) return false;
    return true;
  };

  static isIccIdValid = (iccid?: string): boolean => {
    if (!iccid) return true;
    if (iccid.length > 20) return false;
    return true;
  };

  static isImsiValid = (imsi?: string): boolean => {
    if (!imsi) return true;
    if (imsi.length > 20) return false;
    return true;
  };

  static isMeterTypeValid = (meterType?: string): boolean => {
    if (!meterType) return true;
    if (meterType.length > 25) return false;
    return true;
  };

  static isMeterSerialNumberValid = (meterSerialNumber?: string): boolean => {
    if (!meterSerialNumber) return true;
    if (meterSerialNumber.length > 25) return false;
    return true;
  };

  static isBodyValid = (params: IBootNotificationRequestBody): boolean => {
    let allOkay = true;
    if (!params.chargePointModel || !params.chargePointVendor) {
      allOkay = false;
    }
    if (!BootNotificationBodyHelper.isChargerPointModelValid(params.chargePointModel)) {
      allOkay = false;
    }

    if (!BootNotificationBodyHelper.isChargerPointVendorValid(params.chargePointVendor)) {
      allOkay = false;
    }

    if (!BootNotificationBodyHelper.isChargerPointSerialNumberValid(params.chargePointSerialNumber)) {
      allOkay = false;
    }

    if (!BootNotificationBodyHelper.isChargerBoxSerialNumberValid(params.chargeBoxSerialNumber)) {
      allOkay = false;
    }

    if (!BootNotificationBodyHelper.isFirmwareVersionValid(params.firmwareVersion)) {
      allOkay = false;
    }

    if (!BootNotificationBodyHelper.isIccIdValid(params.iccid)) {
      allOkay = false;
    }

    if (!BootNotificationBodyHelper.isImsiValid(params.imsi)) {
      allOkay = false;
    }

    if (!BootNotificationBodyHelper.isMeterTypeValid(params.meterType)) {
      allOkay = false;
    }

    if (!BootNotificationBodyHelper.isMeterSerialNumberValid(params.meterSerialNumber)) {
      allOkay = false;
    }

    return allOkay;
  };
}
