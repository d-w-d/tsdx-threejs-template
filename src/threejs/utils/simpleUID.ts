let count = 0;

export const getSimpleUID = () => {
  count++;
  return 'simple-uid-' + count;
};
