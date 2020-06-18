// remove message
import { CLEAR_MESSAGE } from '../actionTypes';

export const clearMessage = (type) => {
  return {
    type: CLEAR_MESSAGE[type],
  };
};
