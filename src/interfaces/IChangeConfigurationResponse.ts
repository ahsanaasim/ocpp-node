export enum ChangeConfigurationStatus {
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  RebootRequired = 'RebootRequired',
  NotSupported = 'NotSupported',
}
export interface IChangeConfigurationResponse {
  status: ChangeConfigurationStatus;
}
