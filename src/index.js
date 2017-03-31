/**
 * @module zbits
 */

import EventSource from './evsource'
import Kolor from './kolor'

/**
 * Remove item from the array. If item is not part of array it does nothing
 * @param {Array.<*>} arr - Array to remove item from. Will be modified when function returns
 * @param {*} item - Item to remove
 */
function arrRemove(arr, item) {
  let idx = arr.indexOf(item);
  if(idx >= 0) {
    arr.splice(idx, 1);
  }
}

export {
  EventSource,
  Kolor,
  arrRemove
};
