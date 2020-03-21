export enum NotificationTypes {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error'
}

export namespace NotificationTypes {
  export function byIndex(index: number): NotificationTypes {
    const key = Object.keys(NotificationTypes)[index];
    return NotificationTypes[key];
  }
}
