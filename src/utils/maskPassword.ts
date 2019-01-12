const maskPassword = (password: string): string => password
  .split('')
  .map(() => '*')
  .join('');

export default maskPassword;
