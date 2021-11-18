export const isEmpty = (object: unknown) => {
  if (typeof object === "string" || Array.isArray(object)) {
    return !object.length;
  }
  if (object instanceof Map || object instanceof Set) {
    return !object.size;
  }

  if (object && typeof object === "object") {
    return !Object.values(object).length;
  }

  return true;
};
