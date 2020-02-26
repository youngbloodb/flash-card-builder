export const add = (state, { payload }) => ({
  ...state,
  topics: [...state.topics, payload.topic],
});

export const remove = (state, { payload }) => ({
  ...state,
  topics: state.topics.filter((t) => t !== payload.topic),
});

export const filter = (state, { payload }) => ({
  ...state,
  filter: payload.filter,
});

export const setChanged = (state, { payload }) => ({
  ...state,
  topicsChanged: payload.changed,
});
