export enum BootStatus {
  Accepted = 'Accepted',
  Pending = 'Pending',
  Rejected = 'Rejected',
}

export interface IBootNotificationResponse {
  status: BootStatus;
  interval: number;
  currentTime: string;
}
