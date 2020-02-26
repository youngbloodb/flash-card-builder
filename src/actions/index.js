import * as types from './types';

export const addTopic = (topic) => ({
  type: types.ADD_TOPIC,
  payload: { topic },
});

export const removeTopic = (topic) => ({
  type: types.REMOVE_TOPIC,
  payload: { topic },
});

export const filterTopic = (filter) => ({
  type: types.FILTER_TOPIC,
  payload: { filter },
});

export const setTpcsChanged = (changed) => ({
  type: types.SET_TPCS_CHANGED,
  payload: { changed },
});

export const setCurrentCard = (idx) => ({
  type: types.SET_CURRENT_CARD,
  payload: { idx },
});

export const setActiveForm = (formName) => ({
  type: types.SET_ACTIVE_FORM,
  payload: { formName },
});
