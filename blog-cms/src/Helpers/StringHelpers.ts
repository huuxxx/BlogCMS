import { format } from 'date-fns';

const dateFormat = 'yyyy-MM-dd';
const dateFormatLong = 'yyyy-MM-dd hh:mm:ss';

export function formatDate(date: string): string {
  return format(new Date(date), dateFormat);
}

export function formatDateLong(date: string): string {
  return format(new Date(date), dateFormatLong);
}

export function viewedResultToTick(hasViewed: boolean): string {
  return hasViewed ? '\u2713' : '';
}
