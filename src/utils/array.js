export const removeNullElements = (array) => {
  return array.filter((element) => element !== null);
};
export const removeEmptyElements = (array) => {
  return array.filter((element) => element !== "");
};
export const removeUndefinedElements = (array) => {
  return array.filter((element) => element !== undefined);
};
