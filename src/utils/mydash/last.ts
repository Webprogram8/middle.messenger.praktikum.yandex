export const last = (list: Array<unknown>) => {
  return Array.isArray(list) ? list[list.length - 1] : undefined;
};
