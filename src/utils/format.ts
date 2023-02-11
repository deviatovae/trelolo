export const getInitials = (name: string) => (
  name.split(' ')
  .reduce((acc, rec) => acc + rec[0], '')
  .toUpperCase() || '');

export const getName = (name: string) => name.split(' ')[0] || name;
