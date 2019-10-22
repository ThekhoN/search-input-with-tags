export const removeObjIfDuplicateElseConcat = (arr, obj, key) => {
  let res = arr.filter(e => e[key] !== obj[key]);
  const isOriginal = arr.every(item => item[key] !== obj[key]);
  if (isOriginal) {
    res = [...res, obj];
  }
  return res;
};

export const getDifference = (arr1, arr2) => {
  // we must ensure that we use the arr having the greater length to iterate

  /*****************************/
  // using filter and includes
  /*****************************/
  if (arr1.length === arr2.length) {
    return [];
  } else if (arr1.length > arr2.length) {
    return arr1.filter(item => !arr2.includes(item));
  } else {
    return arr2.filter(item => !arr1.includes(item));
  }
};
