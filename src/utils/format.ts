export const getInitials = (name: string) => (
  name.split(' ')
  .reduce((acc, rec, index) => index < 2 ? acc + rec[0] : acc, '')
  .toUpperCase() || '');

export const getName = (name: string) => name.split(' ')[0] || name;
