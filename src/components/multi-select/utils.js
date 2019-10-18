export const removeObjIfDuplicateElseConcat = (arr, obj, key) => {
  let res = arr.filter(e => e[key] !== obj[key]);
  const isOriginal = arr.every(item => item[key] !== obj[key]);
  if (isOriginal) {
    res = [...res, obj];
  }
  return res;
};
