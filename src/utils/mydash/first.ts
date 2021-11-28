export const first = (list: Array<unknown>) => {
  return Array.isArray(list) ? list[0] : undefined;
};
