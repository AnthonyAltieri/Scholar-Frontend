/**
 * @author Anthony Altieri on 9/29/16.
 */

export const objToArray = (object) => {
  if (!object) return [];
  const keys = Object.keys(object);
  let array = [];
  keys.forEach((k) => {
    const item = object[k];
    item.id = k;
    array = [...array, item];
  });
  return array;
};

export const objContentToArray = (object) => {
  if (!object) return [];
  let array = [];
  const keys = Object.keys(object);
  keys.forEach((k) => {
    const item = object[k];
    array = [...array, item];
  });
  return array;
}
