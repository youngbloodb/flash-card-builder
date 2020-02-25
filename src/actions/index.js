import * as types from './types';

export const addTopic = topic => ({
  type: types.ADD_TOPIC,
  payload: { topic }
});

export const removeTopic = topic => ({
  type: types.REMOVE_TOPIC,
  payload: { topic }
});

export const filterTopic = filter => ({
  type: types.FILTER_TOPIC,
  payload: { filter }
});
