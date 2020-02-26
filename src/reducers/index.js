import * as topic from './topicReducers';
import * as card from './cardReducers';
import * as form from './formReducers';
import * as types from '../actions/types';

const createReducer = (handlers) => (state, action) => {
  if (!handlers.hasOwnProperty(action.type)) {
    return state;
  }

  return handlers[action.type](state, action);
};

export default createReducer({
  [types.ADD_TOPIC]: topic.add,
  [types.REMOVE_TOPIC]: topic.remove,
  [types.FILTER_TOPIC]: topic.filter,
  [types.SET_TPCS_CHANGED]: topic.setChanged,
  [types.SET_CURRENT_CARD]: card.setCurrent,
  [types.SET_ACTIVE_FORM]: form.setActive,
});
