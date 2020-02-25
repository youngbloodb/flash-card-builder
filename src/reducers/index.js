import * as topic from './topicReducers';
import * as types from '../actions/types';

const createReducer = handlers => (state, action) => {
  if (!handlers.hasOwnProperty(action.type)) {
    return state;
  }

  return handlers[action.type](state, action);
};

export default createReducer({
  [types.ADD_TOPIC]: topic.add,
  [types.REMOVE_TOPIC]: topic.remove,
  [types.FILTER_TOPIC]: topic.filter
});
