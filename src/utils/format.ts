export const getInitials = (name: string) => (
  name.split(' ')
  .reduce((acc, rec, index) => {
    if (index < 2) {
      return acc + rec[0];
    }
    return acc;
  }, '')
  .toUpperCase() || '');

export const getName = (name: string) => name.split(' ')[0] || name;
