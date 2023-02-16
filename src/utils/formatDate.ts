import { format } from 'date-fns';

export const formatDate = (date: Date, dateFormat = 'PPP'  ) => {
  return format(date, dateFormat);
};