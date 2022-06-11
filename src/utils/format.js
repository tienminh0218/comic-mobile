export const formatObj = (obj) => {
  return Object.keys(obj).reduce((prev, key) => {
    if (obj[key]) {
      prev[key] = obj[key];
      return prev;
    }
    return prev;
  }, {});
};
