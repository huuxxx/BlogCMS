import { format } from 'date-fns';

const dateFormat = 'yyyy-MM-dd';

export function formatDate(date: string): string {
  return format(new Date(date), dateFormat);
}

export function viewedResultToTick(hasViewed: boolean): string {
  return hasViewed ? '\u2713' : '';
}
