import { format } from 'date-fns';

export const formatDate = (date: Date, dateFormat = 'PPP') => {
  return format(date, dateFormat);
};

export const formatDateString = (date: string, dateFormat = 'PPP'): string => {
  if (!date) {
    return '';
  }
  return formatDate(new Date(date), dateFormat);
};
